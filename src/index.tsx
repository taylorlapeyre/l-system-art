export function solveSystem(input: any, rules: any) {
  let output = "";

  let i = 0;
  let j = 0;

  const ruleKeys = Object.keys(rules);

  while (i < input.length && j < input.length) {
    while (
      ruleKeys.some(ruleKey => ruleKey.startsWith(input.slice(i, j + 1))) &&
      j < input.length
    ) {
      j = j + 1;
    }

    if (i === j) {
      j++;
    }

    const match = input.slice(i, j);

    if (rules[match]) {
      output += rules[match];
    } else {
      output += match;
    }

    i = j;
  }

  return output;
}


interface TurtleState {
  location: [number, number],
  direction: number,
  currentColor: number,
  lineLength: number,
  lineScaleFactor: number
}

function renderInstructionsToCanvas(
  instructions: string,
  ctx: CanvasRenderingContext2D,
  initialState: TurtleState
) {
  // setup canvas
  ctx.lineWidth = 4;
  ctx.fillStyle = "f4f4f4";
  ctx.fillRect(0, 0, c.width, c.height);

  // set start position and direction
  let turtleState = initialState;
  let turtleStack = [];

  // set colors
  const strokeStyles = ["ffac8e", "fd7792", "3f4d71", "55ae95"];

  ctx.moveTo(turtleState.location[0], turtleState.location[1]);

  for (const instruction of instructions) {
    switch (instruction) {
      case ">": {
        turtleState.lineLength = turtleState.lineLength * turtleState.lineScaleFactor
        break;
      }
      case "<": {
        turtleState.lineLength = turtleState.lineLength / turtleState.lineScaleFactor
        break;
      }
      case "[": {
        turtleStack.push({ ...turtleState });
        break;
      }
      case "]": {
        let nextTurtleState = turtleStack.pop();

        if (nextTurtleState) {
          turtleState = nextTurtleState;
        }
        break;
      }
      case "+": {
        turtleState.direction = turtleState.direction + alpha;
        break;
      }
      case "-": {
        turtleState.direction = turtleState.direction - alpha;
        break;
      }
      case "F": {
        const { location, direction, currentColor, lineLength } = turtleState;
        const nextX = location[0] + lineLength * Math.cos((direction * Math.PI) / 180);
        const nextY = location[1] - lineLength * Math.sin((direction * Math.PI) / 180);
        const nextLocation: [number, number] = [nextX, nextY];

        ctx.beginPath();
        ctx.moveTo(location[0], location[1]);
        ctx.lineTo(nextLocation[0], nextLocation[1]);
        ctx.strokeStyle = strokeStyles[currentColor];
        ctx.stroke();

        turtleState.currentColor = (currentColor + 1) % strokeStyles.length;
        turtleState.location = nextLocation;
        break;
      }
    }
  }
}

const axiom = "X";
const alpha = 90;
const iterations = 5;
const r = 20;
const rules: any = {
  X: "+YF-XFX-FY+",
  Y: "-XF+YFY+FX-"
};

let instructions = axiom;
for (let i = 0; i < iterations; i++) {
  instructions = solveSystem(instructions, rules);
}
document.body.appendChild(document.createTextNode(instructions));

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const c = document.getElementsByTagName("canvas")[0];
c.width = windowWidth * 2;
c.height = windowHeight * 2;
const ctx = c.getContext("2d");

if (ctx) {
  renderInstructionsToCanvas(instructions, ctx, {
    location: [windowWidth, windowHeight],
    direction: alpha,
    currentColor: 0,
    lineLength: r,
    lineScaleFactor: 1.2
  })
}
