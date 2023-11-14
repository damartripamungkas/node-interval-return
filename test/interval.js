const { interval } = require("..");

const runInterval1 = interval(10000, true, (stop) => {
  console.log(`[runInterval1] running with do first without waiting interval complete`);

  stop(); // stop interval
});

const runInterval2 = interval(1000, false, (stop) => {
  console.log(`[runInterval2] running interval, random: ${Math.random()}`);
});
