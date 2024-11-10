import { TypeCbPromise, TypeCbPromiseMod, TypeCbWithStop } from "./type"
const delay = (ms: number) => new Promise((res: any) => setTimeout(() => res(), ms))
const defaultState = () => ({ counter: 0 })

/**
 *
 * @info default state.counter start from 0
 * @param ms time ms
 * @param doFirst run the first and immediate callback without waiting for the setInterval time
 * @param callback callback with value function resolve(result) | function reject(result) | state
 * @returns Promise<any>. automatic will stop interval in background
 */
export const intervalReturn = (ms: number, doFirst: boolean, callback: TypeCbPromise) => {
  let toggle = true
  const state = defaultState()
  const returnCallback = (id: any, resolve: any, reject: any) => {
    callback(
      (result: any) => {
        toggle = false
        clearInterval(id), resolve(result)
      },
      (error: any) => {
        toggle = false
        clearInterval(id), reject(error)
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
 * @info default state.counter start from 0
 * @param callback callback with value function repeat(delay) | resolve(result) | function reject(result) | state
 * @returns Promise<any>
 */
export const recursiveReturn = (callback: TypeCbPromiseMod) => {
  let toggle = true
  const state = defaultState()
  const returnCallback = (resolve: any, reject: any) => {
    callback(
      (delayMs?: number) => {
        if (toggle) {
          if (delayMs) {
            delay(delayMs).then(() => {
              returnCallback(resolve, reject)
            })
            return
          }

          returnCallback(resolve, reject)
        }
      },
      (result: any) => {
        toggle = false
        resolve(result)
      },
      (error: any) => {
        toggle = false
        reject(error)
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
 * @info default state.counter start from 0
 * @param ms time ms
 * @param doFirst run the first and immediate callback without waiting for the setInterval time
 * @param callback callback with value function stop() | state
 * @returns idInterval | state | function stop()
 */
export const interval = (ms: number, doFirst: boolean, callback: TypeCbWithStop) => {
  let toggle = true
  const state = defaultState()
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

export default { intervalReturn, recursiveReturn, interval }
