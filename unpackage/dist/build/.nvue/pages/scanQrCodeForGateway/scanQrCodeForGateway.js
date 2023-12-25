import { _ as _export_sfc, f as formatAppLog } from "../../plugin-vue_export-helper.js";
import { openBlock, createElementBlock, createElementVNode, normalizeStyle } from "vue";
var _style_0 = { "page": { "": { "width": "750rpx", "position": "relative", "flexDirection": "column", "justifyContent": "center" } }, "barcode": { "": { "width": "750rpx", "backgroundColor": "#808080" } } };
const _sfc_main = {
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
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", {
      style: normalizeStyle({ height: $data.screenHeight + "px" }),
      class: "page"
    }, [
      createElementVNode("barcode", {
        id: "1",
        class: "barcode",
        style: normalizeStyle({ height: $data.screenHeight + "px" }),
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
      createElementVNode("view", { style: { "width": "750rpx", "position": "absolute", "bottom": "0rpx", "display": "flex", "flex-direction": "column", "justify-content": "center", "align-items": "center" } }, [
        createElementVNode("view", {
          style: { "width": "560rpx", "height": "84rpx", "background": "#FFFFFF", "border-radius": "40rpx", "border": "4rpx solid #38CBD5", "margin-top": "32rpx", "margin-bottom": "100rpx", "color": "#333333", "font-size": "28rpx", "display": "flex", "justify-content": "center", "align-items": "center" },
          onClick: _cache[2] || (_cache[2] = ($event) => $options.input())
        }, [
          createElementVNode("u-text", null, "\u624B\u52A8\u586B\u5199")
        ])
      ])
    ], 4)
  ]);
}
var scanQrCodeForGateway = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export { scanQrCodeForGateway as default };
