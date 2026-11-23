function triggerCelebration(month) {
  // 1. 一月跨年 / 國慶等：全螢幕連續高空煙火 (持續 3 秒)
  if (month === 1 || month === 10) {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      // 從畫面左右兩側隨機位置發射煙火
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: Math.random() * 0.3 + 0.1, y: Math.random() - 0.2 } 
      }));
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: Math.random() * 0.3 + 0.6, y: Math.random() - 0.2 } 
      }));
    }, 250);
  } 
  
  // 2. 二月農曆新年 / 中秋節：喜氣紅金雙側禮炮噴發
  else if (month === 2 || month === 8) {
    const colors = ['#ff0000', '#ffd700', '#ff4d4d']; // 紅與金配色
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      zIndex: 9999
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      zIndex: 9999
    });
  } 
  
  // 3. 其他月份：經典五彩紙屑大爆發
  else {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      zIndex: 9999
    });
  }
}