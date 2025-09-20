document.write(`
<!-------- CricHD Card Button -------->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JOIN TV4WAP LIVE4WAP CRICHD</title>
  <link rel="icon" href="" type="image/x-icon" />

  <style>
    .crichd-container {
      max-width: 1600px;
      margin: 0 auto;
      padding: 10px;
      width: 100%;
    }

    /* Default: 3 cards per row */
    .crichd-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      width: 100%;
    }

    /* Mobile: 2 cards per row */
    @media (max-width: 768px) {
      .crichd-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* Button as card */
    .crichd-btn {
      background: linear-gradient(45deg, #ff0066, #ffcc00);
      border: none;
      padding: 10px;
      border-radius: 16px;
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.3s ease;
      text-decoration: none;
      text-align: center;
      display: block;
    }

    .crichd-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(255, 0, 102, 0.6);
    }
  </style>
</head>
<body>

  <div class="crichd-container">
    <div id="crichd-app" class="crichd-grid"></div>
  </div>

  <script>
    function loadCricHD() {
      fetch("https://raw.githubusercontent.com/Shubhamkur/Tv/refs/heads/main/crichd")
        .then(res => res.json())
        .then(json => {
          // ✅ Only Willow & Star Sports
          const filtered = json.filter(item =>
            item.name.toLowerCase().includes("willow") ||
            item.name.toLowerCase().includes("star sports ghj")
          );

          const html = filtered.map(item => \`
            <a class="crichd-btn" href="https://tvgo.neocities.org/APPTV/crichd?id=\${item.id}">
              \${item.name}
            </a>
          \`).join("");

          document.querySelector("#crichd-app").innerHTML = html;
        })
        .catch(error => console.log(error));
    }
    loadCricHD();
  <\/script>

</body>
</html>

<!-------- CricHD Card Button -------->
`);
