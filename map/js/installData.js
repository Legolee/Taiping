/**
 * 相应js ----ps:另外本人为后端，前端写的有些简陋望谅解
 * 另外说明一点，echarts源码改了一个地方，地图底图可点功能去掉了，如果需要这个功能下载新包自己导入即可
 */

//时间点
var num = [];

//option数据
var optionData = [];

//地图对象
var map = null;

//echarts对象
var myChart = null;

//echarts绘制对象
var option = null;

//颜色
var color = ["red", "#000"]

//坐标信息
var geoCoordMap = {
	/*'壤城路北环路': [112.09988, 32.70335],
	'三贤路与北环路交叉': [112.0874, 32.6954],
	'邓南路湍河桥': [112.1269, 32.6976],
	'南环路与东一环路': [112.10888, 32.6626],
	'刁河大桥': [112.0409, 32.6434],*/
	'浦口':[118.67635597199266,32.11964661848842],
	'太平':[118.49399408050583,31.543626698197027],
	'芜湖':[118.3835870898353,31.326619854465303],
	'南陵':[118.31886575047672,30.924966836681154],
	'泾县':[118.42117379428339,30.683658075978773],
	'旌德':[118.5186365170822,30.293807184783535],
	'马头镇':[118.50160835572448,30.79362058915932],
	'水东':[118.94513988721125,30.822174121229285],
	'广德':[119.400092831526,30.88308832297854],
	'宁国':[118.98310730542026,30.636449569623096],
	'安吉':[119.67991744581164,30.711767130558762],
	'梅溪镇':[119.75034949158421,30.812656277205963],
	'泗安镇':[119.64946034493701,30.917352561462497],
	'虹星桥':[119.83791365659877,30.93258111189981],
	'长兴':[119.90834570237135,31.010627432891045],
	'湖州':[120.08156168415176,30.854313019316912],
	'武康':[119.96164562890195,30.555674488576294],
	'余杭':[119.93880280324598,30.291078424727967],
	'杭州':[120.15961678458703,30.264428461462667]
};

//地图中心点以及缩放级别等
var bmap = {
	center: [119.333, 31.275],
	zoom: 9,
	roam: true,
};
//目标模拟数据
var targetData = [
	[{
			name: '浦口',
			value: '1860-01-28T03:13:39.000Z'
		},
		{
			name: '芜湖',
			value: '1860-01-29T03:13:39.000Z'
		},
		1,
		{
			value:[118.49399408050583,31.543626698197027]
		}
	],
	[{
		name: '南陵',
		value: '1860-02-22T03:13:39.000Z'
	}, {
		name: '水东',
		value: '1860-02-22T03:14:39.000Z'
	},
	 1,{value:[118.50160835572448,30.79362058915932]}],
	[{
		name: '水东',
		value: '1860-02-24T03:13:39.000Z'
	}, {
		name: '广德',
		value: '1860-02-24T03:14:39.000Z'
	}, 1,{	value:null}],
	[{
		name: '广德',
		value: '1860-02-29T03:13:39.000Z'
	}, {
		name: '安吉',
		value: '1860-02-29T03:14:39.000Z'
	}, 1,{value:null}],
	[{
		name: '安吉',
		value: '1860-03-02T03:13:39.000Z'
	}, {
		name: '梅溪镇',
		value: '1860-03-02T03:14:39.000Z'
	}, 1,{value:null}],
	[{
		name: '梅溪镇',
		value: '1860-03-03T03:13:39.000Z'
	}, {
		name: '虹星桥',
		value: '1860-03-03T03:14:39.000Z'
	}, 1,{value:[119.64946034493701,30.917352561462497]}],
	[{
		name: '虹星桥',
		value: '1860-03-04T03:13:39.000Z'
	}, {
		name: '长兴',
		value: '1860-03-04T03:14:39.000Z'
	}, 1,{value:null}],
	[{
		name: '长兴',
		value: '1860-03-09T03:13:39.000Z'
	}, {
		name: '余杭',
		value: '1860-03-09T03:14:39.000Z'
	}, 1,{value:[119.96164562890195,30.555674488576294]}],
	[{
		name: '余杭',
		value: '1860-03-11T03:13:39.000Z'
	}, {
		name: '杭州',
		value: '1860-03-11T03:14:39.000Z'
	}, 1,{value:null}],
];
//伴随模拟数据
var accompanyData = [
	[{
		name: '芜湖',
		value: '1860-01-28T03:17:55.000Z'
	}, {
		name: '南陵',
		value: '1860-01-28T03:18:55.000Z'
	}, 2,{value:null}],
	[{
		name: '南陵',
		value: '1860-02-16T03:17:55.000Z'
	}, {
		name: '泾县',
		value: '1860-02-16T03:18:55.000Z'
	}, 2,{value:null}],
	[{
		name: '泾县',
		value: '1860-02-20T03:17:55.000Z'
	}, {
		name: '旌德',
		value: '1860-02-20T03:18:55.000Z'
	}, 2,{value:null}],
	[{
		name: '旌德',
		value: '1860-02-22T03:17:55.000Z'
	}, {
		name: '宁国',
		value: '1860-02-22T03:18:55.000Z'
	}, 2,{value:null}],
	[{
		name: '宁国',
		value: '1860-02-29T03:17:55.000Z'
	}, {
		name: '安吉',
		value: '1860-02-29T03:18:55.000Z'
	}, 2,{value:null}],
	[{
		name: '安吉',
		value: '1860-03-02T03:13:39.000Z'
	}, {
		name: '梅溪镇',
		value: '1860-03-02T03:14:39.000Z'
	}, 1,{value:null}],
	[{
		name: '梅溪镇',
		value: '1860-03-03T03:13:39.000Z'
	}, {
		name: '虹星桥',
		value: '1860-03-03T03:14:39.000Z'
	}, 1,{value:[119.64946034493701,30.917352561462497]}],
	[{
		name: '虹星桥',
		value: '1860-03-04T03:13:39.000Z'
	}, {
		name: '长兴',
		value: '1860-03-04T03:14:39.000Z'
	}, 1,{value:null}],
	[{
		name: '长兴',
		value: '1860-03-05T03:13:39.000Z'
	}, {
		name: '湖州',
		value: '1860-03-05T03:14:39.000Z'
	}, 1,{value:null}],
];
//时间格式化方法
function format(fmt, date) {
	var o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

/**
 * 将数据组装
 * @param {Object} one  目标数据
 * @param {Object} two  伴随数据
 * @param {Object} step 时间点
 * @param {Object} flag 标志
 * @param {Object} period1 目标秒数
 * @param {Object} delay1 目标延迟数
 * @param {Object} period2 目标秒数
 * @param {Object} delay2 目标延迟数
 */
function installData(one, two, step, flag, period1, delay1, period2, delay2) {

	//此地为何判断--因echarts有一个bug,轨迹会出现错乱，将数据放在不同series中，切换执行则会避开
	if(flag === 2) {
		if(one === null) {
			optionPush([], [], two, [], period1, delay1, period2, delay2);
		} else if(two === null) {
			optionPush(one, [], [], [], period1, delay1, period2, delay2);
		} else {
			optionPush(one, [], two, [], period1, delay1, period2, delay2);
		}
	} else {
		if(one === null) {
			optionPush([], [], [], two, period1, delay1, period2, delay2);
		} else if(two === null) {
			optionPush([], one, [], [], period1, delay1, period2, delay2);
		} else {
			optionPush([], one, [], two, period1, delay1, period2, delay2);
		}
	}
	//相应时间点
	num.push(step);
}

/**
 * 此方法封装成最终echarts使用格式
 * @param {Object} one1
 * @param {Object} one2
 * @param {Object} two1
 * @param {Object} two2
 * @param {Object} period1
 * @param {Object} delay1
 * @param {Object} period2
 * @param {Object} delay2
 */
function optionPush(one1, one2, two1, two2, period1, delay1, period2, delay2) {
	optionData.push({
		series: [{
				effect: {
					period: period1,
					delay: delay1
				},
				data: one1
			},
			{
				effect: {
					period: period1,
					delay: delay1
				},
				data: one2
			},
			{
				effect: {
					period: period2,
					delay: delay2
				},
				data: two1
			},
			{
				effect: {
					period: period2,
					delay: delay2
				},
				data: two2
			}
		]
	});
}

/**
 * 总判断逻辑
 * @param {Object} date 数据
 */
function logic(data) {
	//进行交叉数据，来规避轨迹出现bug
	var z = 1;
	//目标与伴随间隔一分钟之内为同时出发
	var interval = 60000;
	for(var i = 0, len = data.length; i < len; i++) {

		if(data[i + 1] != undefined) {

			//首先前为目标后为伴随时或者前为伴随后为目标才进行执行时间比对逻辑
			if(data[i][3] === 1 && data[i + 1][3] === 2) {
				var d1 = new Date(data[i][2]); //目标出发时间
				var d2 = new Date(data[i + 1][2]); //伴随出发时间
				var d3 = new Date(data[i][4]); //目标到达时间
				var d4 = new Date(data[i + 1][4]); //伴随到达时间

				//查看是否在时间间隔内
				if(d1 - d2 <= interval && d1 - d2 >= -interval) {
					installData(data[i][0], data[i + 1][0], data[i + 1][4], z++, 4, 0, 4, 0);
					i++;
				} else if(d3 > d2 && !(d2 - d3 <= interval && d2 - d3 >= -interval)) {
					installData(data[i][0], data[i + 1][0], data[i + 1][4], z++, 4, 0, 2, 2000);
					i++;
				} else {
					installData(data[i][0], null, data[i][4], z++, 4, 0, 4, 0);
				}
			} else if(data[i][3] === 2 && data[i + 1][3] === 1) {
				var d1 = new Date(data[i][2]);
				var d2 = new Date(data[i + 1][2]);
				var d3 = new Date(data[i][4]);
				var d4 = new Date(data[i + 1][4]);
				if(d1 - d2 <= interval && d1 - d2 >= -interval) {
					installData(data[i + 1][0], data[i][0], data[i][4], z++, 4, 0, 4, 0);
					i++;
				} else if(d3 > d2 && !(d2 - d3 <= interval && d2 - d3 >= -interval)) {
					installData(data[i + 1][0], data[i][0], data[i][4], z++, 2, 2000, 4, 0);
					i++;
				} else {
					installData(null, data[i][0], data[i][4], z++, 4, 0, 4, 0);
				}
			} else {
				if(data[i][3] === 1) {
					installData(data[i][0], null, data[i][4], z++, 4, 0, 4, 0);
				} else {
					installData(null, data[i][0], data[i][4], z++, 4, 0, 4, 0);
				}
			}
		} else {
			if(data[i][3] === 1) {
				installData(data[i][0], null, data[i][4], z++, 4, 0, 4, 0);
			} else {
				installData(null, data[i][0], data[i][4], z++, 4, 0, 4, 0);
			}
		}

		if(z >= 3) z = 1;
	}
}

/**
 * 封装数据
 */
async function forData() {

	var that = this;
	//坐标信息
	var targetNum = targetData.length;
	//伴随点的数量
	var accompanyNum = accompanyData.length;

	//目标和伴随的线
	var targetLines = [];
	var accompanyLines = [];

	//坐标圆点信息
	var circleData = [];

	//将目标和伴随的数据整合到一起
	var addData = [];

	//解析数据
	var convertData = function(data) {
		var res = [];
		var fromCoord = geoCoordMap[data[0].name];
		var toCoord = geoCoordMap[data[1].name];
		var Cordline= data[3].value;
		if(fromCoord && toCoord && Cordline) {
			res.push({
				fromName: data[0].name,
				toName: data[1].name,
				coords: [fromCoord,Cordline,toCoord]
				//coords: [[118.67635597199266,32.11964661848842],[118.61582248400434,31.863426257380617],[118.49399408050583,31.543626698197027]],
			});
		}
		else{
			res.push({
				fromName: data[0].name,
				toName: data[1].name,
				coords: [fromCoord,toCoord]
				//coords: [[118.67635597199266,32.11964661848842],[118.61582248400434,31.863426257380617],[118.49399408050583,31.543626698197027]],
			});
		}
		return res;
	};

	//组合数据
	var sumData = function(data) {
		return [convertData(data), {
			name: data[0].name,
			value: geoCoordMap[data[0].name]
		}, data[0].value, data[2], data[1].value];
	}

	//循环目标与伴随的数据
	for(var i = 0; i < targetNum; i++) {
		targetLines.push(sumData(targetData[i])[0][0]);
		addData.push(sumData(targetData[i]));
	}
	for(var i = 0; i < accompanyNum; i++) {
		accompanyLines.push(sumData(accompanyData[i])[0][0]);
		addData.push(sumData(accompanyData[i]));
	}

	//循环得到坐标圆点
	for(var key in geoCoordMap) {
		circleData.push({
			name: key,
			value: geoCoordMap[key]
		})
	}

	//将数据进行排序
	addData.sort(function(a, b) {
		return a > b ? 1 : -1;
	});

	//进行逻辑判断
	await logic(addData);

	option = {
		baseOption: {
			bmap: bmap,
			title: {
				text: '太平军二破江南大营战役过程',
				subtext: '战役开始于1860年1月28日，于同年5月6日结束，前后历时九十八天',
				left: 'middle'
		},
			timeline: {
				axisType: 'category', //category
				autoPlay: true,
				playInterval: 4000,
				data: num,
				left: 300,
				bottom:20,
				width:500,
				tooltip: {
					trigger: 'item',
					formatter: function(params) {

						var date = format('yyyy/MM/dd hh:mm:ss', new Date(params.name));
						return "时间:" + date;

					}
				},
				lineStyle: {
					color: '#182941',
					width: 3
				},
				checkpointStyle: {
					color: '#fff',
					borderColor: '#182941',
					symbolSize: 15,
					animationDuration: 4000
				},
				controlStyle: {
					showPrevBtn: true,
					showNextBtn: true,
					normal: {
						color: '#182941',
						borderColor: '#182941'
					},
					emphasis: {
						color: '#182941',
						borderColor: '#182941'
					},
					position: "right"
				},
				itemStyle: {
					normal: {
						color: '#182941'
					},
					emphasis: {
						color: '#182941'
					}
				},
				label: {
					formatter: function(value, index) {
						var date = format('yyyy/MM/dd hh:mm:ss', new Date(value));
						return date;
					}
				}
			},
			tooltip: {
				trigger: 'item'
			},
			geo: {
				map: 'bmap'
			},
			series: [{
					type: 'lines',
					coordinateSystem: 'bmap',
					polyline:true,
					zlevel: 2,
					effect: {
						show: true,
						// period: 3,
						trailLength: 0,
						symbol: "pin",
						symbolSize: 17,
						// delay:2000
					},
					lineStyle: {
						normal: {
							color: color[0],
							width: 0,
							opacity: 0.4,
							curveness: 0.2
						}
					}
				},
				{
					type: 'lines',
					coordinateSystem: 'bmap',
					polyline:true,
					zlevel: 2,
					effect: {
						show: true,
						// period: 3,
						trailLength: 0,
						symbol: "arrow",
						symbolSize: 17,
						// delay:2000
					},
					lineStyle: {
						normal: {
							color: color[0],
							width: 0,
							opacity: 0.4,
							curveness: 0.2
						}
					}
				},
				{
					type: 'lines',
					coordinateSystem: 'bmap',
					polyline:true,
					zlevel: 2,
					effect: {
						show: true,
						// period: 3,
						trailLength: 0,
						symbol: "arrow",
						symbolSize: 15
					},
					lineStyle: {
						normal: {
							color: color[1],
							width: 0,
							opacity: 0.4,
							curveness: 0.4
						}
					},
				},
				{
					type: 'lines',
					coordinateSystem: 'bmap',
					polyline:true,
					zlevel: 2,
					effect: {
						show: true,
						// period: 3,
						trailLength: 0,
						symbol: "arrow",
						symbolSize: 15
					},
					lineStyle: {
						normal: {
							color: color[1],
							width: 0,
							opacity: 0.4,
							curveness: 0.4
						}
					},
				},
				{
					type: 'lines',
					coordinateSystem: 'bmap',
					polyline:true,
					zlevel: 2,
					effect: {
						show: true,
						trailLength: 0,
						symbolSize: 0
					},
					lineStyle: {
						normal: {
							color: color[0],
							width: 1,
							opacity: 0.4,
							curveness: 0.2
						}
					},
					data: targetLines
				},
				{
					type: 'lines',
					coordinateSystem: 'bmap',
					polyline:true,
					zlevel: 2,
					effect: {
						show: true,
						trailLength: 0,
						symbolSize: 0
					},
					lineStyle: {
						normal: {
							color: color[1],
							width: 1,
							opacity: 0.4,
							curveness: 0.4
						}
					},
					data: accompanyLines
				},
				{
					type: 'effectScatter',
					coordinateSystem: 'bmap',
					polyline:true,
					zlevel: 2,
					rippleEffect: {
						brushType: 'stroke'
					},
					label: {
						normal: {
							show: true,
							position: 'right',
							formatter: '{b}'
						}
					},
					symbolSize: 8,
					showEffectOn: 'render',
					itemStyle: {
						normal: {
							color: "black"
						}
					},
					data: circleData
				}
			]
		},
		options: optionData
	};
}

/**
 * 绘制echarts
 */
async function drawMap() {

	//初始化echart--此处判断为避免多次初始化造成内存泄露
	if(myChart == null || myChart == undefined) {
		myChart = echarts.init(document.getElementById('allmap'));
	}

	await forData();

	myChart.clear();
	myChart.setOption(this.option);

	//获取map实例
	map = myChart.getModel().getComponent('bmap').getBMap();

	//避免时间轴拖动地图跟随移动
	myChart.getZr().on('mousedown', function(event) {
		if(event.target != undefined && event.topTarget.name != "line") {
			map.disableDragging();
		}
	})
	myChart.getZr().on('mouseup', function(event) {
		map.enableDragging();
	})

	//绘画选择框以及坐标尺
	draw_Manager();

}

/**
 * 添加地图组件
 */
function draw_Manager() {

	var top_right_control = new BMap.ScaleControl({
		anchor: BMAP_ANCHOR_BOTTOM_LEFT
	}); // 左上角，添加比例尺

	map.addControl(top_right_control);
	map.addControl(new BMap.NavigationControl());    
	map.addControl(new BMap.ScaleControl());    
	map.addControl(new BMap.OverviewMapControl());    
	map.addControl(new BMap.MapTypeControl());
	map.setMapStyleV2({     
		styleId: 'a2529087d8d5ef15d9b9c0b753a1c637'
	});
}