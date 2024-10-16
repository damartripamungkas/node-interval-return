<h1 align="center">
    NODE-INTERVAL-RETURN
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/damartripamungkas/node-interval-return?color=04D361&labelColor=000000">
  
  <a href="#">
    <img alt="Made by" src="https://img.shields.io/static/v1?label=made%20by&message=damartripamungkas&color=04D361&labelColor=000000">
  </a>
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/damartripamungkas/node-interval-return?color=04D361&labelColor=000000">
  
  <a href="#">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/damartripamungkas/node-interval-return?color=04D361&labelColor=000000">
  </a>
</p>

<br>

### 📖 Description :

This package is designed to run `setInterval` with several features. It includes functionalities such as returning a promise, executing a specific task first, stopping the interval, and automatically stopping the interval in the background if a return is triggered.

### 💻 Step to install :

```
npm install node-interval-return
```

### ✏️ Example :

full example see [here](./test)

```javascript
const { recursiveReturn, interval, intervalReturn } = require(`node-interval-return`)

// function recursiveReturn
await recursiveReturn((repeat, resolve, reject, state) => {
  console.log(`test recursiveReturn(), random: ${Math.random()}`)
  if (state.counter == 3) {
    return resolve(true)
  }

  repeat(1000)
  state.counter += 1
})

// function intervalReturn
await intervalReturn(1000, true, (resolve, reject, state) => {
  console.log(`test intervalReturn(), random: ${Math.random()}`)
  if (state.counter == 3) {
    return resolve(true)
  }

  state.counter += 1
})

// function interval
const resInterval = interval(1000, true, (stop, state) => {
  console.log(`test interval, random: ${Math.random()}`)
  if (state.counter == 3) {
    return stop()
  }

  state.counter += 1
})
```

### 🧾 Pre-Requisistes :

```
- node.js / bun.js / deno.js
- (optional) typescript
- (optional) commonJS
- (optional) ESM
```

### 📝 License :

Licensed see [here](./LICENSE).
