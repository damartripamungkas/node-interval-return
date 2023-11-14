const { intervalReturn } = require("..");

(async () => {
  const runInterval1 = await intervalReturn(5000, true, (res, rej) => {
    res("is result value");
  });
  console.log(`[runInterval1] running with do first without waiting interval complete, result: ${runInterval1}`);

  try {
    const runInterval2 = await intervalReturn(5000, true, (res, rej) => {
      rej("is error value");
    });
  } catch (err) {
    console.log(`[runInterval2] running with do first without waiting interval complete, error: ${err}`);
  }
})();
