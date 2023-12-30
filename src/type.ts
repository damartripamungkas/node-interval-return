export type TypeCbPromise = (resolve: (val: any) => void, reject: (val: any) => void) => void
export type TypeCbPromiseMod = (repeat: () => void, resolve: (val: any) => void, reject: (val: any) => void) => void
export type TypeCbWithStop = (stop: () => void) => void
