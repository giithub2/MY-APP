
document.write(`
<!DOCTYPE html>
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
      width: 100%; height: auto;
      transition: opacity 0.3s ease;
    }
    .card5:hover img { opacity: 0.8; }
    .card5-container {
      display: flex; flex-direction: column;
      align-items: center; margin-top: 20px;
    }
    .live-indicator, .countdown-timer, .custom-message {
      position: absolute; left: 50%; transform: translateX(-50%);
      padding: 8px 24px; font-size: 22px; font-weight: bold;
      border-radius: 5px; color: white; text-align: center;
      width: 80%; box-sizing: border-box;
    }
    .live-indicator {
      background-color: red; border: none;
      animation: blink 1s infinite; display: none; bottom: 0px;
    }
    .live-indicator:hover { background-color: darkred; }
    .countdown-timer {
      background-color: rgba(0, 0, 0, 0.6);
      display: none; bottom: 0px;
    }
    .custom-message {
      background-color: rgba(0, 0, 0, 0.6);
      display: none; bottom: 33px; font-size: 30px;
    }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    @media (max-width: 768px), (max-width: 480px) {
      .card5 { width: 98%; }
      .live-indicator, .countdown-timer, .custom-message {
        font-size: 15px; padding: 6px 18px; width: 70%;
      }
      .custom-message { font-size: 20px; color: white; }
    }
    .card5 a { text-decoration: none; }
  </style>
</head>
<body>
  <div class="card5-container">
    <a href="/aslsports/india.html">
      <div class="card5">
        <img src="https://i.ibb.co/20j5x3yS/IMG-20250916-062449-123.jpg" alt="Card Image" id="cardImage">
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
          "2025-09-16": [
            {
              startHour: 19, startMinute: 0, endHour: 23, endMinute: 30,
              message: "BAN vs AFG - Asia Cup",
              image: "https://i.ibb.co/Cs6tdBQ3/IMG-20250916-050017-433.jpg"
            },
            {
              startHour: 0, startMinute: 0, endHour: 0, endMinute: 0,
              message: "ASIA CUP - Match 10",
              image: "https://i.ibb.co/7tTNgZrF/IMG-20250916-052319-386.jpg"
            }
          ],
          "2025-09-21": [
            {
              startHour: 19, startMinute: 0, endHour: 23, endMinute: 30,
              message: "Asia Cup",
              image: "https://i.ibb.co/DP5rMNXc/t-LDRepjym-RD.jpg"
            }
          ],
          "2025-09-20": [
            {
              startHour: 19, startMinute: 0, endHour: 23, endMinute: 30,
              message: "Asia Cup",
              image: "https://i.ibb.co/5XtFh3Dh/IMG-20250919-063115-517.jpg"
            }
          ],
          "2025-09-19": [
            {
              startHour: 19, startMinute: 0, endHour: 23, endMinute: 0,
              message: "🇮🇳 INDIA vs OMAN 🇴🇲",
              image: "https://i.ibb.co/q32QTWFD/IMG-20250918-041447-197.jpg"
            }
          ]
        }
      }
