type TypeFuncAny = (val: any) => void
type TypeFuncVoid = () => void
type TypeState = {
  counter: number
  [key: string]: any
}

export type TypeCbPromise = (resolve: TypeFuncAny, reject: TypeFuncAny, state: TypeState) => void
export type TypeCbPromiseMod = (repeat: (delayMs?: number) => void, resolve: TypeFuncAny, reject: TypeFuncAny, state: TypeState) => void
export type TypeCbWithStop = (stop: TypeFuncVoid, state: TypeState) => void
