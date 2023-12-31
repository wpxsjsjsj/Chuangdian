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


(()=>{var b=Object.create;var d=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var v=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty;var h=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports);var w=(e,r,t,i)=>{if(r&&typeof r=="object"||typeof r=="function")for(let s of m(r))!y.call(e,s)&&s!==t&&d(e,s,{get:()=>r[s],enumerable:!(i=_(r,s))||i.enumerable});return e};var g=(e,r,t)=>(t=e!=null?b(v(e)):{},w(r||!e||!e.__esModule?d(t,"default",{value:e,enumerable:!0}):t,e));var c=h((B,f)=>{f.exports=Vue});var Q=g(c());function u(e,r,...t){uni.__log__?uni.__log__(e,r,...t):console[e].apply(console,[...t,r])}var x=(e,r)=>{let t=e.__vccOpts||e;for(let[i,s]of r)t[i]=s;return t};var o=g(c()),C={page:{"":{width:"750rpx",position:"relative",flexDirection:"column",justifyContent:"center"}},barcode:{"":{width:"750rpx",backgroundColor:"#808080"}}},D={onLoad(){uni.getSystemInfo({success:e=>{this.screenWidth=e.windowWidth,this.screenHeight=e.windowHeight}})},data(){return{screenWidth:0,screenHeight:0,fil:[0,2,1]}},methods:{success(e){u("log","at pages/scanQrCode/scanQrCode.nvue:45","success1:"+e.detail.message),uni.redirectTo({url:"/pages/bindDevice/bindDevice?sn="+e.detail.message})},fail(e){u("log","at pages/scanQrCode/scanQrCode.nvue:81","fail1:"+JSON.stringify(e))},search(){uni.navigateTo({url:"/pages/searchDevice/searchDevice"})},input(){uni.navigateTo({url:"/pages/inputDevice/inputDevice"})}}};function F(e,r,t,i,s,n){return(0,o.openBlock)(),(0,o.createElementBlock)("scroll-view",{scrollY:!0,showScrollbar:!0,enableBackToTop:!0,bubble:"true",style:{flexDirection:"column"}},[(0,o.createElementVNode)("view",{style:(0,o.normalizeStyle)({height:s.screenHeight+"px"}),class:"page"},[(0,o.createElementVNode)("barcode",{id:"1",class:"barcode",style:(0,o.normalizeStyle)({height:s.screenHeight+"px"}),autostart:"true",ref:"barcode",background:"rgb(0,0,0)",frameColor:"#38CBD5",scanbarColor:"#38CBD5",filters:s.fil,"vibrate:":!0,onMarked:r[0]||(r[0]=(...l)=>n.success&&n.success(...l)),onError:r[1]||(r[1]=(...l)=>n.fail&&n.fail(...l))},null,44,["filters"]),(0,o.createElementVNode)("view",{style:{width:"750rpx",position:"absolute",bottom:"0rpx",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"}},[(0,o.createElementVNode)("view",{style:{width:"560rpx",height:"84rpx","background-color":"#38CBD5","border-radius":"40rpx",border:"2rpx solid rgba(60,148,255,0.16)",color:"#FFFFFF","font-size":"28rpx",display:"flex","justify-content":"center","align-items":"center"},onClick:r[2]||(r[2]=l=>n.search())},[(0,o.createElementVNode)("u-text",null,"\u641C\u7D22\u8BBE\u5907 ")]),(0,o.createElementVNode)("view",{style:{width:"560rpx",height:"84rpx",background:"#FFFFFF","border-radius":"40rpx",border:"4rpx solid #38CBD5","margin-top":"32rpx","margin-bottom":"100rpx",color:"#333333","font-size":"28rpx",display:"flex","justify-content":"center","align-items":"center"},onClick:r[3]||(r[3]=l=>n.input())},[(0,o.createElementVNode)("u-text",null,"\u624B\u52A8\u586B\u5199")])])],4)])}var a=x(D,[["render",F],["styles",[C]]]);var p=plus.webview.currentWebview();if(p){let e=parseInt(p.id),r="pages/scanQrCode/scanQrCode",t={};try{t=JSON.parse(p.__query__)}catch(s){}a.mpType="page";let i=Vue.createPageApp(a,{$store:getApp({allowDefault:!0}).$store,__pageId:e,__pagePath:r,__pageQuery:t});i.provide("__globalStyles",Vue.useCssStyles([...__uniConfig.styles,...a.styles||[]])),i.mount("#root")}})();
