// ReactDOM.render(<App />, document.getElementById('root'));

export const canvasHeight = window.innerHeight;
const canvasWidth = window.innerWidth;


const input = "X";
const rules: any = {
  "X": "+YF-XFX-FY+",
  "Y": "-XF+YFY+FX-"
};
const alpha = 90;
const iterations = 10;
const r = 50

// const input = "FFF-FF-F-F+F+FF-F-FFF";
// const rules = { "X": "Y" };
// const alpha = 90;
// const iterations = 1;
// const r = 30


let output = input;

function solveSystem(input: any, rules: any) {
  let output = "";

  let i = 0;
  let j = 0;

  const ruleKeys = Object.keys(rules);

  while (i < input.length && j < input.length) {
    console.log(i, j);

    j = i;

    while (
      ruleKeys.some(ruleKey => ruleKey.startsWith(input.slice(i, j + 1))) &&
      j < input.length
    ) {
      j = j + 1;
    }

    const match = input.slice(i, j);
    output += rules[match];
    console.log(output);

    i = j;
  }

  return output;
}

for (let i = 0; i < iterations; i++) {
  output = solveSystem(output, rules);
}

const c = document.getElementsByTagName("canvas")[0];
c.width = canvasWidth * 2;
c.height = canvasHeight * 2;
const ctx = c.getContext("2d");


if (ctx) {
  // setup canvas
  ctx.lineWidth = 4;
  ctx.fillStyle = "f4f4f4";
  ctx.fillRect(0, 0, c.width, c.height);

  // set start position and direction
  let location = [canvasWidth / 2, canvasHeight / 2];
  let direction = alpha;

  // set colors
  const strokeStyles = ["ffac8e", "fd7792", "3f4d71", "55ae95"];
  let currentColor = 0;

  ctx.moveTo(location[0], location[1]);

  for (const instruction of output.split("")) {
    console.log(instruction);

    switch (instruction) {
      case "+": {
        direction = direction + alpha;
        break;
      }
      case "-": {
        direction = direction - alpha;
        break;
      }
      case "F": {
        const nextX = location[0] + (r * Math.cos(direction * Math.PI / 180));
        const nextY = location[1] - (r * Math.sin(direction * Math.PI / 180));
        const nextLocation = [nextX, nextY];

        console.log(nextLocation)

        ctx.beginPath();
        ctx.moveTo(location[0], location[1]);
        ctx.lineTo(nextLocation[0], nextLocation[1]);
        ctx.strokeStyle = strokeStyles[currentColor];
        ctx.stroke();

        currentColor = (currentColor + 1) % strokeStyles.length;
        location = nextLocation
        break;
      }
    }
  }

  ctx.stroke();
}