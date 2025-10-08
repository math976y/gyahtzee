let dice = [0, 0, 0, 0, 0];
let rolls = 0;

let playerSwitch = true;

let player1Points = 0;
let player2Points = 0;

let chosen1 = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
];
let chosen2 = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
];

let chosen;

function roundOver() {
  dice = [0, 0, 0, 0, 0];
  rolls = 0;
  saved = [0, 0, 0, 0, 0];
  keepPositions = [];
  keepRotations = [];

  playerSwitch = !playerSwitch;

  if (playerSwitch) {
    console.log("player 1");
    player2Points += points;
  } else {
    console.log("player 2");
    player1Points += points;
  }
}

function roll() {
  points = 0;

  if (playerSwitch) {
    chosen = chosen1;
  } else {
    chosen = chosen2;
  }

  if (rolls < 3) {
    for (let i = 0; i < 5; i++) {
      if (saved[i] !== 1) {
        dice[i] = floor(random(1, 7));
      }
    }

    rolls++;

    drawRoll();

    return dice;
  } else {
    return "unable to roll again";
  }
}

let points = 0;

function ones() {
  if (chosen[0]) {
    if (dice[0] !== 0) {
      checkIndividual(1);
      return points;
    } else {
      return "please roll";
    }
  } else {
    return "Ones already chosen";
  }
}
function twos() {
  if (chosen[1]) {
    if (dice[0] !== 0) {
      checkIndividual(2);
      return points;
    } else {
      return "please roll";
    }
  } else {
    return "Twos already chosen";
  }
}
function threes() {
  if (chosen[2]) {
    if (dice[0] !== 0) {
      checkIndividual(3);
      return points;
    } else {
      return "please roll";
    }
  } else {
    return "Threes already chosen";
  }
}
function fours() {
  if (chosen[3]) {
    if (dice[0] !== 0) {
      checkIndividual(4);
      return points;
    } else {
      return "please roll";
    }
  } else {
    return "Fours already chosen";
  }
}
function fives() {
  if (chosen[4]) {
    if (dice[0] !== 0) {
      checkIndividual(5);
      return points;
    } else {
      return "please roll";
    }
  } else {
    return "Fives already chosen";
  }
}
function sixes() {
  if (chosen[5]) {
    if (dice[0] !== 0) {
      checkIndividual(6);
      return points;
    } else {
      return "please roll";
    }
  } else {
    return "Sixes already chosen";
  }
}

function checkIndividual(n) {
  for (let i = 0; i < 5; i++) {
    if (dice[i] == n) {
      points += n;
    }
  }

  chosen[n - 1] = false;
  return roundOver();
}

function fullHouse() {
  if (chosen[6]) {
    if (dice[0] !== 0) {
      chosen[6] = false;

      let firstN = dice[0];
      let secondN;

      let firstCount = 1;

      for (let i = 1; i < 5; i++) {
        if (dice[i] == firstN) {
          firstCount++;
        } else {
          if (secondN !== undefined && dice[i] !== secondN) {
            roundOver();
            return points;
          }

          secondN = dice[i];
        }
      }

      if (firstCount !== 3 && firstCount !== 2) {
        roundOver();
        return points;
      }

      points += 25;
      roundOver();
      return points;
    } else {
      return "please roll";
    }
  } else {
    return "Full house already chosen";
  }
}

function threeOf() {
  if (chosen[7]) {
    if (dice[0] !== 0) {
      chosen[7] = false;

      let saved = [];
      let savedCount = [0, 0, 0, 0, 0];

      for (let i = 0; i < 5; i++) {
        let n = dice[i];

        for (let j = 0; j < 5; j++) {
          if (saved[j] == n) {
            savedCount[j]++;
          }

          if (saved[j] == undefined) {
            saved[j] = n;
            break;
          }
        }
      }

      if (savedCount.includes(2) || savedCount.includes(3)) {
        points += dice[0] + dice[1] + dice[2] + dice[3] + dice[4];
      }

      roundOver();
      return points;
    } else {
      return "please roll";
    }
  } else {
    return "Three of a kind already chosen";
  }
}

function fourOf() {
  if (chosen[8]) {
    if (dice[0] !== 0) {
      chosen[8] = false;

      let saved = [];
      let savedCount = [0, 0, 0, 0, 0];

      for (let i = 0; i < 5; i++) {
        let n = dice[i];

        for (let j = 0; j < 5; j++) {
          if (saved[j] == n) {
            savedCount[j]++;
          }

          if (saved[j] == undefined) {
            saved[j] = n;
            break;
          }
        }
      }

      if (savedCount.includes(3)) {
        points += dice[0] + dice[1] + dice[2] + dice[3] + dice[4];
      }

      roundOver();
      return points;
    } else {
      return "please roll";
    }
  } else {
    return "Four of a kind already chosen";
  }
}

function smallStr() {
  if (chosen[9]) {
    if (dice[0] !== 0) {
      chosen[9] = false;

      let diceSorted = sort(dice);
      let strikes = 0;

      for (let i = 1; i < 5; i++) {
        if (diceSorted[i] !== diceSorted[i - 1] + 1) {
          strikes++;
          break;
        }
      }

      for (let i = 2; i < 5; i++) {
        if (diceSorted[i] !== diceSorted[i - 1] + 1) {
          strikes++;
          break;
        }
      }

      for (let i = 1; i < 4; i++) {
        if (diceSorted[i] !== diceSorted[i - 1] + 1) {
          strikes++;
          break;
        }
      }

      if (strikes < 3) {
        points += 30;
      }

      roundOver();
      return points;
    } else {
      return "please roll";
    }
  } else {
    return "Small straight already chosen";
  }
}

function largeStr() {
  if (chosen[10]) {
    if (dice[0] !== 0) {
      chosen[10] = false;

      let diceSorted = sort(dice);

      for (let i = 1; i < 5; i++) {
        if (diceSorted[i] !== diceSorted[i - 1] + 1) {
          roundOver();
          return points;
        }
      }

      points += 40;

      roundOver();
      return points;
    } else {
      return "please roll";
    }
  } else {
    return "Large straight already chosen";
  }
}

slashGyattsy = false;

function gyattsy() {
  if (dice[0] !== 0) {
    for (let i = 1; i < 5; i++) {
      if (dice[i] !== dice[0]) {
        slashGyattsy = true;
        roundOver();
        return points;
      }
    }

    if (!slashGyattsy) {
      if (chosen[11]) {
        points += 50;
      } else {
        points += 100;
      }
    }

    roundOver();
    return points;
  } else {
    return "please roll";
  }
}

function chance() {
  if (chosen[12]) {
    if (dice[0] !== 0) {
      chosen[12] = false;

      points += dice[0] + dice[1] + dice[3] + dice[4];

      roundOver();
      return points;
    } else {
      return "please roll";
    }
  } else {
    return "Chance already chosen";
  }
}
