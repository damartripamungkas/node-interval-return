import { test } from "vitest"
import { interval, intervalReturn, recursiveReturn } from "../src/index"

test(`test recursiveReturn()`, async () => {
  const res = await recursiveReturn((repeat, resolve, reject, state) => {
    if (state.counter == 3) {
      return resolve(state.counter)
    }

    state.counter += 1
    repeat(1000)
  })
  console.log(`recursiveReturn(): ${res}`)
})

test(`test intervalReturn()`, async () => {
  const res = await intervalReturn(1000, true, (resolve, reject, state) => {
    if (state.counter == 3) {
      return resolve(state.counter)
    }

    state.counter += 1
  })
  console.log(`intervalReturn(): ${res}`)
})

test(`test interval()`, async () => {
  const res = await new Promise((resolve) => {
    interval(1000, true, (stop, state) => {
      if (state.counter == 3) {
        resolve(state.counter)
        return stop()
      }

      state.counter += 1
    })
  })

  console.log(`interval(): ${res}`)
})
