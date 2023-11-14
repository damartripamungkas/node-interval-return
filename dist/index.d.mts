interface InterfaceCallbackPromise {
    (resolve: (val: any) => void, reject: (val: any) => void): void;
}
interface InterfaceCallbackWithStop {
    (stop: () => void): void;
}

/**
 *
 * @param_ms time ms
 * @param_doFirst run the first and immediate callback without waiting for the setInterval time
 * @param_callback callback with value function resolve(result) | function reject(result)
 * @returns any. automatic will stop interval in background
 */
declare const intervalReturn: (ms: number, doFirst: boolean, callback: InterfaceCallbackPromise) => Promise<unknown>;
/**
 *
 * @param_ms time ms
 * @param_doFirst run the first and immediate callback without waiting for the setInterval time
 * @param_callback callback with value function stop
 * @returns any
 */
declare const interval: (ms: number, doFirst: boolean, callback: InterfaceCallbackWithStop) => {
    idInterval: number;
    stop: () => void;
};

declare const _default: {
    intervalReturn: (ms: number, doFirst: boolean, callback: InterfaceCallbackPromise) => Promise<unknown>;
    interval: (ms: number, doFirst: boolean, callback: InterfaceCallbackWithStop) => {
        idInterval: number;
        stop: () => void;
    };
};

export { _default as default, interval, intervalReturn };
