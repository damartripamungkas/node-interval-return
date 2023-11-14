import { InterfaceCallbackPromise, InterfaceCallbackWithStop } from "./iface";

/**
 *
 * @param_ms time ms
 * @param_doFirst run the first and immediate callback without waiting for the setInterval time
 * @param_callback callback with value function resolve(result) | function reject(result)
 * @returns any. automatic will stop interval in background
 */
const intervalReturn = async (ms: number, doFirst: boolean, callback: InterfaceCallbackPromise) => {
  return new Promise((resolve, reject) => {
    const returnCallback = (id: any) => {
      callback(
        (val: any) => {
          clearInterval(id), resolve(val);
        },
        (val: any) => {
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

/**
 *
 * @param_ms time ms
 * @param_doFirst run the first and immediate callback without waiting for the setInterval time
 * @param_callback callback with value function stop
 * @returns any
 */
const interval = (ms: number, doFirst: boolean, callback: InterfaceCallbackWithStop) => {
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
    },
  };
};

export { intervalReturn, interval };
export default { intervalReturn, interval };
