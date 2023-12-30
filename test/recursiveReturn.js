const { recursiveReturn } = require("..");

const run = async () => {
  let val = 0;
  const result = await recursiveReturn((repeat, res) => {
    val += Math.random();
    val >= 2 ? res(val) : repeat(500);
  });

  console.log({ result });
};

run();
