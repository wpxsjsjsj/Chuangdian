<template>
	<view class="bg">
		<!-- <image :src="'/static/logo.png'" style="width: 750rpx;height: 640rpx;" /> -->
		<!-- 图片 -->
		<swiper style="width: 100%; height: 400rpx;" indicator-dots circular autoplay indicator-color="#E9E9E9"
			indicator-active-color="#38CBD5">
			<swiper-item v-for="item,index in detailInfo.imgs_url" :key="index">
				<image style="width: 100%; height: 280rpx;" :src="item" mode="aspectFill"
					@error="imageError" />
			</swiper-item>
		</swiper>
		<!-- 价格 -->
		<view class="h-layout">
			<text style="flex: 1; font-size: 52rpx;font-weight: 500;color: #FF5500;padding: 32rpx;">
				<font style="font-size: 24rpx;">¥</font>{{detailInfo.spec[0].goods_price}}
			</text>

			<image :src="'/static/ic_share.png'" style="width: 36rpx;height: 36rpx;padding: 32rpx;" />
		</view>
		<!-- 标题 -->
		<view style="font-size: 30rpx;font-weight: 500;color: #333333;padding:0 32rpx;">{{detailInfo.goods_name}}</view>

		<view style="background-color: #F3F4F6; height: 16rpx;margin-top: 32rpx;" />
		<!-- 详情 -->
		<view class="h-layout" style="align-items: baseline;">
			<!-- <text style="font-size: 24rpx;font-weight: 500;color: #333333;padding: 32rpx;" v-html="detailInfo.content"> -->
				<!-- 商品详情 -->
			<!-- </text> -->
			<!-- <text style="flex: 1; font-size: 24rpx;font-weight: 400;color: #333333;padding: 32rpx 32rpx 32rpx 0; ">
				{{detail}}
			</text> -->
		</view>
		<view style="background-color: #F3F4F6; height: 16rpx;" />
		<!-- 图片 -->
		<view v-for="item in imgList">
			<image :src="item.img" style="width:100%" mode="widthFix" />
		</view>
		<text style="font-size: 24rpx;font-weight: 500;color: #333333;padding: 32rpx;">
			价格说明
		</text>
		<text style="font-size: 24rpx;font-weight: 400;color: #333333;padding: 0 32rpx;">
			参考价：
		</text>
		<text style="font-size: 24rpx;font-weight: 500;color: #333333;padding: 32rpx;">
			{{cankaojia}}
		</text>
		<text style="font-size: 24rpx;font-weight: 400;color: #333333;padding: 0 32rpx;">
			促销价：
		</text>
		<text style="font-size: 24rpx;font-weight: 500;color: #333333;padding: 32rpx;">
			{{cuxiaojia}}
		</text>
		<view style="background-color: #F3F4F6; height: 16rpx;" />
		<!-- 按钮 -->
		<button class="btn" @click="openSkuPopup()">立即购买</button>

		
		<vk-data-goods-sku-popup
		      ref="skuPopup"
		      v-model="skuKey" 
		      border-radius="20" 
		      :localdata="goodsInfo"
		      :mode="skuMode"
		      @open="onOpenSkuPopup"
		      @close="SkuPopup"
		      @add-cart="addCart"
		      @buy-now="buyNow"
		    ></vk-data-goods-sku-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					// 是否打开SKU弹窗
					skuKey:false,
					// SKU弹窗模式
					skuMode:3,
					// 后端返回的商品信息
					goodsInfo:{},
					buyData: {},
					specIdArr: [],
					specId: '',
				detailInfo: {},
				title: "舒居 无火香薰（三瓶装）家用室内卧室房间香氛 香格里拉精油藤条香熏瓶卫生间清新剂",
				detail: "舒居无火香熏A香水组一款中性淡香水。 清新，绿色，随性雅致。 自然精髓，其芬芳代表着法兰西生活艺术。 柑橘和草香的完美和谐，又融入西普基香调。",
				imgList: [{
						img: "/static/img_main.png"
					},
					{
						img: "/static/img_main.png"
					},
					{
						img: "/static/ic_logo.png"
					}, {
						img: "/static/logo.png"
					},
					{
						img: "/static/img_main.png"
					},
					{
						img: "/static/img_main.png"
					}
				],
				cankaojia: "商品展示的划线价或参考价可能是品牌专柜价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在考拉上曾经展示过的销售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考",
				cuxiaojia: "如无特殊说明，促销价是销售商在参考价基础上给予的优惠价格。如有疑问，您可以在购买前与客服联系。"
			}
		},
		onLoad(options) {
			console.log('详情', options)
			this.getGoodsDetailData(options.id)
		},
		methods: {
			transformData(inputData) {
				let _this = this
				console.log('aaaaaaaaaaaaaaaaaaaaa',inputData);
				// return 
			  const transformedData = {
			    _id: inputData.detail.goods_id.toString(),
			    name: inputData.detail.goods_name,
			    goods_thumb: inputData.detail.image,
			    sku_list: [],
			    spec_list: []
			  };
			
			  if (inputData.specData && inputData.specData.spec_attr) {
			    inputData.specData.spec_attr.forEach(specAttr => {
			      const specName = specAttr.group_name;
			      const specValues = specAttr.spec_items.map(item => ({ name: item.spec_value, id: item.item_id }));
			
			      transformedData.spec_list.push({
			        name: specName,
			        list: specValues
			      });
			    });
			
			    if (inputData.specData.spec_list) {
					_this.specIdArr = inputData.specData.spec_list
			      inputData.specData.spec_list.forEach(specItem => {
			        const matchingSpecValues = specItem.spec_sku_id.split('_')
			          .map(specId => {
			            const specValue = inputData.specData.spec_attr
			              .flatMap(attr => attr.spec_items)
			              .find(item => {
							  
							  return item.item_id === parseInt(specId)
							});
							
			            return specValue ? specValue.spec_value : null;
			          })
			          .filter(value => value !== null);
			        const sku = {
			          _id: specItem.form.goods_no,
			          goods_id: transformedData._id,
			          goods_name: transformedData.name,
			          image: specItem.form.spec_image,
			          price: parseFloat(specItem.form.goods_price.replace('.', '')),
			          sku_name_arr: matchingSpecValues,
			          stock: specItem.form.stock_num
			        };
			
			        transformedData.sku_list.push(sku);
			      });
			    }
			  }
			
			  return transformedData;
			},
			// 获取商品信息，并打开sku弹出
			      openSkuPopup(){
					console.log('商品信息', this.info)
					let that = this
					that.buyData = this.info
					if(!this.info.specData){
						that.specId = ''
						console.log('单规格，不弹出');
						that.buy()
						return 
					}else{
						that.goodsInfo = that.transformData(this.info)
					}
					that.skuKey = true;
			      },
			      // sku组件 开始-----------------------------------------------------------
			      onOpenSkuPopup(){
			        console.log("监听 - 打开sku组件");
			      },
			      SkuPopup(){
			        console.log("监听 - 关闭sku组件");
			      },
			      // 加入购物车前的判断
			      addCartFn(obj){
			        let { selectShop } = obj;
			        // 模拟添加到购物车,请替换成你自己的添加到购物车逻辑
			        let res = {};
			        let name = selectShop.goods_name;
			        if(selectShop.sku_name != "默认"){
			          name += "-"+selectShop.sku_name_arr;
			        }
			        res.msg = `${name} 已添加到购物车`;
			        if(typeof obj.success == "function") obj.success(res);
			      },
			      // 加入购物车按钮
			      addCart(selectShop){
					  let that = this
			        console.log("监听 - 加入购物车");
			        that.addCartFn({
			          selectShop : selectShop,
			          success : function(res){
			            // 实际业务时,请替换自己的加入购物车逻辑
			            that.toast(res.msg);
			            setTimeout(function() {
			              that.skuKey = false;
			            }, 300);
			          }
			        });
			      },
			      // 立即购买
			      buyNow(selectShop){
					  let that = this
			        console.log("监听 - 立即购买",'selectShop',selectShop);
					that.buyData.buy_num = selectShop.buy_num
					// 根据 selectShop 的 sku_name_arr 匹配规格信息
					  const specData = that.buyData.specData;
					  const specItems = specData.spec_attr.flatMap(group => group.spec_items);
					  const matchingSpecValues = selectShop.sku_name_arr.map(value => {
					    const matchedItem = specItems.find(item => item.spec_value === value);
					    return matchedItem ? matchedItem.item_id : null;
					  });
					
					  // 过滤掉 null 的值，然后用 _ 连接成字符串
					  const specId = matchingSpecValues.filter(id => id !== null).join('_');
					
					that.specId = specId;
			        that.addCartFn({
			          selectShop : selectShop,
			          success : function(res){
			            // 实际业务时,请替换自己的立即购买逻辑
			            that.buy();
			          }
			        });
			      },
			      toast(msg){
			        uni.showToast({
			          title: msg,
			          icon:"none"
			        });
			      },
			async buy(e) {
				let _this = this
				if(e){
					e.preventDefault();
				}
				let data = {
					goods_id: _this.buyData.detail.goods_id,
					goods_num: _this.buyData.buy_num || 1,
					goods_sku_id: _this.specId || ''
				}
				// console.log('买东西咯', this.buyData)
				const res = await this.$myRequest({
					url: 'api/Order/buyNow',
				    method: "POST",
					data
				});
				let goods = {
					goods_name: res.data.goods_list[0].goods_name,
					name: res.data.address.name,
					phone: res.data.address.phone,
					addressDetail: res.data.address.detail,
					address_id: res.data.address.address_id,
					category_id: res.data.goods_list[0].category_id,
					goods_id: res.data.goods_list[0].goods_id,
					goods_attr: res.data.goods_list[0].goods_sku.goods_attr,
					goods_price: res.data.goods_list[0].goods_sku.goods_price,
					order_total_price: res.data.order_total_price,
					order_pay_price: res.data.order_pay_price,
					order_total_num: res.data.order_total_num,
					image: res.data.goods_list[0].image,
					spec_sku_id: res.data.goods_list[0].goods_sku.spec_sku_id
				}
				const queryString = Object.keys(goods)
				  .map(key => `${key}=${encodeURIComponent(goods[key])}`)
				  .join('&');
				console.log('买东西咯',res)
				console.log('买东西咯',goods)
				console.log('买东西咯',queryString)
				if (res.code == 1) {
					uni.navigateTo({
						url: `/pages/goodsConfirm/goodsConfirm?${queryString}`,
						
					})
				}else{
					uni.showToast({
						title: res.msg,
						icon: 'error'
					})
				}
			},
			//获取精选推荐数据
			async getGoodsDetailData(goods_id){
				let _this = this
				    const res = await this.$myRequest({
				        url: 'api/Goods/detail',
				        method: "POST",
				        data: {
				          goods_id
				        }
				    });
					console.log('商品详情',res)
				    if (res.code == 1) {
						_this.detailInfo = res.data.detail
						_this.info = res.data
				    } else {
						uni.showToast({
							title: res.msg,
							icon: 'error'
						})
				    }
			},
		}
	}
</script>

<style>
	.bg {
		display: flex;
		flex-direction: column;
	}

	.h-layout {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.btn {
		height: 104rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #38CBD5;
		border-radius: 54rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin: 32rpx;
	}
</style>