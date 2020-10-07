let votes = {};

async function countVotes() {
  const response = await fetch("votes/5oti06Es2eIFgnep");
  votes = await response.json();
}

function setup() {
  createCanvas(400, 300);
  countVotes();
  setInterval(countVotes, 500);
}

function draw() {
  clear();

  let choices = Object.keys(votes);
  // The check is no longer needed and also now it will support >4 options
  choices = choices.filter((elt) => /^[abcd]$/.test(elt));

  let maxVotes = 0;
  for (let choice of choices) {
    let count = votes[choice];
    maxVotes = max(count, maxVotes);
  }

  for (let i = 0; i < choices.length; i++) {
    let choice = choices[i];
    let w = map(votes[choice], 0, maxVotes, 0, 100);
    let x = 10;
    let y = 20 + i * 20;
    fill(0);
    noStroke();
    text(choice, x, y + 10);
    rect(x + 20, 20 + i * 20, w, 10);
  }
}
