const HANDS = ['rock', 'scissor', 'paper'];

const WINS = {
  rock: 'scissor',
  scissor: 'paper',
  paper: 'rock',
};

// 이겼는지 졌는지 비교
export function compareHand(a, b) {
  if (WINS[a] === b) return 1;  // win
  if (WINS[b] === a) return -1;  // lose
  return 0;
}


// 렌덤으로 가위/바위/보 중 한 가지 선택
function random(n) {
  return Math.floor(Math.random() * n);
}

export function generateRandomHand() {
  const idx = random(HANDS.length);
  return HANDS[idx];
}