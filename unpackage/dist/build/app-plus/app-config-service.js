
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#FFFFFF","enablePullDownRefresh":true,"onReachBottomDistance":50,"backgroundTextStyle":"light","navigationBar":{"backgroundColor":"#FFFFFF","titleText":"创点","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"创点","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":true},"compilerVersion":"3.6.4","entryPagePath":"pages/index/index","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#999999","selectedColor":"#333333","borderStyle":"white","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","backgroundColor":"white","list":[{"pagePath":"pages/main/main","iconPath":"/static/tabs/tab1_uncheck.png","selectedIconPath":"/static/tabs/tab1_check.png","text":"首页"},{"pagePath":"pages/scene/scene","iconPath":"/static/tabs/tab2_uncheck.png","selectedIconPath":"/static/tabs/tab2_check.png","text":"场景"},{"pagePath":"pages/shop/shop","iconPath":"/static/tabs/tab3_uncheck.png","selectedIconPath":"/static/tabs/tab3_check.png","text":"商城"},{"pagePath":"pages/mine/mine","iconPath":"/static/tabs/tab4_uncheck.png","selectedIconPath":"/static/tabs/tab4_check.png","text":"我的"}],"selectedIndex":0,"shown":true},"locales":{}};
  const __uniRoutes = [{"path":"pages/index/index","meta":{"isQuit":true,"isEntry":true,"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/login/login","meta":{"enablePullDownRefresh":false,"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/forgetPassword/forgetPassword","meta":{"enablePullDownRefresh":false,"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/main/main","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":0,"enablePullDownRefresh":false,"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/scene/scene","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"场景","type":"default"},"isNVue":false}},{"path":"pages/shop/shop","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"商城","type":"default"},"isNVue":false}},{"path":"pages/mine/mine","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":3,"enablePullDownRefresh":false,"navigationBar":{"style":"custom","type":"default"},"isNVue":false}},{"path":"pages/information/information","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"个人信息","type":"default"},"isNVue":false}},{"path":"pages/notice/notice","meta":{"enablePullDownRefresh":true,"navigationBar":{"titleText":"消息","type":"default"},"isNVue":false}},{"path":"pages/noticeDetail/noticeDetail","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"消息详情","type":"default"},"isNVue":false}},{"path":"pages/scanQrCode/scanQrCode","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"扫码绑定","type":"default"},"isNVue":true}},{"path":"pages/scanQrCodeForGateway/scanQrCodeForGateway","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"扫码绑定","type":"default"},"isNVue":true}},{"path":"pages/inputDevice/inputDevice","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"手动填写","type":"default"},"isNVue":false}},{"path":"pages/help/help","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"帮助反馈","type":"default"},"isNVue":false}},{"path":"pages/question/question","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"常见问题","type":"default"},"isNVue":false}},{"path":"pages/messagePushSetup/messagePushSetup","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"消息推送设置","type":"default"},"isNVue":false}},{"path":"pages/onlineFeedback/onlineFeedback","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"在线反馈","type":"default"},"isNVue":false}},{"path":"pages/aboutUs/aboutUs","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"关于我们","type":"default"},"isNVue":false}},{"path":"pages/deviceList/deviceList","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"设备列表","type":"default"},"isNVue":false}},{"path":"pages/propertyList/propertyList","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"物业列表","type":"default"},"isNVue":false}},{"path":"pages/deviceOperate/deviceOperate","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#FFFFFF","titleText":"设备操作","type":"default"},"isNVue":false}},{"path":"pages/deviceDetail/deviceDetail","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"设备详情","type":"default"},"isNVue":false}},{"path":"pages/shareDevice/shareDevice","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"共享设备","type":"default"},"isNVue":false}},{"path":"pages/addressManage/addressManage","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"地址管理","type":"default"},"isNVue":false}},{"path":"pages/addAddress/addAddress","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"新增地址","type":"default"},"isNVue":false}},{"path":"pages/couponList/couponList","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"优惠券列表","type":"default"},"isNVue":false}},{"path":"pages/shareDeviceList/shareDeviceList","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"分配设备","type":"default"},"isNVue":false}},{"path":"pages/goodsList/goodsList","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"商品列表","type":"default"},"isNVue":false}},{"path":"pages/goodsDetail/goodsDetail","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"商品详情","type":"default"},"isNVue":false}},{"path":"pages/goodsConfirm/goodsConfirm","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"商品确认","type":"default"},"isNVue":false}},{"path":"pages/searchDevice/searchDevice","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"搜索设备","type":"default"},"isNVue":false}},{"path":"pages/orderList/orderList","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"订单列表","type":"default"},"isNVue":false}},{"path":"pages/orderDetail/orderDetail","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"订单详情","type":"default"},"isNVue":false}},{"path":"pages/selectAddress/selectAddress","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"选择城市","type":"default"},"isNVue":false}},{"path":"pages/bindDevice/bindDevice","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"绑定设备","type":"default"},"isNVue":false}},{"path":"pages/consumableAnalysis/consumableAnalysis","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"耗材分析","type":"default"},"isNVue":false}},{"path":"pages/analysisDetail/analysisDetail","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"分析详情","type":"default"},"isNVue":false}},{"path":"pages/gateway/gateway","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"网关列表","type":"default"},"isNVue":false}},{"path":"pages/deviceListForGateway/deviceListForGateway","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"设备列表","type":"default"},"isNVue":false}},{"path":"pages/addGateway/addGateway","meta":{"enablePullDownRefresh":false,"navigationBar":{"backgroundColor":"#F3F4F6","titleText":"添加网关","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[{}];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  