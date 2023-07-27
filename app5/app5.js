let currentCell = 0;
let Cellsnumber = 9;
let table = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let cells = document.querySelector("#cell-container");
for (let i = 0; i < Cellsnumber; i++) {
  cells.innerHTML += `<button
          class="cell outline outline-gray-800 outline-8 w-32 h-32 text-7xl"
        ></button>`;
}
const cellsArray = [...document.querySelectorAll(".cell")];
let gameEnsemble = document.querySelector("#game");

cellsArray.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    cell.innerHTML += `<p>${currentCell % 2 === 0 ? "X" : "O"}</p>`;
    cell.disabled = true;
    updateTable(index);
    if (hasLine()) gameEnd(`${currentCell % 2 === 0 ? "X" : "O"} WINS`);
    if (isComplete()) gameEnd("DRAW");
    currentCell++;
  });
});

function updateTable(index) {
  const row = Math.floor(index / table.length);
  const col = index % 3;
  table[row][col] = currentCell % 2 === 0 ? "X" : "O";
}

function hasLine() {
  const currentChar = currentCell % 2 === 0 ? "X" : "O";
  for (let i = 0; i < table.length; i++) {
    if (
      arraysEqual(
        table[i].filter((cell) => cell === currentChar),
        table[i]
      )
    ) {
      return true;
    }
    if (
      table[0][i] === currentChar &&
      table[1][i] === currentChar &&
      table[2][i] === currentChar
    )
      return true;
  }

  if (
    table[0][0] === currentChar &&
    table[1][1] === currentChar &&
    table[2][2] === currentChar
  )
    return true;
  if (
    table[0][2] === currentChar &&
    table[1][1] === currentChar &&
    table[2][0] === currentChar
  )
    return true;
  return false;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function isComplete() {
  return (
    table.filter(
      (row) => row.filter((cell) => cell !== "").length === row.length
    ).length === table.length
  );
}

function gameEnd(text) {
  cellsArray.forEach((cell) => {
    cell.disabled = true;
  });
  gameEnsemble.innerHTML =
    gameEnsemble.innerHTML +
    `<div class="flex flex-col gap-4 text-center"><p class="text-6xl">${text}</p><button onclick="location.reload()" class="text-5xl border-4 border-gray-950 rounded-sm p-4">Play Again?</button></div>`;
}
