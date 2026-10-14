// 12 個月指定節慶、說明、專屬圖示與單字庫
const FESTIVAL_DATA = {
  1: { title: "一月：跨年元旦", icon: "🎆", desc: "跨年煙火倒數計時！", words: { 'A': 'Annual', 'S': 'Sparkler', 'D': 'December-end', 'F': 'Fireworks', 'G': 'Gathering', 'H': 'Happy', 'J': 'January', 'K': 'Kiss', 'L': 'Light' } },
  2: { title: "二月：農曆新年", icon: "🧨", desc: "點燃鞭炮，歡喜迎春！", words: { 'A': 'Apple', 'S': 'Spring', 'D': 'Dragon', 'F': 'Fortune', 'G': 'Gold', 'H': 'Home', 'J': 'Joy', 'K': 'Kin', 'L': 'Lantern' } },
  3: { title: "三月：女兒節", icon: "🌸", desc: "桃花香裡慶祝女孩節", words: { 'A': 'Adornment', 'S': 'Silk', 'D': 'Doll', 'F': 'Festival', 'G': 'Girl', 'H': 'Hina', 'J': 'Jewel', 'K': 'Kimono', 'L': 'Lily' } },
  4: { title: "四月：兒童節", icon: "🎈", desc: "童趣繽紛快樂放風箏", words: { 'A': 'Amusement', 'S': 'Smile', 'D': 'Delight', 'F': 'Fun', 'G': 'Game', 'H': 'Happiness', 'J': 'Joy', 'K': 'Kite', 'L': 'Laughter' } },
  5: { title: "五月：母親節", icon: "💐", desc: "獻上康乃馨感謝偉大母愛", words: { 'A': 'Affection', 'S': 'Sweet', 'D': 'Devotion', 'F': 'Flower', 'G': 'Gift', 'H': 'Hug', 'J': 'Joy', 'K': 'Kindness', 'L': 'Love' } },
  6: { title: "六月：端午節", icon: "🚣", desc: "划龍舟、包粽子向前衝！", words: { 'A': 'Aroma', 'S': 'Sachet', 'D': 'Dragon', 'F': 'Feast', 'G': 'Glutinous', 'H': 'Herbs', 'J': 'Jongzi', 'K': 'Keelboat', 'L': 'Leaf' } },
  7: { title: "七月：暑假", icon: "☀️", desc: "陽光沙灘熱情暑假！", words: { 'A': 'Adventure', 'S': 'Sun', 'D': 'Diving', 'F': 'Float', 'G': 'Glasses', 'H': 'Hot', 'J': 'July', 'K': 'Kayak', 'L': 'Lagoon' } },
  8: { title: "八月：父親節", icon: "🦸‍♂️", desc: "向家裡的超級英雄老爸致敬", words: { 'A': 'Admiration', 'S': 'Strong', 'D': 'Dad', 'F': 'Father', 'G': 'Great', 'H': 'Hero', 'J': 'Jovial', 'K': 'Kinship', 'L': 'Loyal' } },
  9: { title: "九月：中秋節", icon: "🥮", desc: "月圓人團圓，賞月吃月餅", words: { 'A': 'Autumn', 'S': 'Shine', 'D': 'Delicious', 'F': 'Fullmoon', 'G': 'Golden', 'H': 'Harvest', 'J': 'Jade-rabbit', 'K': 'Kinsfolk', 'L': 'Lantern' } },
  10: { title: "十月：萬聖節", icon: "🎃", desc: "不給糖就搗蛋，南瓜燈亮起", words: { 'A': 'Apparition', 'S': 'Spooky', 'D': 'Darkness', 'F': 'Fright', 'G': 'Ghost', 'H': 'Haunt', 'J': 'Jack-o-lantern', 'K': 'Kidnap', 'L': 'Lantern' } },
  11: { title: "十一月：感恩節", icon: "🦃", desc: "滿懷感謝的溫馨豐收盛宴", words: { 'A': 'Appreciation', 'S': 'Sharing', 'D': 'Dinner', 'F': 'Feast', 'G': 'Gratitude', 'H': 'Harvest', 'J': 'Joyful', 'K': 'Kitchen', 'L': 'Leg' } },
  12: { title: "十二月：聖誕節", icon: "🎄", desc: "雪花飄飄，聖誕老公公送禮物", words: { 'A': 'Angel', 'S': 'Santa', 'D': 'Decoration', 'F': 'Fir-tree', 'G': 'Gift', 'H': 'Holiday', 'J': 'Jingle', 'K': 'Kris-kringle', 'L': 'Light' } }
};

let currentMonth = 1;
let currentKey = 'A';
let currentWord = '';
let score = 0;
let timeLeft = 15;
let timer = null;
let lastKey = '';

// 初始化主畫面 12 月份按鈕
const monthGrid = document.getElementById('month-grid');
if (monthGrid) {
  for (let i = 1; i <= 12; i++) {
    const card = document.createElement('div');
    card.className = 'month-card';
    card.innerHTML = `<h3>${FESTIVAL_DATA[i].icon} ${FESTIVAL_DATA[i].title}</h3><p>${FESTIVAL_DATA[i].desc}</p>`;
    card.onclick = () => startMonthGame(i);
    monthGrid.appendChild(card);
  }
}

// 進入指定月份關卡
function startMonthGame(month) {
  currentMonth = month;
  score = 0;
  
  document.getElementById('month-select-screen').classList.remove('active');
  document.getElementById('game-screen').classList.add('active');
  
  const resultModal = document.getElementById('result-modal');
  if (resultModal) resultModal.style.display = 'none';

  // 套用該月份專屬標題與圖示
  document.getElementById('festival-title').innerText = FESTIVAL_DATA[month].title;
  document.getElementById('festival-icon').innerText = FESTIVAL_DATA[month].icon;
  document.getElementById('theme-desc').innerText = FESTIVAL_DATA[month].desc;
  
  nextWord();
  startTimer();
}

// 隨機抽中排字母，並點亮虛擬鍵盤
function nextWord() {
  const homeKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  let availableKeys = homeKeys.filter(k => k !== lastKey);
  currentKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
  lastKey = currentKey;

  currentWord = FESTIVAL_DATA[currentMonth].words[currentKey];

  // 更新畫面上單字顯示
  document.getElementById('highlight-letter').innerText = `[${currentKey}]`;
  document.getElementById('remaining-word').innerText = currentWord.slice(1);

  // 🎯 更新虛擬鍵盤提示：移除所有按鍵的高亮，並點亮當前目標按鍵
  document.querySelectorAll('.key').forEach(el => {
    el.classList.remove('active-target');
  });
  const targetKeyEl = document.querySelector(`.key[data-key="${currentKey}"]`);
  if (targetKeyEl) {
    targetKeyEl.classList.add('active-target');
  }
}

// 鍵盤監聽事件
window.addEventListener('keydown', (e) => {
  const gameScreen = document.getElementById('game-screen');
  if (!gameScreen || !gameScreen.classList.contains('active')) return;
  if (timeLeft <= 0) return;

  const pressedKey = e.key.toUpperCase();
  
  if (pressedKey === currentKey) {
    score++;
    document.getElementById('score').innerText = score;
    
    // 答對時讓對應的虛擬按鍵閃爍特效
    const targetKeyEl = document.querySelector(`.key[data-key="${currentKey}"]`);
    if (targetKeyEl) {
      targetKeyEl.style.transform = 'scale(1.2)';
      setTimeout(() => targetKeyEl.style.transform = 'scale(1)', 150);
    }

    nextWord();
  }
});

// 啟動倒數計時
function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  updateTimerUI();

  timer = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    if (timeLeft <= 0) {
      clearInterval(timer);
      showResultModal();
    }
  }, 1000);
}

function updateTimerUI() {
  document.getElementById('time-left').innerText = timeLeft;
  const percentage = (timeLeft / 15) * 100;
  const bar = document.getElementById('timer-bar');
  if (bar) {
    bar.style.width = percentage + '%';
    bar.style.backgroundColor = timeLeft <= 5 ? '#ef4444' : '#10b981';
  }
}

function showResultModal() {
  let modal = document.getElementById('result-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'result-modal';
    modal.className = 'modal';
    document.body.appendChild(modal);
  }
  
  modal.innerHTML = `
    <div class="modal-content">
      <h2>🎉 闖關結算！</h2>
      <p>你在 <strong>${FESTIVAL_DATA[currentMonth].title}</strong> 總共答對了：</p>
      <div class="final-score">${score} 個單字</div>
      <button onclick="startMonthGame(currentMonth)">再玩一次</button>
      <button onclick="backToMenu()">返回月份選擇</button>
    </div>
  `;
  modal.style.display = 'flex';
}

function backToMenu() {
  clearInterval(timer);
  const modal = document.getElementById('result-modal');
  if (modal) modal.style.display = 'none';
  
  document.getElementById('game-screen').classList.remove('active');
  document.getElementById('month-select-screen').classList.add('active');
}

const backBtn = document.getElementById('back-btn');
if (backBtn) {
    backBtn.onclick = backToMenu;
}