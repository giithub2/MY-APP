document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Live Card with Countdown</title>
  <style>
    .cardLive5 {
      width: 99%;
      margin: 0px;
      border-radius: 10px;
      overflow: hidden;
      background-color: black;
      position: relative;
      transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
      box-shadow: 0 14px 15px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 1.9);
    }
    .cardLive5:hover { transform: translateY(-10px); }
    .cardLive5 img {
      width: 100%;
      height: auto;
      transition: opacity 0.3s ease;
    }
    .cardLive5:hover img { opacity: 0.8; }

    .cardLive5-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }

    .liveIndicator5, .countdownTimer5, .customMessage5 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      padding: 8px 24px;
      font-size: 22px;
      font-weight: bold;
      border-radius: 5px;
      color: white;
      text-align: center;
      width: 80%;
      box-sizing: border-box;
    }
    .liveIndicator5 {
      background-color: red;
      border: none;
      animation: blink5 1s infinite;
      display: none;
      bottom: 0px;
    }
    .liveIndicator5:hover { background-color: darkred; }

    .countdownTimer5 {
      background-color: rgba(0, 0, 0, 0.6);
      display: none;
      bottom: 0px;
    }

    .customMessage5 {
      background-color: rgba(0, 0, 0, 0.6);
      display: none;
      bottom: 33px;
      font-size: 30px;
    }

    @keyframes blink5 {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    @media (max-width: 768px), (max-width: 480px) {
      .cardLive5 { width: 98%; }
      .liveIndicator5, .countdownTimer5, .customMessage5 {
        font-size: 15px;
        padding: 6px 18px;
        width: 70%;
      }
      .customMessage5 { font-size: 20px; color: white; }
    }

    .cardLive5 a { text-decoration: none; }
  </style>
</head>
<body>
  <div class="cardLive5-container">
    <!---><a href="https://ongoing-series.blogspot.com/?s=1"><!----->
    <!-----<a href="https://reelswipe.blogspot.com/?m=1"><!----->
      <div class="cardLive5">
        <img src="https://images.wondershare.com/filmora/article-images/css-loading-text-animation-1.gif" alt="Card Image" id="cardLive5Image">
        <div class="customMessage5"></div>
        <div class="liveIndicator5">Live Now</div>
        <div class="countdownTimer5"></div>
      </div>
    </a>
  </div>

  <script>
    const timeRanges5 = [
      {
        match: "Fancode",
        dates: {
          "2026-02-01": [
            { startHour: 19, startMinute: 0, endHour: 19, endMinute: 20, message: "WPL - 2026", image: "https://i.ibb.co/bMbkg7FT/IMG-20260121-053520-408.jpg" },
            { startHour: 19, startMinute: 20, endHour: 23, endMinute: 30, message: "WPL - 2026", image: "https://i.ibb.co/dJK4DZ1M/IMG-20260117-090939-002.jpg" }
          ],
          "2026-02-03": [
            { startHour: 19, startMinute: 0, endHour: 23, endMinute: 30, message: "WPL 2026 (Final)", image: "https://i.ibb.co/bMbkg7FT/IMG-20260121-053520-408.jpg" }
          ],
          "2026-05-05": [
            { startHour: 19, startMinute: 0, endHour: 23, endMinute: 30, message: "WPL - 2026", image: "https://i.ibb.co/bMbkg7FT/IMG-20260121-053520-408.jpg" }
          ],
          "2026-01-29": [
            { startHour: 19, startMinute: 0, endHour: 23, endMinute: 30, message: "WPL - 2026", image: "https://i.ibb.co/bMbkg7FT/IMG-20260121-053520-408.jpg" }
          ],
          "2026-01-30": [
            { startHour: 19, startMinute: 0, endHour: 23, endMinute: 30, message: "WPL - 2026", image: "https://i.ibb.co/bMbkg7FT/IMG-20260121-053520-408.jpg" }
          ]
        }
      }
    ];

    function padZero5(n) { return n < 10 ? '0' + n : n; }
    function getFormattedDate5(date) {
      return \`\${date.getFullYear()}-\${padZero5(date.getMonth() + 1)}-\${padZero5(date.getDate())}\`;
    }
    function getCurrentSchedule5(schedules, now) {
      if (!schedules || schedules.length === 0) return null;
      for (let schedule of schedules) {
        const start = new Date(now);
        start.setHours(schedule.startHour, schedule.startMinute, 0, 0);
        const end = new Date(now);
        end.setHours(schedule.endHour, schedule.endMinute, 0, 0);
        if (now >= start && now < end) return schedule;
      }
      return null;
    }
    function getNextSchedule5(scheduleDates) {
      const now = new Date();
      const dateKeys = Object.keys(scheduleDates).sort();
      const todayStr = getFormattedDate5(now);
      const todaySchedules = scheduleDates[todayStr];
      if (todaySchedules) {
        for (let schedule of todaySchedules) {
          const startTime = new Date(now);
          startTime.setHours(schedule.startHour, schedule.startMinute, 0, 0);
          if (startTime > now) return { startTime, ...schedule };
        }
      }
      for (const dateStr of dateKeys) {
        if (dateStr <= todayStr) continue;
        const [year, month, day] = dateStr.split('-').map(Number);
        const schedules = scheduleDates[dateStr];
        if (schedules && schedules.length > 0) {
          const firstSchedule = schedules[0];
          const startTime = new Date(year, month - 1, day, firstSchedule.startHour, firstSchedule.startMinute, 0, 0);
          return { startTime, ...firstSchedule };
        }
      }
      return null;
    }
    function checkLiveStatus5() {
      const now = new Date();
      const todayStr = getFormattedDate5(now);
      document.querySelectorAll('.cardLive5').forEach((card, index) => {
        const liveIndicator = card.querySelector('.liveIndicator5');
        const countdownTimer = card.querySelector('.countdownTimer5');
        const customMessage = card.querySelector('.customMessage5');
        const cardImage = card.querySelector('img');
        const schedule = timeRanges5[index];
        const schedulesToday = schedule?.dates[todayStr];
        const currentSchedule = getCurrentSchedule5(schedulesToday, now);
        if (currentSchedule) {
          liveIndicator.style.display = 'inline-block';
          countdownTimer.style.display = 'none';
          customMessage.textContent = currentSchedule.message;
          customMessage.style.display = 'inline-block';
          cardImage.src = currentSchedule.image;
        } else {
          liveIndicator.style.display = 'none';
          const nextSchedule = getNextSchedule5(schedule.dates);
          if (nextSchedule) {
            const diffSec = Math.floor((nextSchedule.startTime - now) / 1000);
            const days = Math.floor(diffSec / (3600 * 24));
            const hours = Math.floor((diffSec % (3600 * 24)) / 3600);
            const minutes = Math.floor((diffSec % 3600) / 60);
            const seconds = diffSec % 60;
            countdownTimer.textContent = \`Live in: \${days}d \${padZero5(hours)}h \${padZero5(minutes)}m \${padZero5(seconds)}s\`;
            countdownTimer.style.display = 'inline-block';
            customMessage.textContent = nextSchedule.message;
            customMessage.style.display = 'inline-block';
            cardImage.src = nextSchedule.image;
          } else {
            countdownTimer.style.display = 'none';
            customMessage.style.display = 'none';
            cardImage.src = "https://images.wondershare.com/filmora/article-images/css-loading-text-animation-1.gif";
          }
        }
      });
    }
    setInterval(checkLiveStatus5, 1000);
    window.onload = checkLiveStatus5;
  </script>
</body>
</html>`);
