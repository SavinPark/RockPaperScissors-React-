import { useState } from 'react';
import Button from './Button';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from './utils';


// 초기값
const INITIAL_VALUE = 'rock';

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

function App() {

  // 내손 vs 상대손
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  // 승부 기록
  const [gameHistory, setGameHistory] = useState([]);
  //
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  // 내손(직접) vs 상대손(렌덤) 컨트롤
  // 승부 기록
  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    const comparison = compareHand(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) setOtherScore(otherScore + bet);
  };

  // 초기화
  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
  };

  const handleBetChange = (e) => {
    let num = Number(e.target.value);
    if (num > 9) num %= 10; // 1과 9 사이의 숫자로 만들어 줌
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  };

  return (
    <div>
      {/* 초기화 버튼 */}
      <Button onClick={handleClearClick}>처음부터</Button>

      {/* 내점수 vs 상대점수 */}
      <div>
        {score} : {otherScore}
      </div>

      {/* 내손 vs 상대손 */}
      <div>
        <HandIcon value={hand} />
        VS
        <HandIcon value={otherHand} />
      </div>

      {/* // */}
      <div>
        <input type="number" value={bet} min={1} max={9} onChange={handleBetChange}></input>
      </div>

      {/* 승부 기록 */}
      <p>승부 기록: {gameHistory.join(', ')}</p>

      {/* 내손 컨트롤 버튼 */}
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;