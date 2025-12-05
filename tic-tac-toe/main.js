// ----- tic tac toe -----
function clickFunc() {
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

  resetBtn.addEventListener('click', () => {
    const grids = document.querySelectorAll('.game-item');
    grids.forEach((grid) => (grid.innerText = ''));

    isOver = false;
    steps = 9;
    moveO = [];
    moveX = [];
    currentSymbol = 'O';
    console.log('遊戲重置！');
  });

  document.getElementById('game-container').addEventListener('click', (e) => {
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

        if (currentSymbol === 'O') {
          moveO.push(Number(target.dataset.grid));

          const isWin = winCheck(winnerArr, moveO);
          if (isWin) {
            isOver = true;
            console.log('O symbol 獲勝！！');
          }

          console.log(moveO, isWin);
        } else {
          moveX.push(Number(target.dataset.grid));

          const isWin = winCheck(winnerArr, moveO);
          if (isWin) {
            isOver = true;
            console.log('X symbol 獲勝！！');
          }

          console.log(moveX, isWin);
        }

        currentSymbol = currentSymbol === 'O' ? 'X' : 'O';
        steps--;
        console.log('剩下steps:', steps);
      }
    }

    console.log('點擊格子為: ', target.dataset.grid);

    if (steps === 0) {
      console.log('遊戲結束...');
    }
  });
}

function winCheck(winnerArr, symbolArr) {
  const isWin = winnerArr.some((line) =>
    line.every((num) => symbolArr.includes(num))
  );
  return isWin;
}

// clickFunc();

function computerMove() {
  const gameContainer = document.getElementById('game-container');

  let gridIndexArr = [];

  const children = Array.from(gameContainer.children);

  children.forEach((item) => {
    if (item.innerText === '') {
      gridIndexArr.push(Number(item.dataset.grid));
    }
  });

  const randomIndex = Math.floor(Math.random() * gridIndexArr.length);

  const randomGridIndex = gridIndexArr[randomIndex];

  children[randomGridIndex - 1].innerText = 'X';

  console.log(gridIndexArr);
  console.log(randomIndex);
}

computerMove();
