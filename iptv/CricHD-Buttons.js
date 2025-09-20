document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Live Sports 📡</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      margin: 0;
      background:#404040;
    }

    .logo {
      background: linear-gradient(to right, #ff4081, green);
      color: white;
      text-align: center;
      font-size: 24px;
      padding: 15px;
      font-weight: 700;
    }

    #app {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* ✅ 3 per row on desktop */
      gap: 10px;
      padding: 10px;
      max-width: 1000px;
      margin: auto;
    }

    /* ✅ 2 per row on mobile */
    @media (max-width: 768px) {
      #app {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* CricHD-style buttons */
    .channel-btn {
      background: linear-gradient(45deg, #ff0066, #ffcc00);
      border: none;
      padding: 12px;
      border-radius: 16px;
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.3s ease;
      text-align: center;
      display: block;
      width: 100%;
    }

    .channel-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(255, 0, 102, 0.6);
    }
  </style>
</head>
<body>

  <!-- <div class="logo">CricHD LIVE 📡</div> -->
  <main id="app">Loading channels...</main>

  <script>
    const m3uUrl = "https://raw.githubusercontent.com/abusaeeidx/CricHD-Scraper-V2/main/playlist.m3u";

    async function fetchM3U() {
      const text = await (await fetch(m3uUrl)).text();
      const lines = text.split('\\n');
      const channels = [];

      for (let i = 0; i < lines.length; i++) {
        const ln = lines[i].trim();
        if (!ln.startsWith('#EXTINF')) continue;

        const nameMatch = ln.match(/,(.*)$/);
        const name = nameMatch ? nameMatch[1].trim() : "Unknown Channel";

        let url = "";
        for (let j = i + 1; j < lines.length; j++) {
          const l2 = lines[j].trim();
          if (l2.startsWith('http')) {
            url = l2;
            break;
          }
        }

        if (url) {
          channels.push({ name, url });
        }
      }

      // ✅ Filter for Willow & Star Sports 1 Hindi
      const selectedChannels = channels.filter(c => {
        const lowerName = c.name.toLowerCase();
        return lowerName.includes("willow") || lowerName.includes("star sports 1 hd");
      });

      renderChannels(selectedChannels);
    }

    function renderChannels(channels) {
      const app = document.getElementById("app");
      app.innerHTML = "";

      channels.forEach(c => {
        const btn = document.createElement("button");
        btn.className = "channel-btn";
        btn.textContent = c.name;
        btn.onclick = () => playInNativePlayer(c.url);
        app.appendChild(btn);
      });
    }

    function playInNativePlayer(url) {
      if (window.AndroidInterface?.playInNativePlayer) {
        AndroidInterface.playInNativePlayer(url);
      } else if (window.AndroidInterface?.playM3U8Video) {
        AndroidInterface.playM3U8Video(url);
      } else {
        alert("This feature only works in the Android app.");
      }
    }

    fetchM3U();
  </script>

</body>
</html>
`);
