import { test, expect } from "vitest"
import { interval, intervalReturn, recursiveReturn } from "../src/index"

test(`test recursiveReturn()`, async () => {
  await recursiveReturn((repeat, resolve, reject, state) => {
    console.log(`test recursiveReturn, random: ${Math.random()}`)
    if (state.counter == 3) {
      return resolve(true)
    }

    repeat(1000)
    state.counter += 1
  })
})

test(`test intervalReturn()`, async () => {
  await intervalReturn(1000, true, (resolve, reject, state) => {
    console.log(`test intervalReturn, random: ${Math.random()}`)
    if (state.counter == 3) {
      return resolve(true)
    }

    state.counter += 1
  })
})

test(`test interval()`, async () => {
  const resInterval = interval(1000, true, (stop, state) => {
    console.log(`test interval, random: ${Math.random()}`)
    if (state.counter == 3) {
      return stop()
    }

    state.counter += 1
  })

  await recursiveReturn((repeat, resolve) => {
    if (resInterval.state.counter == 3) {
      return resolve(true)
    }
    repeat(200)
  })
})
