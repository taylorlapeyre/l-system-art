// ReactDOM.render(<App />, document.getElementById('root'));

const canvasHeight = window.innerHeight;
const canvasWidth = window.innerWidth;


const input = "OZPZZ";
const rules = { "OZ": "F-Z", "P": "F+", "F+Z": "-P+", "-": "FZ", "Z": "PF", "FF": "F" };
const alpha = 90;
const iterations = 100;
const r = 100

let output = input;

for (let i = 0; i < iterations; i++) {
  for (const [inputRule, outputRule] of Object.entries(rules)) {
    output = output.replace(inputRule, i => outputRule)
  }
}




const c = document.getElementsByTagName("canvas")[0];
c.width = canvasWidth * 2;
c.height = canvasHeight * 2;
const ctx = c.getContext("2d");


if (ctx) {
  ctx.lineWidth = 4;
  ctx.fillStyle = "f4f4f4";
  ctx.fillRect(0, 0, c.width, c.height);

  let location = [canvasWidth, canvasHeight / 2];
  let direction = alpha;
  const strokeStyles = ["ffac8e", "fd7792", "3f4d71", "55ae95"];
  let currentColor = 0;
  ctx.moveTo(location[0], location[1]);

  for (const instruction of output.split("")) {
    console.log(instruction);
    switch (instruction) {
      case "+": {
        direction = direction + alpha;
        console.log("Direction is now", direction)
        break;
      }
      case "-": {
        direction = direction - alpha;
        break;
      }
      case "F": {
        const nextX = location[0] + (r * Math.cos(direction * Math.PI / 180));
        const nextY = location[1] + (r * Math.sin(direction * Math.PI / 180));
        const nextLocation = [nextX, nextY];

        ctx.beginPath();
        ctx.moveTo(location[0], location[1]);
        ctx.lineTo(nextLocation[0], nextLocation[1]);
        ctx.strokeStyle = strokeStyles[currentColor];
        ctx.stroke();

        currentColor = (currentColor + 1) % strokeStyles.length;
        location = nextLocation
        console.log("Location is now", location)
        break;
      }
    }
  }

  ctx.stroke();
}