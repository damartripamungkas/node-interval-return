// src/index.ts
var intervalReturn = async (ms, doFirst, callback) => {
  return new Promise((resolve, reject) => {
    let toggle = true;
    const returnCallback = (id) => {
      callback(
        (val) => {
          toggle = false;
          clearInterval(id), resolve(val);
        },
        (val) => {
          toggle = false;
          clearInterval(id), reject(val);
        }
      );
    };
    if (doFirst === true) {
      returnCallback(null);
    }
    const idInterval = setInterval(() => {
      if (toggle) {
        returnCallback(idInterval);
      }
    }, ms);
  });
};
var recursiveReturn = async (callback) => {
  return new Promise((resolve, reject) => {
    let toggle = true;
    const returnCallback = () => {
      callback(
        () => {
          if (toggle) {
            returnCallback();
          }
        },
        (val) => {
          toggle = false;
          resolve(val);
        },
        (val) => {
          toggle = false;
          reject(val);
        }
      );
    };
    returnCallback();
  });
};
var interval = (ms, doFirst, callback) => {
  let toggle = true;
  if (doFirst === true) {
    callback(() => {
      clearInterval(null);
    });
  }
  const idInterval = setInterval(() => {
    if (toggle) {
      callback(() => {
        clearInterval(idInterval);
      });
    }
  }, ms);
  return {
    idInterval,
    stop: () => {
      clearInterval(idInterval);
    }
  };
};
var src_default = { intervalReturn, recursiveReturn, interval };
export {
  src_default as default,
  interval,
  intervalReturn,
  recursiveReturn
};
