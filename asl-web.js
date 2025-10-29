document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Live Card with Countdown</title>
  <style>
    .livecard-container-1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }

    .livecard-1 {
      width: 99%;
      margin: 0;
      border-radius: 10px;
      overflow: hidden;
      background-color: black;
      position: relative;
      transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
      box-shadow: 0 14px 15px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 1.9);
    }

    .livecard-1:hover {
      transform: translateY(-10px);
    }

    .livecard-img-1 {
      width: 100%;
      height: auto;
      transition: opacity 0.3s ease;
    }

    .livecard-1:hover .livecard-img-1 {
      opacity: 0.8;
    }

    .livecard-live-1,
    .livecard-timer-1,
    .livecard-message-1 {
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

    .livecard-live-1 {
      background-color: red;
      border: none;
      animation: blink-livecard-1 1s infinite;
      display: none;
      bottom: 0;
    }

    .livecard-live-1:hover {
      background-color: darkred;
    }

    .livecard-timer-1 {
      background-color: rgba(0, 0, 0, 0.6);
      display: none;
      bottom: 0;
    }

    .livecard-message-1 {
      background-color: rgba(0, 0, 0, 0.6);
      display: none;
      bottom: 33px;
      font-size: 30px;
    }

    @keyframes blink-livecard-1 {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    @media (max-width: 768px), (max-width: 480px) {
      .livecard-1 { width: 98%; }
      .livecard-live-1, .livecard-timer-1, .livecard-message-1 {
        font-size: 15px;
        padding: 6px 18px;
        width: 70%;
      }
      .livecard-message-1 {
        font-size: 20px;
        color: white;
      }
    }

    .livecard-1 a {
      text-decoration: none;
    }
  </style>
</head>
<body>

  <div class="livecard-container-1">
    <a href="https://live-criicket.blogspot.com/">
      <div class="livecard-1">
        <img src="https://images.wondershare.com/filmora/article-images/css-loading-text-animation-1.gif"
             alt="Live Match Image"
             id="livecard-image-1"
             class="livecard-img-1">
        <div class="livecard-message-1" id="livecard-message-1"></div>
        <div class="livecard-live-1" id="livecard-live-1">Live Now</div>
        <div class="livecard-timer-1" id="livecard-timer-1"></div>
      </div>
    </a>
  </div>

  <script>
    const liveScheduleData_1 = [
      {
        match: "Fancode",
        dates: {
          "2025-10-29": [
            { startHour: 12, startMinute: 30, endHour: 18, endMinute: 0, message: "1st T20i", image: "https://i.ibb.co/vCrC3x5w/file-29357.jpg" },
            { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, message: "2nd ODI", image: "&s=10" }
          ],
          "2025-10-31": [
            { startHour: 12, startMinute: 30, endHour: 18, endMinute: 0, message: "2nd T20i", image: "https://i.ibb.co/RGpqtgfM/IMG-20251029-043705-904.jpg" }
          ],
          "2025-11-02": [
            { startHour: 12, startMinute: 30, endHour: 18, endMinute: 0, message: "3rd T20i", image: "https://i.ibb.co/R4JNSfty/IMG-20251029-043709-530.jpg" }
          ],
          "2025-11-06": [
            { startHour: 12, startMinute: 30, endHour: 18, endMinute: 0, message: "4th T20i", image: "https://i.ibb.co/n8N6gwpw/IMG-20251029-043713-832.jpg" }
          ],
          "2025-11-08": [
            { startHour: 12, startMinute: 30, endHour: 18, endMinute: 50, message: "5th t20i", image: "https://i.ibb.co/hxsqWZ62/IMG-20251029-043717-606.jpg" }
          ]
        }
      }
    ];

    function padZero_1(n) { return n < 10 ? '0' + n : n; }

    function getFormattedDate_1(date) {
      return \`\${date.getFullYear()}-\${padZero_1(date.getMonth() + 1)}-\${padZero_1(date.getDate())}\`;
    }

    function getCurrentSchedule_1(schedules, now) {
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

    function getNextSchedule_1(scheduleDates) {
      const now = new Date();
      const dateKeys = Object.keys(scheduleDates).sort();
      const todayStr = getFormattedDate_1(now);
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

    function updateLiveCard_1() {
      const now = new Date();
      const todayStr = getFormattedDate_1(now);

      const liveIndicator = document.getElementById('livecard-live-1');
      const countdownTimer = document.getElementById('livecard-timer-1');
      const customMessage = document.getElementById('livecard-message-1');
      const cardImage = document.getElementById('livecard-image-1');

      const schedule = liveScheduleData_1[0];
      const schedulesToday = schedule?.dates[todayStr];
      const currentSchedule = getCurrentSchedule_1(schedulesToday, now);

      if (currentSchedule) {
        liveIndicator.style.display = 'inline-block';
        countdownTimer.style.display = 'none';
        customMessage.textContent = currentSchedule.message;
        customMessage.style.display = 'inline-block';
        cardImage.src = currentSchedule.image;
      } else {
        liveIndicator.style.display = 'none';
        const nextSchedule = getNextSchedule_1(schedule.dates);
        if (nextSchedule) {
          const diffSec = Math.floor((nextSchedule.startTime - now) / 1000);
          const days = Math.floor(diffSec / (3600 * 24));
          const hours = Math.floor((diffSec % (3600 * 24)) / 3600);
          const minutes = Math.floor((diffSec % 3600) / 60);
          const seconds = diffSec % 60;

          countdownTimer.textContent = \`Live in: \${days}d \${padZero_1(hours)}h \${padZero_1(minutes)}m \${padZero_1(seconds)}s\`;
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
    }

    setInterval(updateLiveCard_1, 1000);
    window.onload = updateLiveCard_1;
  <\/script>
</body>
</html>`);
