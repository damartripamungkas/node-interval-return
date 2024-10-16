import { TypeCbPromise, TypeCbPromiseMod, TypeCbWithStop } from "./type"
const delay = (ms: number) => new Promise((res: any) => setTimeout(() => res(), ms))

/**
 *
 * @param ms time ms
 * @param doFirst run the first and immediate callback without waiting for the setInterval time
 * @param callback callback with value function resolve(result) | function reject(result) | state
 * @returns Promise<any>. automatic will stop interval in background
 */
const intervalReturn = (ms: number, doFirst: boolean, callback: TypeCbPromise) => {
  let toggle = true
  const state = { counter: 1 }
  const returnCallback = (id: any, resolve: any, reject: any) => {
    callback(
      (val: any) => {
        toggle = false
        clearInterval(id), resolve(val)
      },
      (val: any) => {
        toggle = false
        clearInterval(id), reject(val)
      },
      state
    )
  }

  return new Promise((resolve, reject) => {
    if (doFirst === true) {
      returnCallback(null, resolve, reject)
    }

    const idInterval = setInterval(() => {
      if (toggle) {
        returnCallback(idInterval, resolve, reject)
      }
    }, ms)
  }) as Promise<any>
}

/**
 *
 * @param callback callback with value function repeat(delay) | resolve(result) | function reject(result) | state
 * @returns Promise<any>
 */
const recursiveReturn = (callback: TypeCbPromiseMod) => {
  let toggle = true
  const state = { counter: 1 }
  const returnCallback = (resolve: any, reject: any) => {
    callback(
      async (delayMs?: number) => {
        if (toggle) {
          if (delayMs) {
            await delay(delayMs)
          }

          returnCallback(resolve, reject)
        }
      },
      (val: any) => {
        toggle = false
        resolve(val)
      },
      (val: any) => {
        toggle = false
        reject(val)
      },
      state
    )
  }

  return new Promise((resolve, reject) => {
    returnCallback(resolve, reject)
  }) as Promise<any>
}

/**
 *
 * @param ms time ms
 * @param doFirst run the first and immediate callback without waiting for the setInterval time
 * @param callback callback with value function stop() | state
 * @returns idInterval | state | function stop()
 */
const interval = (ms: number, doFirst: boolean, callback: TypeCbWithStop) => {
  let toggle = true
  const state = { counter: 0 }
  if (doFirst === true) {
    callback(() => {
      clearInterval(undefined)
    }, state)
  }

  const idInterval = setInterval(() => {
    if (toggle) {
      callback(() => {
        clearInterval(idInterval)
      }, state)
    }
  }, ms)

  return {
    idInterval,
    get state() {
      return state
    },
    stop: () => {
      clearInterval(idInterval)
    },
  }
}

export { intervalReturn, recursiveReturn, interval }
export default { intervalReturn, recursiveReturn, interval }
