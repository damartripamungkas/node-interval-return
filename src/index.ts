import { TypeCbPromise, TypeCbPromiseMod, TypeCbWithStop } from "./type"
const delay = (ms: number) => new Promise((res: any) => setTimeout(() => res(), ms))

/**
 *
 * @param ms time ms
 * @param doFirst run the first and immediate callback without waiting for the setInterval time
 * @param callback callback with value function resolve(result) | function reject(result)
 * @returns any. automatic will stop interval in background
 */
const intervalReturn = async (ms: number, doFirst: boolean, callback: TypeCbPromise) => {
  return new Promise((resolve, reject) => {
    let toggle = true
    const returnCallback = (id: any) => {
      callback(
        (val: any) => {
          toggle = false
          clearInterval(id), resolve(val)
        },
        (val: any) => {
          toggle = false
          clearInterval(id), reject(val)
        }
      )
    }

    if (doFirst === true) {
      returnCallback(null)
    }

    const idInterval = setInterval(() => {
      if (toggle) {
        returnCallback(idInterval)
      }
    }, ms)
  })
}

/**
 *
 * @param callback callback with value function repeat(delay) | resolve(result) | function reject(result)
 * @returns any
 */
const recursiveReturn = async (callback: TypeCbPromiseMod) => {
  return new Promise((resolve, reject) => {
    let toggle = true
    const returnCallback = () => {
      callback(
        async (delayMs?: number) => {
          if (toggle) {
            if (delayMs) {
              await delay(delayMs)
            }

            returnCallback()
          }
        },
        (val: any) => {
          toggle = false
          resolve(val)
        },
        (val: any) => {
          toggle = false
          reject(val)
        }
      )
    }

    returnCallback()
  })
}

/**
 *
 * @param ms time ms
 * @param doFirst run the first and immediate callback without waiting for the setInterval time
 * @param callback callback with value function stop
 * @returns any
 */
const interval = (ms: number, doFirst: boolean, callback: TypeCbWithStop) => {
  let toggle = true
  if (doFirst === true) {
    callback(() => {
      clearInterval(null)
    })
  }

  const idInterval = setInterval(() => {
    if (toggle) {
      callback(() => {
        clearInterval(idInterval)
      })
    }
  }, ms)

  return {
    idInterval,
    stop: () => {
      clearInterval(idInterval)
    },
  }
}

export { intervalReturn, recursiveReturn, interval }
export default { intervalReturn, recursiveReturn, interval }
