<template>
	<picker mode="multiSelector" :range="multiArray" :value="multiIndex" @change="bindMultiPickerChange" @columnchange="bindColumnChange">
		<view class="picker" :class="['picker' + type,{width100: type == 2}]">
			<text v-show="type == 2" :class="{type2: type == 2}">当前选择：</text><text v-show="type == 2" :class="{inputType2: type == 2}">
			{{multiArray[0][multiIndex[0]]}}
			{{multiArray[1][multiIndex[1]]}}
			{{multiArray[2][multiIndex[2]]}}</text> 
			<text v-show="type == 1">{{multiArray[2][multiIndex[2]]}}</text>
			<text v-show="type == 3" :class="{type3: type == 3}"></text><text v-show="type == 3" :class="{inputType3: type == 3}">
			{{multiArray[0][multiIndex[0]]}}
			{{multiArray[1][multiIndex[1]]}}
			{{multiArray[2][multiIndex[2]]}}</text> 
		</view>
	</picker>
</template>

<script>
	import pcaData from '../../static/pca.json'
	export default {
		name: "myPicker",
		//接收父控件的值
		props: {
			type: {
				type: String,
				default: '1'
			},
			isSaveData: { // 是否需要保存地址数据
				type: String,
				default: '0'
			},
			isEdit: {  // 是否为编辑状态
				type: String,
				default: '0'
			},
			region: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				multiArray: [[], [], []], // 用于存储省市区数据的数组
				multiIndex: [0, 0, 0], // 默认选中的省市区索引
			};
		},
		created() {
			console.log('进入到了picker', this.region)
		    this.initMultiArray();
		  },
		methods: {
			initMultiArray() {
				console.log('hehe ')
				if(this.isEdit == '1'){
					let addressArr = decodeURIComponent(this.region).split(',');
					// 省份
					console.log(9999, Object.keys(pcaData))
					this.multiArray[0] = Object.keys(pcaData);
					// 城市
					let provinceIndex = this.multiArray[0].indexOf(addressArr[0]);
					this.multiArray[1] = provinceIndex !== -1 ? Object.keys(pcaData[addressArr[0]]) : [];
					// 区域
					let cityIndex = this.multiArray[1].indexOf(addressArr[1]);
					this.multiArray[2] = cityIndex !== -1 ? pcaData[addressArr[0]][addressArr[1]] : [];
									
					// 更新当前选中的省市区索引
					this.multiIndex[0] = provinceIndex !== -1 ? provinceIndex : 0;
					this.multiIndex[1] = cityIndex !== -1 ? cityIndex : 0;
					this.multiIndex[2] = this.multiArray[2].indexOf(addressArr[2]);
				}else if(uni.getStorageSync('address')&&this.isEdit !== '1'){
				  let addressArr = uni.getStorageSync('address').split(',')
				  // 省份
				  this.multiArray[0] = Object.keys(pcaData);
				  // 城市
				  let provinceIndex = this.multiArray[0].indexOf(addressArr[0]);
				  this.multiArray[1] = provinceIndex !== -1 ? Object.keys(pcaData[addressArr[0]]) : [];
				  // 区域
				  let cityIndex = this.multiArray[1].indexOf(addressArr[1]);
				  this.multiArray[2] = cityIndex !== -1 ? pcaData[addressArr[0]][addressArr[1]] : [];
				
				  // 更新当前选中的省市区索引
				  this.multiIndex[0] = provinceIndex !== -1 ? provinceIndex : 0;
				  this.multiIndex[1] = cityIndex !== -1 ? cityIndex : 0;
				  this.multiIndex[2] = this.multiArray[2].indexOf(addressArr[2]);
				}else{
				  // 加载省份数据
				  this.multiArray[0] = Object.keys(pcaData);
				  // 默认加载第一个省份的城市
				  this.multiArray[1] = Object.keys(pcaData[this.multiArray[0][0]]);
				  // 默认加载第一个省份的第一个城市的区域
				  this.multiArray[2] = pcaData[this.multiArray[0][0]][this.multiArray[1][0]];
				  // 重置当前选中的省市区索引
				  this.multiIndex = [0, 0, 0];
				}
				this.$emit('chooseAddress', `${this.multiArray[0][this.multiIndex[0]]},${this.multiArray[1][this.multiIndex[1]]},${this.multiArray[2][this.multiIndex[2]]}`)
			      // 如果需要在picker初始化时设置默认选中的省市区，可以在这里设置multiIndex
			      // 例如，设置为北京市，北京城区，东城区
			      // this.multiIndex = [0, 0, 0]; // 根据实际数据调整索引
			    },
			    bindMultiPickerChange: function (e) {
			        this.multiIndex = e.detail.value;
			        // 根据新的索引更新省市区的显示
			        const province = this.multiArray[0][this.multiIndex[0]];
			        const city = this.multiArray[1][this.multiIndex[1]];
			        const district = this.multiArray[2][this.multiIndex[2]];
			        
			        this.cityText = `${province} ${city} ${district}`; // 更新显示的文本
					if(this.isSaveData == '1'){
						uni.setStorageSync('address', `${this.multiArray[0][this.multiIndex[0]]},${this.multiArray[1][this.multiIndex[1]]},${this.multiArray[2][this.multiIndex[2]]}`)
					}
					console.log(this.multiArray[0][this.multiIndex[0]],this.multiArray[1][this.multiIndex[1]],this.multiArray[2][this.multiIndex[2]])
					this.$emit('chooseAddress', `${this.multiArray[0][this.multiIndex[0]]},${this.multiArray[1][this.multiIndex[1]]},${this.multiArray[2][this.multiIndex[2]]}`)
				},
			    bindColumnChange: function (e) {
			        const { column, value } = e.detail;
			        if (column === 0) { // 省份改变，更新城市和区域
			          let selectedProvince = this.multiArray[0][value];
			          this.multiArray[1] = Object.keys(pcaData[selectedProvince]);
			          this.multiArray[2] = pcaData[selectedProvince][this.multiArray[1][0]];
			          this.multiIndex[0] = value;
			          this.multiIndex[1] = 0;
			          this.multiIndex[2] = 0;
			        } else if (column === 1) { // 城市改变，更新区域
			          let selectedProvince = this.multiArray[0][this.multiIndex[0]];
			          let selectedCity = this.multiArray[1][value];
			          this.multiArray[2] = pcaData[selectedProvince][selectedCity];
			          this.multiIndex[1] = value;
			          this.multiIndex[2] = 0;
			        }
			        this.$forceUpdate(); // 强制更新以确保视图重新渲染
			    },
		}
	}
</script>

<style>
	.h-layout {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.width100{width: 100%;}
	.type2{
		font-size: 28rpx;font-weight: 400;color: #666666;width: 180rpx;
	}
	.type3{
		font-size: 28rpx;font-weight: 400;color: #666666;width: 500rpx;
	}
	.inputType2{
		font-size: 28rpx;font-weight: 400;color: #333333;margin-left: 40rpx;
	}
	.inputType3{
		font-size: 26rpx;font-weight: 400;color: #333333;margin-left: 40rpx;
	}
	.picker{border-bottom: none;margin-left: -30rpx;}
	.picker.picker1{margin-left: 0;}
</style>