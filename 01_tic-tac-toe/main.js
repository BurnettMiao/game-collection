// ----- tic tac toe -----
document.addEventListener('DOMContentLoaded', () => {
  let isOver = false;
  let steps = 9;
  let currentSymbol = 'O';
  const winnerArr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  let moveO = [];
  let moveX = [];

  const resetBtn = document.getElementById('reset-btn');
  const gameContainer = document.getElementById('game-container');

  // 重置按鈕
  resetBtn.addEventListener('click', () => {
    gameContainer
      .querySelectorAll('.game-item')
      .forEach((cell) => (cell.innerText = ''));

    isOver = false;
    steps = 9;
    moveO = [];
    moveX = [];
    currentSymbol = 'O';
    console.log('遊戲重置！');
  });

  // 主遊戲邏輯
  gameContainer.addEventListener('click', (e) => {
    // 遊戲結束忽略點擊
    if (isOver) return;

    const target = e.target.closest('.game-item');
    if (!target) return;

    if (steps > 0) {
      if (target.innerText === 'O' || target.innerText === 'X') {
        console.log('此格已有symbol!');
        return;
      }

      if (target.innerText === '') {
        target.innerText = currentSymbol;

        // user
        if (currentSymbol === 'O') {
          moveO.push(Number(target.dataset.grid));
          steps--;

          if (checkGameEnd()) return;
          currentSymbol = 'X';
        }

        // computer
        if (currentSymbol === 'X') {
          const randomTimeArr = [250, 500, 750, 1000];

          const randomTime = Math.floor(Math.random() * randomTimeArr.length);

          setTimeout(() => {
            const computer = computerMove();
            moveX.push(computer);
            steps--;

            if (checkGameEnd()) return;
            currentSymbol = 'O';
          }, randomTimeArr[randomTime]);
        }

        console.log('剩下steps:', steps);
      }
    }

    console.log('點擊格子為: ', target.dataset.grid);

    if (steps === 0) {
      console.log('遊戲結束...');
    }
  });

  // 統一檢查遊戲結束
  function checkGameEnd() {
    if (winCheck(winnerArr, moveO)) {
      isOver = true;
      console.log('O symbol 獲勝！！');
      return true;
    }

    if (winCheck(winnerArr, moveX)) {
      isOver = true;
      console.log('X symbol 獲勝！！');
      return true;
    }

    if (steps === 0) {
      isOver = true;
      console.log('平手狀態！！！');
      return true;
    }

    return false;
  }

  function winCheck(winnerArr, symbolArr) {
    const isWin = winnerArr.some((line) =>
      line.every((num) => symbolArr.includes(num))
    );
    return isWin;
  }

  // 電腦下棋
  function computerMove() {
    const emptyCells = [...gameContainer.children]
      .filter((cell) => cell.innerText === '')
      .map((cell) => ({ num: Number(cell.dataset.grid), el: cell }));

    if (emptyCells.length === 0) return null;

    const chosen = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    chosen.el.innerText = 'X';
    return chosen.num;
  }
});
