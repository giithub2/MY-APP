document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Live Card with Countdown</title>
  <style>
    .card5 {
      width: 99%;
      margin: 0px;
      border-radius: 10px;
      overflow: hidden;
      background-color: black;
      position: relative;
      transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
      box-shadow: 0 14px 15px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 1.9);
    }
    .card5:hover { transform: translateY(-10px); }
    .card5 img {
      width: 100%;
      height: auto;
      transition: opacity 0.3s ease;
    }
    .card5:hover img { opacity: 0.8; }
    .card5-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
    .live-indicator, .countdown-timer, .custom-message {
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
    .live-indicator {
      background-color: red;
      border: none;
      animation: blink 1s infinite;
      display: none;
      bottom: 0px;
    }
    .live-indicator:hover { background-color: darkred; }
    .countdown-timer {
      background-color: rgba(0, 0, 0, 0.6);
      display: none;
      bottom: 0px;
    }
    .custom-message {
      background-color: rgba(0, 0, 0, 0.6);
      display: none;
      bottom: 33px;
      font-size: 30px;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @media (max-width: 768px), (max-width: 480px) {
      .card5 { width: 98%; }
      .live-indicator, .countdown-timer, .custom-message {
        font-size: 15px;
        padding: 6px 18px;
        width: 70%;
      }
      .custom-message { font-size: 20px; color: white; }
    }
    .card5 a { text-decoration: none; }
  </style>
</head>
<body>
  <div class="card5-container">
    <a href="https://live-criicket.blogspot.com">
      <div class="card5">
        <img src="https://images.wondershare.com/filmora/article-images/css-loading-text-animation-1.gif" alt="Card Image" id="cardImage">
        <div class="custom-message"></div>
        <div class="live-indicator">Live Now</div>
        <div class="countdown-timer"></div>
      </div>
    </a>
  </div>


  <script>
    const timeRanges = [
      {
        match: "Fancode",
        dates: {
          "2025-12-09": [
            { startHour: 18, startMinute: 30, endHour: 23, endMinute: 0, message: "1st T20i", image: "https://i.ibb.co/MDC98gWN/IMG-20251208-060808-325.jpg" },
            { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, message: "2nd ODI", image: "&s=10" }
          ],
          "2025-12-11": [
            { startHour: 18, startMinute: 30, endHour: 23, endMinute: 0, message: "2nd T20i", image: "https://i.ibb.co/MDC98gWN/IMG-20251208-060808-325.jpg" }
          ],
          "2025-12-14": [
            { startHour: 18, startMinute: 30, endHour: 23, endMinute: 0, message: "3rd T20i", image: "https://i.ibb.co/MDC98gWN/IMG-20251208-060808-325.jpg" }
          ],
          "2025-11-17": [
            { startHour: 18, startMinute: 30, endHour: 23, endMinute: 0, message: "4th T20i", image: "https://i.ibb.co/MDC98gWN/IMG-20251208-060808-325.jpg" }
          ],
          "2025-11-19": [
            { startHour: 18, startMinute: 30, endHour: 23, endMinute: 0, message: "5th T20i", image: "https://i.ibb.co/MDC98gWN/IMG-20251208-060808-325.jpg" }
          ]
        }
      }
    ];

    function padZero(n) { return n < 10 ? '0' + n : n; }
    function getFormattedDate(date) {
      return \`\${date.getFullYear()}-\${padZero(date.getMonth() + 1)}-\${padZero(date.getDate())}\`;
    }
    function getCurrentSchedule(schedules, now) {
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
    function getNextSchedule(scheduleDates) {
      const now = new Date();
      const dateKeys = Object.keys(scheduleDates).sort();
      const todayStr = getFormattedDate(now);
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
    function checkLiveStatus() {
      const now = new Date();
      const todayStr = getFormattedDate(now);
      document.querySelectorAll('.card5').forEach((card, index) => {
        const liveIndicator = card.querySelector('.live-indicator');
        const countdownTimer = card.querySelector('.countdown-timer');
        const customMessage = card.querySelector('.custom-message');
        const cardImage = card.querySelector('img');
        const schedule = timeRanges[index];
        const schedulesToday = schedule?.dates[todayStr];
        const currentSchedule = getCurrentSchedule(schedulesToday, now);
        if (currentSchedule) {
          liveIndicator.style.display = 'inline-block';
          countdownTimer.style.display = 'none';
          customMessage.textContent = currentSchedule.message;
          customMessage.style.display = 'inline-block';
          cardImage.src = currentSchedule.image;
        } else {
          liveIndicator.style.display = 'none';
          const nextSchedule = getNextSchedule(schedule.dates);
          if (nextSchedule) {
            const diffSec = Math.floor((nextSchedule.startTime - now) / 1000);
            const days = Math.floor(diffSec / (3600 * 24));
            const hours = Math.floor((diffSec % (3600 * 24)) / 3600);
            const minutes = Math.floor((diffSec % 3600) / 60);
            const seconds = diffSec % 60;
            countdownTimer.textContent = \`Live in: \${days}d \${padZero(hours)}h \${padZero(minutes)}m \${padZero(seconds)}s\`;
            countdownTimer.style.display = 'inline-block';
            customMessage.textContent = nextSchedule.message;
            customMessage.style.display = 'inline-block';
            cardImage.src = nextSchedule.image;
          } else {
            countdownTimer.style.display = 'none';
            customMessage.style.display = 'none';
            cardImage.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3_L1HJ4x1FhjtgVTNWszj_ZxmkGy2vvjPbA&s";
          }
        }
      });
    }
    setInterval(checkLiveStatus, 1000);
    window.onload = checkLiveStatus;
  </script>
</body>
</html>`);
