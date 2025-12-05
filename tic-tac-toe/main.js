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

        // user
        if (currentSymbol === 'O') {
          moveO.push(Number(target.dataset.grid));
          // console.log(moveO);

          const isWin = winCheck(winnerArr, moveO);
          if (isWin) {
            isOver = true;
            console.log('O symbol 獲勝！！');
            return;
          }

          if (steps === 0) {
            isOver = true;
            console.log('平手狀態！！！');
            return;
          }

          currentSymbol = 'X';
          console.log(moveO, isWin);
          steps--;
        }

        // computer
        if (currentSymbol === 'X') {
          const randomTimeArr = [250, 500, 750, 1000];

          const randomTime = Math.floor(Math.random() * randomTimeArr.length);

          setTimeout(() => {
            const computer = computerMove();
            moveX.push(computer);
            // console.log(moveX);

            const isWin = winCheck(winnerArr, moveX);
            if (isWin) {
              isOver = true;
              console.log('X symbol 獲勝！！');
              return;
            }

            currentSymbol = 'O';

            console.log(moveX, isWin);
          }, randomTimeArr[randomTime]);
          steps--;
        }

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

function computerMove() {
  const gameContainer = document.getElementById('game-container');

  let gridIndexArr = [];

  const children = Array.from(gameContainer.children);

  children.forEach((item) => {
    if (item.innerText === '') {
      gridIndexArr.push(Number(item.dataset.grid));
    }
  });

  // if (gridIndexArr.length === 0) {
  //   return null;
  // }

  const randomIndex = Math.floor(Math.random() * gridIndexArr.length);

  const randomGridIndex = gridIndexArr[randomIndex];

  children[randomGridIndex - 1].innerText = 'X';

  return Number(randomGridIndex);
}

// computerMove();
clickFunc();
