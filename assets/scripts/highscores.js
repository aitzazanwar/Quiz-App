//Highscores
const highScoreTable = document.getElementById("highscores-table");
const highScoreButton = document.getElementById("clearScores");

//Event listener
highScoreButton.addEventListener("click",clearHighScores);

//Loads table when page loaded
generateHighscoresTable();

function generateHighscoresTable() {
  let highscores = localStorage.getItem("scoreList");
  if (highscores) {
    addHighscoreTableRows(highscores);
  } 
}

//Highscore table generation
function addHighscoreTableRows(highscores) {
  highscores = JSON.parse(highscores);

  highscores.forEach(function(scoreItem, index) {
    const rankCell = createRankCell(index + 1);
    const scoreCell = createScoreCell(scoreItem.score);
    const initialsCell = createInitialsCell(scoreItem.initials);
    const highscoreTableRow = createHighscoreTableRow(rankCell, scoreCell, initialsCell);
    highScoreTable.appendChild(highscoreTableRow);
  });
}

function createRankCell(rank) {
  const rankCell = document.createElement('td');
  rankCell.textContent = `#${rank}`;
  return rankCell;
}

function createScoreCell(score) {
  const scoreCell = document.createElement('td');
  scoreCell.textContent = score;
  return scoreCell;
}

function createInitialsCell(initials) {
  const initialsCell = document.createElement('td');
  initialsCell.textContent = initials;
  return initialsCell;
}

function createHighscoreTableRow(rankCell, scoreCell, initialsCell) {
  const tableRow = document.createElement('tr');
  tableRow.appendChild(rankCell);
  tableRow.appendChild(scoreCell);
  tableRow.appendChild(initialsCell);
  return tableRow;
}

//Clear table
function clearHighScores() {
  //highScoreButton.addEventListener('click', clearHighscores);
  localStorage.setItem('scoreList', []);
  while (highScoreTable.children.length > 1) {
    highScoreTable.removeChild(highScoreTable.lastChild);
  }
}