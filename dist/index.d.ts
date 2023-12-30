type TypeCbPromise = (resolve: (val: any) => void, reject: (val: any) => void) => void;
type TypeCbPromiseMod = (repeat: () => void, resolve: (val: any) => void, reject: (val: any) => void) => void;
type TypeCbWithStop = (stop: () => void) => void;

/**
 *
 * @param ms time ms
 * @param doFirst run the first and immediate callback without waiting for the setInterval time
 * @param callback callback with value function resolve(result) | function reject(result)
 * @returns any. automatic will stop interval in background
 */
declare const intervalReturn: (ms: number, doFirst: boolean, callback: TypeCbPromise) => Promise<unknown>;
/**
 *
 * @param callback callback with value function repeat(delay) | resolve(result) | function reject(result)
 * @returns any
 */
declare const recursiveReturn: (callback: TypeCbPromiseMod) => Promise<unknown>;
/**
 *
 * @param ms time ms
 * @param doFirst run the first and immediate callback without waiting for the setInterval time
 * @param callback callback with value function stop
 * @returns any
 */
declare const interval: (ms: number, doFirst: boolean, callback: TypeCbWithStop) => {
    idInterval: number;
    stop: () => void;
};

declare const _default: {
    intervalReturn: (ms: number, doFirst: boolean, callback: TypeCbPromise) => Promise<unknown>;
    recursiveReturn: (callback: TypeCbPromiseMod) => Promise<unknown>;
    interval: (ms: number, doFirst: boolean, callback: TypeCbWithStop) => {
        idInterval: number;
        stop: () => void;
    };
};

export { _default as default, interval, intervalReturn, recursiveReturn };
