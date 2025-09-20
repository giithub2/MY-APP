document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live IPTV Slider</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
  <style>
    body {
      margin: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(180deg, #1a1a1a, #111);
      color: #fff;
      overflow-x: hidden;
    }
    h1 {
      text-align: center;
      padding: 30px 20px;
      font-size: clamp(24px, 5vw, 32px);
      background: linear-gradient(90deg, #ff6b6b, #ff0080);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .swiper {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .swiper-slide {
      border-radius: 20px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
      text-align: center;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      width: 300px;
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: relative;
      background-size: cover;
      background-position: center;
    }
    .swiper-slide::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4));
      z-index: 0;
    }
    .swiper-slide:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    }
    .swiper-slide-active {
      transform: scale(1.05);
      z-index: 2;
    }
    .card-content {
      position: relative;
      padding: 20px;
      z-index: 1;
    }
    .card-content h3 {
      font-size: clamp(18px, 3vw, 22px);
      margin: 0 0 12px;
      color: #fff;
      text-transform: capitalize;
    }
    .btn {
      margin: 10px auto 5px;
      padding: 12px 24px;
      font-size: clamp(14px, 2vw, 16px);
      background: linear-gradient(90deg, #ff6b6b, #ff0080);
      color: #fff;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: transform 0.2s, opacity 0.2s;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .btn:hover {
      transform: scale(1.1);
      opacity: 0.95;
    }

    /* Fallback popup if not inside app */
    #downloadPopup {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.9);
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 2000;
      color: #fff;
      font-size: 18px;
    }
    #downloadPopup button {
      margin-top: 20px;
      padding: 10px 20px;
      border: none;
      background: #ff0080;
      color: #fff;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .swiper-slide {
        width: 250px;
        height: 350px;
      }
      .swiper {
        padding: 20px 10px;
      }
    }
    @media (max-width: 480px) {
      .swiper-slide {
        width: 300px;
        height: 180px;
      }
      .card-content h3 {
        font-size: 18px;
      }
      .btn {
        padding: 10px 20px;
        font-size: 14px;
      }
    }
  </style>
</head>
<body>

<!-- Slider -->
<div class="swiper">
  <div class="swiper-wrapper" id="channelCarousel"></div>
</div>

<!-- Fallback Popup -->
<div id="downloadPopup">
  <p>⚠️ This Match is avilable only in the official app. Download the app Now</p>
  <button onclick="document.getElementById('downloadPopup').style.display='none'">Close</button>
</div>

<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js"></script>
<script>
  const JSON_URL = "https://raw.githubusercontent.com/jitupatel2506/ipl_data_api/refs/heads/main/live_stream/auto_update_all_streams.json";

  async function loadChannels() {
    try {
      const res = await fetch(JSON_URL);
      const channels = await res.json();

      const carousel = document.getElementById("channelCarousel");
      carousel.innerHTML = "";

      channels.forEach(ch => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.style.backgroundImage = \`url(\${ch.thumbnail || "https://via.placeholder.com/300x400"})\`;
        slide.innerHTML = \`
          <div class="card-content">
            <h3>\${ch.channelName}</h3>
            <button class="btn" onclick="playInNativePlayer('\${ch.channelUrl}')">▶ Live Now</button>
          </div>
        \`;
        carousel.appendChild(slide);
      });

      new Swiper(".swiper", {
        slidesPerView: "auto",
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
      });

      VanillaTilt.init(document.querySelectorAll(".swiper-slide"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
      });
    } catch (e) {
      console.error("Failed to load channels:", e);
    }
  }

  function playInNativePlayer(url) {
    if (window.AndroidInterface?.playInNativePlayer) {
      AndroidInterface.playInNativePlayer(url);
    } else if (window.AndroidInterface?.playM3U8Video) {
      AndroidInterface.playM3U8Video(url);
    } else {
      document.getElementById("downloadPopup").style.display = "flex";
    }
  }

  loadChannels();
</script>

</body>
</html>
`);
