export interface InterfaceCallbackPromise {
  (resolve: (val: any) => void, reject: (val: any) => void): void;
}

export interface InterfaceCallbackWithStop {
  (stop: () => void): void;
}
