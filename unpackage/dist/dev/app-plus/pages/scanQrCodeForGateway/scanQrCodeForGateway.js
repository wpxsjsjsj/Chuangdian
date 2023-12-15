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


(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // vue-ns:vue
  var require_vue = __commonJS({
    "vue-ns:vue"(exports, module) {
      module.exports = Vue;
    }
  });

  // F:/work/ChuangDian/unpackage/dist/dev/.nvue/plugin-vue_export-helper.js
  var import_vue = __toESM(require_vue());
  Object.freeze({});
  Object.freeze([]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };

  // F:/work/ChuangDian/unpackage/dist/dev/.nvue/pages/scanQrCodeForGateway/scanQrCodeForGateway.js
  var import_vue2 = __toESM(require_vue());
  var _style_0 = { "page": { "": { "width": "750rpx", "position": "relative", "flexDirection": "column", "justifyContent": "center" } }, "barcode": { "": { "width": "750rpx", "backgroundColor": "#808080" } } };
  var _sfc_main = {
    onLoad() {
      uni.getSystemInfo({
        success: (res) => {
          this.screenWidth = res.windowWidth;
          this.screenHeight = res.windowHeight;
        }
      });
    },
    data() {
      return {
        screenWidth: 0,
        screenHeight: 0,
        fil: [0, 2, 1]
      };
    },
    methods: {
      success(e) {
        formatAppLog("log", "at pages/scanQrCodeForGateway/scanQrCodeForGateway.nvue:42", "success1:" + e.detail.message);
        uni.redirectTo({
          url: "/pages/addGateway/addGateway?sn=" + e.detail.message
        });
      },
      fail(e) {
        formatAppLog("log", "at pages/scanQrCodeForGateway/scanQrCodeForGateway.nvue:78", "fail1:" + JSON.stringify(e));
      },
      search() {
        uni.navigateTo({
          url: "/pages/searchDevice/searchDevice"
        });
      },
      input() {
        uni.navigateTo({
          url: "/pages/addGateway/addGateway"
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("scroll-view", {
      scrollY: true,
      showScrollbar: true,
      enableBackToTop: true,
      bubble: "true",
      style: { flexDirection: "column" }
    }, [
      (0, import_vue2.createElementVNode)("view", {
        style: (0, import_vue2.normalizeStyle)({ height: $data.screenHeight + "px" }),
        class: "page"
      }, [
        (0, import_vue2.createElementVNode)("barcode", {
          id: "1",
          class: "barcode",
          style: (0, import_vue2.normalizeStyle)({ height: $data.screenHeight + "px" }),
          autostart: "true",
          ref: "barcode",
          background: "rgb(0,0,0)",
          frameColor: "#38CBD5",
          scanbarColor: "#38CBD5",
          filters: $data.fil,
          "vibrate:": true,
          onMarked: _cache[0] || (_cache[0] = (...args) => $options.success && $options.success(...args)),
          onError: _cache[1] || (_cache[1] = (...args) => $options.fail && $options.fail(...args))
        }, null, 44, ["filters"]),
        (0, import_vue2.createElementVNode)("view", { style: { "width": "750rpx", "position": "absolute", "bottom": "0rpx", "display": "flex", "flex-direction": "column", "justify-content": "center", "align-items": "center" } }, [
          (0, import_vue2.createElementVNode)("view", {
            style: { "width": "560rpx", "height": "84rpx", "background": "#FFFFFF", "border-radius": "40rpx", "border": "4rpx solid #38CBD5", "margin-top": "32rpx", "margin-bottom": "100rpx", "color": "#333333", "font-size": "28rpx", "display": "flex", "justify-content": "center", "align-items": "center" },
            onClick: _cache[2] || (_cache[2] = ($event) => $options.input())
          }, [
            (0, import_vue2.createElementVNode)("u-text", null, "\u624B\u52A8\u586B\u5199")
          ])
        ])
      ], 4)
    ]);
  }
  var scanQrCodeForGateway = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__file", "F:/work/ChuangDian/pages/scanQrCodeForGateway/scanQrCodeForGateway.nvue"]]);

  // <stdin>
  var webview = plus.webview.currentWebview();
  if (webview) {
    const __pageId = parseInt(webview.id);
    const __pagePath = "pages/scanQrCodeForGateway/scanQrCodeForGateway";
    let __pageQuery = {};
    try {
      __pageQuery = JSON.parse(webview.__query__);
    } catch (e) {
    }
    scanQrCodeForGateway.mpType = "page";
    const app = Vue.createPageApp(scanQrCodeForGateway, { $store: getApp({ allowDefault: true }).$store, __pageId, __pagePath, __pageQuery });
    app.provide("__globalStyles", Vue.useCssStyles([...__uniConfig.styles, ...scanQrCodeForGateway.styles || []]));
    app.mount("#root");
  }
})();
