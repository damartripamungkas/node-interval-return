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

#### Typescript

```javascript
import { interval, intervalReturn } from "node-interval-return";
```

#### ESM (import)

```javascript
import { interval, intervalReturn } from "node-interval-return";
```

#### CommonJs (require)

```javascript
const { interval, intervalReturn } = require("node-interval-return");
```

#### Usage

full example see [here](./test)

```javascript
const { intervalReturn } = require(`node-interval-return`);

const run = (async () => {
  const runInterval1 = await intervalReturn(5000, true, (res, rej) => {
    res("is result value");
  })
  console.log(
    `[runInterval1] running with do first without waiting interval complete, result: ${runInterval1}`
  )

  try {
    const runInterval2 = await intervalReturn(5000, true, (res, rej) => {
      rej("is error value");
    })
  } catch (err) {
    console.log(
      `[runInterval2] running with do first without waiting interval complete, error: ${err}`
    )
  }
}

run()
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
