// src/index.ts
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
export {
  src_default as default,
  interval,
  intervalReturn
};
