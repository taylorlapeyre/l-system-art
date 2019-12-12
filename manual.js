// Long tree
const iterations = 5;
const lineLength = 20;
const angle = 22.5;
const axiom = "F";
const rules = {
  "F": [
    "F[+F]F[-F]F",
    "F[+F]F",
    "F[-F]F"
  ]
}

// pretty tree
const iterations = 5;
const lineLength = 20;
const angle = 20;
const axiom = "X";
const rules = {
  "F": "FF",
  "X": [
    "F[+X]F[-X]+X",
    "F[-X]+X"
  ]
}

// Hilbert
const axiom = "X";
const alpha = 90;
const iterations = 5;
const r = 20;
const rules: any = {
  X: "+YF-XFX-FY+",
  Y: "-XF+YFY+FX-"
};


// Triangles
const iterations = 5;
const lineLength = 70;
const angle = 120;
const axiom = "F+F+F";
const rules = {
  "F": [
    "F-F+F",
    "F+F-F"
  ],
}