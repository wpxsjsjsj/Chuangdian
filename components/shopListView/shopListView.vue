<template>
	<view style="width: 100%; display: flex;flex-direction: column;" v-for="item in list" >
		<view class="h-layout" @click="shopDetail(item)">
			<image style="width: 188rpx;height: 188rpx;" :src="item.image"></image>
			<view style="flex: 1;display: flex;flex-direction: column; margin-left: 30rpx;">
				<view style="color: #333333; font-size: 24rpx; font-weight: 400;">
					{{item.goods_name}}
				</view>
				<view style="display: flex; flex-direction: row;align-items: baseline;margin-top: 14rpx;">
					<!-- <text style="flex: 1;font-size: 24rpx;font-weight: 400;color: #666666;">100ml</text> -->
					<text style="font-size: 24rpx;font-weight: 400;color: #666666;">已售</text>
					<text style="font-size: 24rpx;font-weight: 400;color: #FF5500;margin:8rpx;">{{item.sales_actual}}</text>
					<text style="font-size: 24rpx;font-weight: 400;color: #666666;">件</text>
				</view>
				<view style="display: flex; flex-direction: row;align-items: baseline;margin-top: 20rpx;">
					<text style="font-size: 24rpx;font-weight: 400;color: #FF5500;">¥</text>
					<text style="flex: 1;font-size: 32rpx;font-weight: 500;color: #FF5500;">{{item.goods_price}}</text>
					<text @tap.stop="openSkuPopup($event,item)"
						style="font-size: 24rpx;color: #FFF; font-weight: 400;padding: 8rpx 22rpx; background-color: #38CBD5 ; border-radius: 26rpx;">
						立即购买</text>
				</view>
			</view>
		</view>
	</view>
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
</template>

<script>
	export default {
		name: "shopListView",
		//接收父控件的值
		props: ['list'],
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
				specId: ''
			};
		},
		onLoad(options) {
		    let that = this;
		    that.init(options);
		},
		methods:{
			init(options = {}){
				
			},
			transformData(inputData) {
				let _this = this
			  const transformedData = {
			    _id: inputData.id.toString(),
			    name: inputData.goods_name,
			    goods_thumb: inputData.image,
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
			      openSkuPopup(e,item){
					console.log('商品信息', item)
					let that = this
					that.buyData = item
					if(item.spec_type_text == '单规格'){
						that.specId = ''
						console.log('单规格，不弹出');
						that.buy(e)
						return 
					}else{
						that.goodsInfo = that.transformData(item)
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
					goods_id: _this.buyData.id,
					goods_num: _this.buyData.buy_num || 1,
					goods_sku_id: _this.specId || ''
				}
				console.log(_this.buyData)
				console.log('买东西咯',this.buyData)
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
				// uni.navigateTo({
				// 	url: "/pages/goodsConfirm/goodsConfirm?id="+this.buyData.id
				// })
			},
			shopDetail(item){
				uni.navigateTo({
					url: "/pages/goodsDetail/goodsDetail?id="+item.id
				})
			},
			
		}
	}
</script>

<style>
	.h-layout {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 32rpx;

	}
</style>