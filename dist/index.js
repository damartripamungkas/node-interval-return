var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default,
  interval: () => interval,
  intervalReturn: () => intervalReturn
});
module.exports = __toCommonJS(src_exports);
var intervalReturn = async (ms, doFirst, callback) => {
  return new Promise((resolve, reject) => {
    const returnCallback = (id) => {
      callback(
        (val) => {
          clearInterval(id), resolve(val);
        },
        (val) => {
          clearInterval(id), reject(val);
        }
      );
    };
    if (doFirst === true) {
      returnCallback(null);
    }
    const idInterval = setInterval(() => {
      returnCallback(idInterval);
    }, ms);
  });
};
var interval = (ms, doFirst, callback) => {
  if (doFirst === true) {
    callback(() => {
      clearInterval(null);
    });
  }
  const idInterval = setInterval(() => {
    callback(() => {
      clearInterval(idInterval);
    });
  }, ms);
  return {
    idInterval,
    stop: () => {
      clearInterval(idInterval);
    }
  };
};
var src_default = { intervalReturn, interval };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interval,
  intervalReturn
});
