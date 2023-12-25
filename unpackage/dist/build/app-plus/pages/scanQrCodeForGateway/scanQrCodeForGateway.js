"use weex:vue";

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
};

if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  const global = uni.requireGlobal()
  ArrayBuffer = global.ArrayBuffer
  Int8Array = global.Int8Array
  Uint8Array = global.Uint8Array
  Uint8ClampedArray = global.Uint8ClampedArray
  Int16Array = global.Int16Array
  Uint16Array = global.Uint16Array
  Int32Array = global.Int32Array
  Uint32Array = global.Uint32Array
  Float32Array = global.Float32Array
  Float64Array = global.Float64Array
  BigInt64Array = global.BigInt64Array
  BigUint64Array = global.BigUint64Array
};


(()=>{var _=Object.create;var d=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var x=Object.getPrototypeOf,b=Object.prototype.hasOwnProperty;var h=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var v=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of m(t))!b.call(e,a)&&a!==r&&d(e,a,{get:()=>t[a],enumerable:!(s=w(t,a))||s.enumerable});return e};var g=(e,t,r)=>(r=e!=null?_(x(e)):{},v(t||!e||!e.__esModule?d(r,"default",{value:e,enumerable:!0}):r,e));var c=h((B,f)=>{f.exports=Vue});var D=g(c());function u(e,t,...r){uni.__log__?uni.__log__(e,t,...r):console[e].apply(console,[...r,t])}var y=(e,t)=>{let r=e.__vccOpts||e;for(let[s,a]of t)r[s]=a;return r};var o=g(c()),C={page:{"":{width:"750rpx",position:"relative",flexDirection:"column",justifyContent:"center"}},barcode:{"":{width:"750rpx",backgroundColor:"#808080"}}},F={onLoad(){uni.getSystemInfo({success:e=>{this.screenWidth=e.windowWidth,this.screenHeight=e.windowHeight}})},data(){return{screenWidth:0,screenHeight:0,fil:[0,2,1]}},methods:{success(e){u("log","at pages/scanQrCodeForGateway/scanQrCodeForGateway.nvue:42","success1:"+e.detail.message),uni.redirectTo({url:"/pages/addGateway/addGateway?sn="+e.detail.message})},fail(e){u("log","at pages/scanQrCodeForGateway/scanQrCodeForGateway.nvue:78","fail1:"+JSON.stringify(e))},search(){uni.navigateTo({url:"/pages/searchDevice/searchDevice"})},input(){uni.navigateTo({url:"/pages/addGateway/addGateway"})}}};function G(e,t,r,s,a,n){return(0,o.openBlock)(),(0,o.createElementBlock)("scroll-view",{scrollY:!0,showScrollbar:!0,enableBackToTop:!0,bubble:"true",style:{flexDirection:"column"}},[(0,o.createElementVNode)("view",{style:(0,o.normalizeStyle)({height:a.screenHeight+"px"}),class:"page"},[(0,o.createElementVNode)("barcode",{id:"1",class:"barcode",style:(0,o.normalizeStyle)({height:a.screenHeight+"px"}),autostart:"true",ref:"barcode",background:"rgb(0,0,0)",frameColor:"#38CBD5",scanbarColor:"#38CBD5",filters:a.fil,"vibrate:":!0,onMarked:t[0]||(t[0]=(...i)=>n.success&&n.success(...i)),onError:t[1]||(t[1]=(...i)=>n.fail&&n.fail(...i))},null,44,["filters"]),(0,o.createElementVNode)("view",{style:{width:"750rpx",position:"absolute",bottom:"0rpx",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"}},[(0,o.createElementVNode)("view",{style:{width:"560rpx",height:"84rpx",background:"#FFFFFF","border-radius":"40rpx",border:"4rpx solid #38CBD5","margin-top":"32rpx","margin-bottom":"100rpx",color:"#333333","font-size":"28rpx",display:"flex","justify-content":"center","align-items":"center"},onClick:t[2]||(t[2]=i=>n.input())},[(0,o.createElementVNode)("u-text",null,"\u624B\u52A8\u586B\u5199")])])],4)])}var l=y(F,[["render",G],["styles",[C]]]);var p=plus.webview.currentWebview();if(p){let e=parseInt(p.id),t="pages/scanQrCodeForGateway/scanQrCodeForGateway",r={};try{r=JSON.parse(p.__query__)}catch(a){}l.mpType="page";let s=Vue.createPageApp(l,{$store:getApp({allowDefault:!0}).$store,__pageId:e,__pagePath:t,__pageQuery:r});s.provide("__globalStyles",Vue.useCssStyles([...__uniConfig.styles,...l.styles||[]])),s.mount("#root")}})();
