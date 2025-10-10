let size = 100;

function setup() {
  createCanvas(500, 500);
  background(9, 122, 0);

  console.log("player 1");
}

// your mom poo

let dots1 = [[0, 0]];
let dots2 = [
  [-1, -1],
  [1, 1],
];
let dots3 = [
  [-1, -1],
  [0, 0],
  [1, 1],
];
let dots4 = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];
let dots5 = [
  [-1, -1],
  [-1, 1],
  [0, 0],
  [1, -1],
  [1, 1],
];
let dots6 = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
  [-1, 0],
  [1, 0],
];

let dots = [dots1, dots2, dots3, dots4, dots5, dots6];

let rotations = [];

function drawRoll() {
  background(9, 122, 0);

  positions = [];

  if (keepPositions.length < 1) {
    positions = [
      createVector(random(size, width - size), random(size, height - size)),
    ];
  }
  positions = concat(positions, keepPositions);

  for (let i = 0; i < positions.length; i++) {
    //console.log(positions[i]);
  }

  for (let i = positions.length; i < 5; i++) {
    let p;
    let away = false;

    while (!away) {
      p = createVector(random(size, width - size), random(size, height - size));

      away = true;

      for (let j = 0; j < positions.length; j++) {
        if (p.dist(positions[j]) < size) {
          away = false;
        }
      }
    }

    append(positions, p);
  }

  rotations = [];

  rotations = concat(rotations, keepRotations);

  for (let i = rotations.length; i < 5; i++) {
    rotations[i] = random(PI);
  }

  for (let i = 0; i < 5; i++) {
    let p = positions[i];

    let pr = rotations[i];

    applyMatrix(1, 0, 0, 1, p.x, p.y);

    rotate(pr);

    fill(255);

    rect(-size / 2, -size / 2, size, size, 0.125 * size);

    let dotArray = dots[dice[i] - 1];

    for (let j = 0; j < dice[i]; j++) {
      let dotPosition = dotArray[j];
      let dotV = createVector(dotPosition[0], dotPosition[1]).mult(
        (2 / 7) * size
      );
      fill(0);
      circle(dotV.x, dotV.y, 0.15 * size);
    }

    rotate(-pr);
    applyMatrix(1, 0, 0, 1, -p.x, -p.y);
  }
}

let saved = [0, 0, 0, 0, 0];

let keepPositions = [];
let keepRotations = [];

function mousePressed() {
  for (let i = 0; i < 5; i++) {
    let mousePos = createVector(mouseX, mouseY);
    let dicePos = positions[i];

    if (mousePos.dist(dicePos) < size / 2) {
      console.log(i);
      if (saved[i] !== 1) {
        append(keepPositions, dicePos);
        append(keepRotations, rotations[i]);
        saved[i] = 1;
      } else {
        saved[i] = 0;

        for (let j = 0; j < keepRotations.length; j++) {
          let remove = rotations[i];
          if (keepRotations[j] == remove) {
            for (let k = j; k < keepRotations.length; k++) {
              keepRotations[k] = keepRotations[k + 1];
              keepPositions[k] = keepPositions[k + 1];
            }
            keepRotations.length = keepRotations.length - 1;
            keepPositions.length = keepPositions.length - 1;
          }
        }
      }
    }
  }
}
