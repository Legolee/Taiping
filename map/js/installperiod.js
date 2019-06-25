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
  '杭州':[120.15961678458703,30.264428461462667],
  '广德':[119.400092831526,30.88308832297854],
	'建平':[119.17803275101788,31.13975316157632],
	'东坝':[119.06667397594502,31.279665468719138],
	'高淳':[118.87822066428327,31.322495766824083],
	'溧水':[119.01147048060976,31.644674787013507],
	'秣陵':[118.79160828367104,31.830272745468267],
	'溧阳':[119.47594126894783,31.42957151208645],
	'宜兴':[119.8043068877524,31.354380544302213],
	'常州':[119.95240454075528,31.795627793223378],
	'金坛':[119.54637331472041,31.73794965844205],
	'句容':[119.16565955378756,31.95210114896678],
	'淳化':[118.91248490276722,31.94353508934579],
	'上派河':[117.17636052485603,31.719239626419764],
	'庐州':[117.3072308801767,31.87390459179873],
	'滁州':[118.29925672703943,32.31505666227966],
	'全椒':[118.27567150954964,32.088056082323455],
	'当涂':[118.49703101114926,31.5452133169698],
	'江宁':[118.61695584584311,31.862157522946393],
	'善桥':[118.7430672791521,31.97113683701342],
	'贵池':[117.48711813221746,30.659269063689226],
	'青阳':[117.84879620510367,30.637853914636753],
	'泾县':[118.42117379428339,30.683658075978773],
	'宣城':[118.98310730542026,30.636449569623096],
};
var points=[
	[118.85632962302962,32.02538854794635],
	[119.53933011014315,31.988840026896795],
	[119.95240454075528,31.795627793223378],
	[120.61379952193589,31.31459595628472],
	[120.74426536888555,30.761989932290703],
	[120.54010761458531,30.640637420993357],
	[120.42303813309846,30.532133999127495],
	[120.15961678458703,30.264428461462667]
]
//地图中心点以及缩放级别等
var bmap = {
	center: [119.333, 31.275],
	zoom: 9,
	roam: true,
};
//目标模拟数据
var targetData = [
	[{
			name: '杭州',
			value: '1860-04-04T03:13:39.000Z'
		},
		{
			name: '广德',
			value: '1860-04-04T04:13:39.000Z'
		},
		1,
		{
			value:null
		}
	],
	[{
		name: '广德',
		value: '1860-04-08T03:13:39.000Z'
	}, {
		name: '建平',
		value: '1860-04-08T03:14:39.000Z'
	},
	 1,{value:null}],
	[{
		name: '建平',
		value: '1860-04-13T03:13:39.000Z'
	}, {
		name: '溧阳',
		value: '1860-04-13T03:14:39.000Z'
	}, 1,{	value:null}],
	[{
		name: '溧阳',
		value: '1860-04-14T03:13:39.000Z'
	}, {
		name: '常州',
		value: '1860-04-14T03:14:39.000Z'
	}, 1,{value:[119.8043068877524,31.354380544302213]}],
	[{
		name: '常州',
		value: '1860-04-23T03:13:39.000Z'
	}, {
		name: '句容',
		value: '1860-04-23T03:14:39.000Z'
	}, 1,{value:[119.54637331472041,31.73794965844205]}],
	[{
		name: '句容',
		value: '1860-04-24T03:13:39.000Z'
	}, {
		name: '淳化',
		value: '1860-04-24T03:14:39.000Z'
	}, 1,{value:null}]
];
//伴随模拟数据
var accompanyData = [
	[{
		name: '建平',
		value: '1860-04-23T03:17:55.000Z'
	}, {
		name: '高淳',
		value: '1860-04-23T03:18:55.000Z'
	}, 2,{value:[119.06667397594502,31.279665468719138]}],
	[{
		name: '高淳',
		value: '1860-04-24T03:17:55.000Z'
	}, {
		name: '秣陵',
		value: '1860-04-24T03:18:55.000Z'
	}, 2,{value:[119.01147048060976,31.644674787013507]}],
];
var chenData=[
	[{
		name:'上派河',
		value:null,
	},{
		name:'庐州',
		value:null,
	},3,{value:null}],
	[{
		name:'庐州',
		value:null,
	},{
		name:'滁州',
		value:null,
	},3,{value:null}],
	[{
		name:'滁州',
		value:null,
	},{
		name:'全椒',
		value:null,
	},3,{value:null}],
	[{
		name:'全椒',
		value:null,
	},{
		name:'当涂',
		value:null,
	},3,{value:null}],
	[{
		name:'当涂',
		value:null,
	},{
		name:'江宁',
		value:null,
	},3,{value:null}],
	[{
		name:'江宁',
		value:null,
	},{
		name:'善桥',
		value:null,
	},3,{value:null}],
]
var qingData=[
	[{
		name:'贵池',
		value:null,
	},{
		name:'青阳',
		value:null,
	},3,{value:null}],
	[{
		name:'青阳',
		value:null,
	},{
		name:'泾县',
		value:null,
	},3,{value:null}],
	[{
		name:'泾县',
		value:null,
	},{
		name:'宣城',
		value:null,
	},3,{value:null}],
	[{
		name:'宣城',
		value:null,
	},{
		name:'建平',
		value:null,
	},3,{value:null}],
];
//绘制多边形
function renderItem(params, api) {
	var coords = [[118.75830078125,30.96356201171875],[118.8839111328125,30.9091796875],[119.12109375,30.920654296875],[119.2352294921875,30.9263916015625],[119.3780517578125,30.9749755859375],[119.5491943359375,31.020751953125],[119.64642333984375,31.03790283203125],[119.8118896484375,31.06915283203125],[119.9432373046875,31.0662841796875],[120.0233154296875,31.0150146484375],[120.11175537109375,30.9549560546875],[120.12890625,30.92352294921875],[120.09283447265625,30.922607421875],[120.1497802734375,30.8740234375],[120.14404296875,30.7884521484375],[120.10687255859375,30.69140625],[120.08709716796875,30.63134765625],[120.06134033203125,30.54864501953125],[120.06134033203125,30.4742431640625],[120.07562255859375,30.40869140625],[120.1240234375,30.32574462890625],[120.15838623046875,30.3145751953125],[120.2041015625,30.28594970703125],[120.20697021484375,30.248779296875],[120.18695068359375,30.21160888671875],[120.084228515625,30.2230224609375],[119.984375,30.25164794921875],[119.88427734375,30.33148193359375],[119.8642578125,30.45159912109375],[119.86138916015625,30.58294677734375],[119.7471923828125,30.62847900390625],[119.66448974609375,30.64276123046875],[119.60443115234375,30.6771240234375],[119.54742431640625,30.7626953125],[119.4644775390625,30.81414794921875],[119.36749267578125,30.74267578125],[119.279052734375,30.6256103515625],[119.22467041015625,30.52288818359375],[119.09051513671875,30.40301513671875],[118.9906005859375,30.288818359375],[118.936279296875,30.1717529296875],[118.86212158203125,30.026123046875],[118.77349853515625,29.93463134765625],[118.68218994140625,29.834716796875],[118.47381591796875,29.8489990234375],[118.390869140625,29.91192626953125],[118.33392333984375,30.02325439453125],[118.30816650390625,30.10882568359375],[118.28240966796875,30.18011474609375],[118.22833251953125,30.2230224609375],[118.10247802734375,30.2430419921875],[118.01116943359375,30.2430419921875],[117.908447265625,30.3031005859375],[117.83123779296875,30.36297607421875],[117.65716552734375,30.39727783203125],[117.51153564453125,30.3944091796875],[117.40020751953125,30.3345947265625],[117.1973876953125,30.18609619140625],[117.08538818359375,30.12139892578125],[117.0635986328125,30.0982666015625],[116.9892578125,30.0782470703125],[116.90081787109375,30.0782470703125],[116.82098388671875,30.083984375],[116.72943115234375,30.083984375],[116.65814208984375,30.10400390625],[116.59527587890625,30.17266845703125],[116.52398681640625,30.24676513671875],[116.466796875,30.27825927734375],[116.39837646484375,30.315185546875],[116.34686279296875,30.36383056640625],[116.3154296875,30.40960693359375],[116.2899169921875,30.466552734375],[116.343994140625,30.50091552734375],[116.42694091796875,30.52374267578125],[116.475341796875,30.56097412109375],[116.5211181640625,30.60650634765625],[116.57806396484375,30.677978515625],[116.599853515625,30.72308349609375],[116.60955810546875,30.7435302734375],[116.66387939453125,30.8948974609375],[116.6925048828125,31.0062255859375],[116.6925048828125,31.1063232421875],[116.70654296875,31.18902587890625],[116.72943115234375,31.28607177734375],[116.75079345703125,31.334716796875],[116.76947021484375,31.3775634765625],[116.82098388671875,31.474609375],[116.83306884765625,31.49066162109375],[116.83349609375,31.4913330078125],[116.89508056640625,31.574462890625],[116.949462890625,31.67724609375],[117.02642822265625,31.79425048828125],[117.10650634765625,31.9029541015625],[117.205078125,31.9896240234375],[117.22357177734375,32.00567626953125],[117.3262939453125,32.10272216796875],[117.4891357421875,32.19683837890625],[117.603271484375,32.2454833984375],[117.6688232421875,32.268798828125],[117.84307861328125,32.3310546875],[117.98870849609375,32.382568359375],[118.11431884765625,32.42547607421875],[118.21160888671875,32.4569091796875],[118.2943115234375,32.482421875],[118.3798828125,32.4881591796875],[118.40716552734375,32.48504638671875],[118.4542236328125,32.47955322265625],[118.48370361328125,32.4580078125],[118.51983642578125,32.43115234375],[118.5570068359375,32.362548828125],[118.58843994140625,32.291259765625],[118.62542724609375,32.2454833984375],[118.6768798828125,32.1856689453125],[118.73956298828125,32.1541748046875],[118.81396484375,32.13702392578125],[118.84539794921875,32.119873046875],[118.862548828125,32.0428466796875],[118.85113525390625,31.988525390625],[118.81396484375,31.93707275390625],[118.75677490234375,31.89434814453125],[118.71844482421875,31.8116455078125],[118.68988037109375,31.72015380859375],[118.65838623046875,31.58331298828125],[118.6326904296875,31.48321533203125],[118.60693359375,31.37188720703125],[118.6011962890625,31.26055908203125],[118.6126708984375,31.19189453125],[118.68414306640625,31.072021484375],[118.75830078125,30.96356201171875]];
	var points = [];
	for (var i = 0; i < coords.length; i++) {
			points.push(api.coord(coords[i]));
	}
	var color = api.visual('color');

	return {
			type: 'polygon',
			shape: {
					points: echarts.graphic.clipPointsByRect(points, {
							x: params.coordSys.x,
							y: params.coordSys.y,
							width: params.coordSys.width,
							height: params.coordSys.height
					})
			},
			style: api.style({
					fill: color,
					stroke: echarts.color.lift(color),
					lineWidth:0,
			})
	};
}

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
	var qingNum=qingData.length;
	var chenNum=chenData.length;

	//目标和伴随的线
	var targetLines = [];
	var accompanyLines = [];
	var qingLines=[];
	var chenLines=[];

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
	for(var i = 0; i < qingNum; i++) {
		qingLines.push(sumData(qingData[i])[0][0]);
	}
	for(var i = 0; i < chenNum; i++) {
		chenLines.push(sumData(chenData[i])[0][0]);
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
	var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
	option = {
		baseOption: {
			bmap: bmap,
			title: {
				text: '太平军二破江南大营战役过程',
				subtext: '战役开始于1860年1月28日，于同年5月6日结束，前后历时九十八天',
				left: 'middle'
		},
		legend:{
			type:'plain',
			show:'true',
      orient: 'vertical',
			//top: 'bottom',
			bottom:10,
			right:10,
      //left: 'right',
      textStyle: {
						color: '#fff',
						
			padding: [3, 4, 5, 6],
			},
			data:['作战地点','东路大军（李秀成、李世贤部）','中路大军（杨辅清、刘官芳部）','西路大军（陈玉成部）','杨辅清部行军路线','太平军势力范围(攻占杭州后)'],
			backgroundColor:'#fffaf5',
			shadowColor:'gray',
			shadowBlur:3,
			textStyle: {
				color:'black'
			}
		},
			timeline: {
				axisType: 'category', //category
				autoPlay: true,
				playInterval: 4000,
				data: num,
				left: 200,
				bottom:20,
				width:600,
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
						symbol:"arrow",
						symbolSize:10,
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
						symbol:"arrow",
						symbolSize:10,
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
						symbol:"arrow",
						symbolSize:10,
					},
					lineStyle: {
						normal: {
							color: "black",
							width: 0,
							opacity: 0.4,
							curveness: 0.2
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
						symbol:"arrow",
						symbolSize:10,
					},
					lineStyle: {
						normal: {
							color: "black",
							width: 0,
							opacity: 0.4,
							curveness: 0.2
						}
					},
				},
				{
					type: 'lines',
					name:'东路大军（李秀成、李世贤部）',
					coordinateSystem: 'bmap',
					polyline:true,
					zlevel: 2,
					smooth:true,
					effect: {
						show: true,
						trailLength: 0,
						symbolSize: 0
					},
					lineStyle: {
						normal: {
							color: color[0],
							width: 3,
							opacity: 0.6,
							curveness: 0.2,
						},
					},
					data: targetLines
				},
				{
					type: 'lines',
					name:'中路大军（杨辅清、刘官芳部）',
					coordinateSystem: 'bmap',
					polyline:true,
					smooth:true,
					zlevel: 2,
					effect: {
						show: true,
						trailLength: 0,
						symbolSize: 0
					},
					lineStyle: {
						normal: {
							color: color[1],
							width: 3,
							opacity: 0.6,
							curveness: 0.2
						},
					},
					data: accompanyLines
				},
				{
					type: 'lines',
					name:'杨辅清部行军路线',
					coordinateSystem: 'bmap',
					symbol:'arrow',
					polyline:true,
					smooth:true,
					zlevel: 2,
					effect: {
						show: true,
						trailLength: 0,
						symbolSize: 3
					},
					lineStyle: {
						normal: {
							color: "#003399",
							width: 3,
							opacity: 0.4,
							curveness: 0.2
						},
					},
					data: qingLines,
				},
				{
					type: 'lines',
					name:'西路大军（陈玉成部）',
					coordinateSystem: 'bmap',
					symbol:'arrow',
					polyline:true,
					smooth:true,
					zlevel: 2,
					effect: {
						show: true,
						trailLength: 0,
						symbolSize: 3
					},
					lineStyle: {
						normal: {
							color: "#dfa773",
							width: 3,
							opacity: 0.6,
							curveness: 0.2
						},
					},
					data: chenLines,
				},
				{
					type: 'custom',
					name:'太平军势力范围(攻占杭州后)',
					coordinateSystem: 'bmap',
					renderItem: renderItem,
					itemStyle: {
							normal: {
								color:"white",
								opacity: 0.5
							}
					},
					animation: false,
					silent: true,
					data: [0],
					z: -10
			},
			
				{
					type: 'effectScatter',
					name:'作战地点',
					coordinateSystem: 'bmap',
					polyline:true,
					zlevel: 2,
					rippleEffect: {
						scale:1.5
					},
					label: {
						normal: {
							show: true,
							position: 'right',
							formatter: '{b}',
							color:'#00000',
							fontWeight:'bold',
							fontSize:14,
							offset:[5,5],
						}
					},
					symbolSize: 8,
					hoverAnimation: true,
					//symbol:'image://..img/fire.png',
					showEffectOn: 'render',
					itemStyle: {
						normal: {
							color: '#666666',
							opacity:0.8
						},
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
		styleId: 'f4e5927fd72ffab059d57fbce4f91256'
	});
}