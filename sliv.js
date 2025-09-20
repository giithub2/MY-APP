document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="google-adsense-platform-account" content="ca-host-pub-1556223355139109">
  <meta name="google-adsense-platform-domain" content="blogspot.com">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#308bcf">
  
  <link rel="icon" type="image/x-icon" href="https://i.ibb.co/SN1HfH0/video.png">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

  <title>ASL Sports</title>
  
  <style>
    body {
      font-family: 'Poppins', sans-serif;
        }
    .logo {
      text-align: center;
      background: linear-gradient(to right, yellow 0%, pink 100%);
      font-size: 15px;
    }
    .file-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      padding: 10px;
    }
    .match-item {
      flex: 1 1 calc(50% - 10px);
      text-align: center;
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      background-color: #1a1a1a;
      padding: 10px;
    }
    .match-item img {
      width: 100%;
      height: 110px;
      display: block;
      margin: 0 auto 10px;
      border-radius: 8px;
    }
    .match-item a {
      text-decoration: none;
      color: #00bfff;
      font-weight: 700;
      display: block;
      margin-top: 10px;
      transition: color 0.3s ease;
    }
    .match-item:hover {
      transform: scale(1.05);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }
    .match-item a:hover {
      color: #fff;
    }
    h6 {
      text-align: center;
      color: #00bfff;
      margin-bottom: 7px;
    }
    .status-LIVE {
      color: red;
      font-weight: 600;
      animation: glow 1s infinite alternate;
    }
    @keyframes glow {
      from { text-shadow: 0 0 10px red; }
      to { text-shadow: 0 0 20px red; }
    }
    .status-UPCOMING {
      color: yellow;
      opacity: 0.6;
    }
  </style>
</head>
<body>

  <div class="file-container" id="matches"></div>

  <script>
    const apiURL = 'https://raw.githubusercontent.com/drmlive/sliv-live-events/main/sonyliv.json';

    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        const liveMatches = data.matches.filter(match => match.isLive === true).slice(0, 2);

        if (liveMatches.length === 0) return;

        const matchesContainer = document.getElementById('matches');
        liveMatches.forEach(match => {
          const matchItem = document.createElement('div');
          matchItem.className = 'match-item';

          matchItem.innerHTML = \`
            <img src="\${match.src}" alt="\${match.event_name}">
            <h6>\${match.event_name}</h6>
            <p class="status-LIVE">LIVE</p>
          \`;

          matchItem.onclick = () => {
            if (match.dai_url) {
              playInNativePlayer(match.pub_url); // Call your player here
            }
          };

          matchesContainer.appendChild(matchItem);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  <\/script>

</body>
</html>
`);
