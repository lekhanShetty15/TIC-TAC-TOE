let select = document.getElementById("select");
let area = document.getElementById("area");
let next = document.getElementById("next");
let box = document.querySelectorAll(".box");
let restart = document.querySelectorAll(".restart");
let playagain = document.querySelectorAll(".playagain");
let won = document.querySelectorAll(".won");
let com = document.getElementById("com");
let player = document.getElementById("player");
let draw = document.getElementById("draw");
let userScore = 0;
let computerScore = 0;
let drawScore = 0;
let winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let selectedDiv = null;

function changeColor(clickedDiv) {
  if (selectedDiv !== null) {
    selectedDiv.style.backgroundColor = "transparent";
    selectedDiv.style.color = "white";
  }

  clickedDiv.style.backgroundColor = "white";
  clickedDiv.style.color = "black";

  selectedDiv = clickedDiv;
}

next.addEventListener("click", () => {
  if (selectedDiv === null) {
    alert("Please select an option before proceeding.");
    return;
  }

  select.style.display = "none";
  area.style.display = "flex";

  playerOption = selectedDiv.innerText.trim();
  computerOption = playerOption === "O" ? "X" : "O";

  box.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
});

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1 = box[pattern[0]];
    let pos2 = box[pattern[1]];
    let pos3 = box[pattern[2]];
    let pos1val = pos1.innerText;
    let pos2val = pos2.innerText;
    let pos3val = pos3.innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        pos1.style.backgroundColor = "#9BCF53";
        pos2.style.backgroundColor = "#9BCF53";
        pos3.style.backgroundColor = "#9BCF53";
        pos1.style.color = "black";
        pos2.style.color = "black";
        pos3.style.color = "black";
        return { winner: pos1val, type: "player" };
      }
    }
  }
  let isDraw = Array.from(box).every((button) => button.innerText !== "");
  if (isDraw) {
    return { winner: null, type: "draw" };
  }

  return { winner: null, type: null };
};

function findBestMove() {
  for (let pattern of winPattern) {
    let pos1 = box[pattern[0]];
    let pos2 = box[pattern[1]];
    let pos3 = box[pattern[2]];

    if (
      pos1.innerText === computerOption &&
      pos2.innerText === computerOption &&
      pos3.innerText === ""
    ) {
      return pos3;
    }
    if (
      pos1.innerText === computerOption &&
      pos2.innerText === "" &&
      pos3.innerText === computerOption
    ) {
      return pos2;
    }
    if (
      pos1.innerText === "" &&
      pos2.innerText === computerOption &&
      pos3.innerText === computerOption
    ) {
      return pos1;
    }
  }

  for (let pattern of winPattern) {
    let pos1 = box[pattern[0]];
    let pos2 = box[pattern[1]];
    let pos3 = box[pattern[2]];

    if (
      pos1.innerText === playerOption &&
      pos2.innerText === playerOption &&
      pos3.innerText === ""
    ) {
      return pos3;
    }
    if (
      pos1.innerText === playerOption &&
      pos2.innerText === "" &&
      pos3.innerText === playerOption
    ) {
      return pos2;
    }
    if (
      pos1.innerText === "" &&
      pos2.innerText === playerOption &&
      pos3.innerText === playerOption
    ) {
      return pos1;
    }
  }

  let emptyBoxes = Array.from(document.querySelectorAll(".box")).filter(
    (b) => b.innerText === ""
  );
  return emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
}

box.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (box.innerText === "") {
      box.innerHTML = playerOption;
      box.disabled = true;
      let result = checkWinner();
      if (result.type === "player") {
        userScore++;
        player.innerHTML = userScore;
        updateScore();
        disableAllBoxes();
        document.querySelector(".won").innerText = "# YOU WON !";
      } else if (result.type === "draw") {
        drawScore++;
        draw.innerHTML = drawScore;
        updateScore();
        disableAllBoxes();
        document.querySelector(".won").innerText = "# Draw !";
      } else {
        let computerMove = findBestMove();
        if (computerMove) {
          computerMove.innerText = computerOption;
          computerMove.disabled = true;
          result = checkWinner();
          if (result.type === "player") {
            computerScore++;
            com.innerHTML = computerScore;
            updateScore();
            disableAllBoxes();
            document.querySelector(".won").innerText = "# COMPUTER WON !";
          } else if (result.type === "draw") {
            drawScore++;
            draw.innerHTML = drawScore;
            updateScore();
            disableAllBoxes();
            document.querySelector(".won").innerText = "# Draw !";
          }
        }
      }
    }
  });
});

function disableAllBoxes() {
  box.forEach((b) => (b.disabled = true));
}

function updateScore() {
  document.getElementById("draw").innerText = drawScore;
}

playagain.forEach((btn) => {
  btn.addEventListener("click", () => {
    box.forEach((b) => {
      b.innerText = "";
      b.disabled = false;
      b.style.backgroundColor = "";
      b.style.color = "";
    });

    document.querySelector(".won").innerText = "";

    select.style.display = "none";
    area.style.display = "flex";
  });
});

restart.forEach((btn) => {
  btn.addEventListener("click", () => {
    location.reload();
  });
});
