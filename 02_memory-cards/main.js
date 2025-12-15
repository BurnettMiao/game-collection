document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game-container');
  const resetBtn = document.getElementById('reset-btn');

  // 背面基本牌組
  const baseImgs = ['angular', 'aurelia', 'backbone', 'ember', 'react', 'vue'];
  // 牌組組合成6對12張
  const allImgs = [...baseImgs, ...baseImgs];
  shuffle(allImgs);

  const allBack = gameContainer.querySelectorAll('.back');

  allBack.forEach((card, index) => {
    const el = document.createElement('img');
    el.setAttribute('src', `./img/${allImgs[index]}.svg`);
    card.parentElement.dataset.name = `${allImgs[index]}`;
    card.parentElement.dataset.id = index;
    card.appendChild(el);
  });

  let firstClickName = '';
  let firstIndex = null;
  let secondClickName = '';
  let secondIndex = null;
  let isProcessing = false;

  gameContainer.addEventListener('click', (e) => {
    const target = e.target.closest('.game-item');

    if (!target) return;
    if (firstIndex === Number(target.dataset.id)) return;
    if (isProcessing) return;

    target.classList.toggle('flip');

    if (firstClickName === '') {
      firstClickName = target.dataset.name;
      firstIndex = Number(target.dataset.id);
      console.log('01', firstClickName, '02', secondClickName);
      return;
    }

    if (firstClickName !== '' && secondClickName === '') {
      secondClickName = target.dataset.name;
      secondIndex = Number(target.dataset.id);
      console.log('01', firstClickName, '02', secondClickName);

      isProcessing = true;

      setTimeout(() => {
        isPairs();
      }, 1000);
      return;
    }
  });

  resetBtn.addEventListener('click', () => {
    reset();
  });

  function isPairs() {
    if (firstClickName === secondClickName) {
      console.log('湊成一對了！！');
      allBack[firstIndex].parentElement.style.pointerEvents = 'none';
      allBack[secondIndex].parentElement.style.pointerEvents = 'none';
      cardFlipBack();
    }

    if (firstClickName !== secondClickName) {
      console.log('猜錯了！！');
      allBack[firstIndex].parentElement.classList.remove('flip');
      allBack[secondIndex].parentElement.classList.remove('flip');
      cardFlipBack();
    }
  }

  function cardFlipBack() {
    firstClickName = '';
    firstIndex = null;
    secondClickName = '';
    secondIndex = null;
    setTimeout(() => {
      isProcessing = false;
    }, 200);
  }

  // 獨立成函數（Fisher-Yates shuffle，永遠隨機）
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  function reset() {
    firstClickName = '';
    firstIndex = null;
    secondClickName = '';
    secondIndex = null;
    isProcessing = false;

    shuffle(allImgs);

    const allCards = gameContainer.querySelectorAll('.game-item');
    allCards.forEach((card, index) => {
      card.classList.remove('flip');
      card.style.pointerEvents = '';
      card.dataset.name = allImgs[index];
      card.dataset.id = index;

      const backImg = card.querySelector('.back img');
      backImg.src = `./img/${allImgs[index]}.svg`;
    });

    console.log(allImgs);
  }
});
