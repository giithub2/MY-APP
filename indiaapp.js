<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"> 
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"> 
  <title>Live Testing</title> 
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"> 
  <style>
:root {
  --bg-primary: #404040;
  --bg-secondary: #c2009e;
  --text-primary: #ffffff;
  --text-secondary: #ffebf7;
  --accent: #ff66cc;
  --button-hover: #b3007a;
  --card-bg: linear-gradient(145deg, #2a2a2a, #404040);
  --card-border: rgba(255, 255, 255, 0.1);
  --shadow-light: rgba(255, 255, 255, 0.1);
  --shadow-dark: rgba(0, 0, 0, 0.4);
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background:#404040;
  text-align: center;
  padding: 10px;
  min-height: 100vh;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.vpn-container {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1000;
}

.switch {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: red;
  transition: 0.4s;
  border-radius: 34px;
  text-align: center;
  line-height: 34px;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: green;
}

input:checked + .slider:before {
  transform: translateX(46px);
}

.container {
  width: 100%;
  max-width: 100%;
  padding: 10px;
}

.video-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto 15px;
  border-radius: 8px;
  overflow: hidden;
  
}

.video-wrapper {
  position: relative;
  width: 100%;
  padding-top: 64%;
  background-color: var(--bg-primary);
}

.video-wrapper iframe {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  cursor: not-allowed;
}

/* Enhanced Server Container */
.server-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin: 20px 0;
  padding: 0 10px;
  max-width: 1000px;
  width: 100%;
}

/* Enhanced Server Items */
.server-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-bg);
  color: var(--text-secondary);
  padding: 15px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 600;
  font-size: 14px;
  border: 1px solid var(--card-border);
  box-shadow: 
    0 4px 15px var(--shadow-dark),
    inset 0 1px 0 var(--shadow-light);
  overflow: hidden;
}

.server-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.server-item:hover::before {
  left: 100%;
}

.server-item:hover,
.server-item.active {
  background: linear-gradient(145deg, var(--button-hover), var(--accent));
  color: var(--text-primary);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 8px 25px rgba(255, 102, 204, 0.3),
    0 2px 10px var(--shadow-dark);
}

.server-item i {
  margin-right: 8px;
  font-size: 16px;
}

/* Enhanced Card Grid */
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 15px;
  padding: 20px 10px;
  max-width: 1200px;
  width: 100%;
}

/* Enhanced Cards */
.card {
  position: relative;
  background: var(--card-bg);
  border-radius: 16px;
  cursor: pointer;
  border: 1px solid var(--card-border);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 
    0 8px 32px var(--shadow-dark),
    inset 0 1px 0 var(--shadow-light);
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent, rgba(255, 102, 204, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.card:hover::before {
  opacity: 1;
}

.card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 
    0 20px 40px rgba(255, 102, 204, 0.2),
    0 8px 20px var(--shadow-dark),
    inset 0 1px 0 var(--shadow-light);
}

.card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover img {
  transform: scale(1.1);
}

.card p {
  padding: 15px 12px;
  background: linear-gradient(145deg, #ff8c00, #ff6500);
  margin: 0;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 600;
  position: relative;
  overflow: hidden;
}

.card p::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.card:hover p::before {
  left: 100%;
}

.card a {
  text-decoration: none;
  color: inherit;
}

.tt {
  font-size: 14px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  font-weight: 600;
}

.ttt {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  font-weight: 400;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 25px 0;
  flex-wrap: wrap;
}

/* Enhanced Social Buttons */
.telegram-button,
.whatsapp-button {
  position: relative;
  color: #E0E0E0;
  padding: 12px 25px;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: inline-flex;
  align-items: center;
  font-size: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.telegram-button::before,
.whatsapp-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.telegram-button:hover::before,
.whatsapp-button:hover::before {
  left: 100%;
}

.telegram-button {
  background: linear-gradient(145deg, #2196F3, #1976D2);
}

.telegram-button:hover {
  background: linear-gradient(145deg, #1976D2, #0D47A1);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(33, 150, 243, 0.4);
}

.whatsapp-button {
  background: linear-gradient(145deg, #25D366, #128C7E);
}

.whatsapp-button:hover {
  background: linear-gradient(145deg, #128C7E, #075E54);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
}

.title-card {
  background: var(--card-bg);
  color: var(--text-primary);
  padding: 15px 20px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0;
  box-shadow: 
    0 8px 32px var(--shadow-dark),
    inset 0 1px 0 var(--shadow-light);
  border: 1px solid var(--card-border);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-scroll-row {
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding: 15px 0;
  width: 100%;
}

.image-scroll-row img {
  width: 80px;
  height: 80px;
  flex: 0 0 auto;
  border-radius: 12px;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.image-scroll-row img:hover {
  transform: scale(1.1) translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

/* Enhanced Popup Styles */
.popup-button {
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 2000;
}

.popup-button button {
  background: linear-gradient(145deg, var(--accent), var(--button-hover));
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 
    0 4px 15px rgba(255, 102, 204, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  font-weight: 600;
}

.popup-button button:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 25px rgba(255, 102, 204, 0.4),
    0 4px 15px rgba(0, 0, 0, 0.3);
}

#popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.75);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  backdrop-filter: blur(5px);
}

#popup-content {
  position: relative;
  width: 90%;
  max-width: 700px;
  height: 80%;
  background-color: #000;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: popupSlideIn 0.3s ease-out;
}

@keyframes popupSlideIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

#popup-content iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(145deg, #ff4444, #cc0000);
  color: white;
  font-size: 20px;
  font-weight: bold;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 4000;
  box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
}

.close-btn:hover {
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  color: #333;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    padding: 15px 5px;
  }
  
  .server-container {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
  }
  
  .server-item {
    padding: 12px 8px;
    font-size: 12px;
  }
  
  .card img {
    height: 100px;
  }
  
  .tt {
    font-size: 12px;
  }
  
  .ttt {
    font-size: 10px;
  }
  
  .social-buttons {
    gap: 12px;
  }
  
  .telegram-button,
  .whatsapp-button {
    padding: 10px 20px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .cards-container {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }
  
  .server-container {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
  }
  
  .popup-button button {
    padding: 10px 12px;
    font-size: 12px;
  }
  
  #popup-content {
    width: 95%;
    height: 85%;
  }
}

/* Smooth scrollbar for webkit browsers */
.image-scroll-row::-webkit-scrollbar {
  height: 6px;
}

.image-scroll-row::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.image-scroll-row::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 3px;
}

.image-scroll-row::-webkit-scrollbar-thumb:hover {
  background: var(--button-hover);
}
  </style>
</head>
<body>
  

  <div class="container"> 
    <div class="video-container"> 
      <div class="video-wrapper" id="video-container"> 
       <!------> <iframe src="https://aslsports-app.vercel.app/aslsports/tn.html" allowfullscreen></iframe> 
      </div> 
    </div> <!------>
    

      </div> 

    </div> 
    <div class="server-container"> 
    <!------  <div class="server-item" onclick="AndroidInterface.openWillowMatch()"> <i class="fas fa-play-circle"></i><span>CricHD Live</span> </div> <!------>
    <!------  <div class="server-item" onclick="AndroidInterface.openMyWebPage()"> <i class="fas fa-play-circle"></i><span>IND vs ENG (Test) </span> </div> <!------>
      
   <!--<div class="server-item" data-src="/server/1.html"> <i class="fas fa-play-circle"></i><span>Server 1</span> </div> 
      <div class="server-item" data-src/server/tencricket.html="/server/2.html"> <i class="fas fa-play-circle"></i><span>Server 2</span> </div> 
      <div class="server-item" data-src="/server/3.html"> <i class="fas fa-play-circle"></i><span>Server 3</span> </div> <!----->
<!--<div class="server-item" data-src="/server/4.html"> <i class="fas fa-play-circle"></i><span>Server 4</span> </div> 
      <div class="server-item" data-src="/server/5.html"> <i class="fas fa-play-circle"></i><span>Server 5</span> </div> <!------>
     <!------ <div class="server-item" data-src="intent:https://pubads.g.doubleclick.net/ssai/event/nmQFuHURTYGQBNdUG-2Qdw/master.m3u8#Intent;package=com.genuine.leone;type=video/mp4;end;">
        <i class="fas fa-play-circle"></i><span>Play on NS PLAYER</span>
      </div> <!------>
    </div>
 <!------<button onclick="AndroidPlayer.openNativePlayer('https://pubads.g.doubleclick.net/ssai/event/nmQFuHURTYGQBNdUG-2Qdw/master.m3u8')">
  Play in Native Player
</button> <!------>

<div class="cards-container">

<!----TNT SPORTS 1---->
	<div class="card">
    <a href="https://tnt-live-sports.blogspot.com/">
        <script src=""></script>
        <p><b class="tt">TNT Sports</b><br><b class="ttt"></b></p>
    </a>
</div><!-------->

<!--------
<div class="card" onclick="playInNativePlayer('https://dai.google.com/ssai/event/aGNPcotmQHS93Wy7COJ5dQ/master.m3u8')" style="cursor: pointer;">
    <!--------<a href="">
        
        <p><b class="tt">SonyLiv (Hindi)</b><br><b class="ttt"></b></p>
    </a>
</div>
<!-------->
	
	<!--------
<div class="card" onclick="playInNativePlayer('https://dai.google.com/ssai/event/HSsEsTjqQhqetGkg5lTNjw/master.m3u8')" style="cursor: pointer;">
    <!--------<a href="">
        
        <p><b class="tt">SonyLiv (English)</b><br><b class="ttt"></b></p>
    </a>
</div>
<!-------->
	
	<!--------
<div class="card" onclick="playInNativePlayer('https://pubads.g.doubleclick.net/ssai/event/nmQFuHURTYGQBNdUG-2Qdw/master.m3u8')" style="cursor: pointer;">
    
        <p><b class="tt">Sony (Hindi)</b><br><b class="ttt"></b></p>
    </a>
</div>
<!-------->
  <!--------
<div class="card" onclick="playInNativePlayer('https://pubads.g.doubleclick.net/ssai/event/S-q8I27RRzmkb-OIdoaiAw/master.m3u8')" style="cursor: pointer;">
    
        <p><b class="tt">Sony (English)</b><br><b class="ttt"></b></p>
    </a>
</div>
<!-------->
<!--------
<div class="card" onclick="playInNativePlayer('https://dai.google.com/ssai/event/hInaEKUJSziZAGv9boOdjg/master.m3u8')" style="cursor: pointer;">
    
        <p><b class="tt">Sony (Tamil)</b><br><b class="ttt"></b></p>
    </a>
</div>
<!-------->
  <!--------
<div class="card" onclick="playInNativePlayer('https://dai.google.com/ssai/event/x4LxWUcVSIiDaq1VCM7DSA/master.m3u8')" style="cursor: pointer;">
    
        <p><b class="tt">Sony (Telegu)</b><br><b class="ttt"></b></p>
    </a>
</div>
<!-------->


	<!-------->
<div class="card" onclick="playInNativePlayer('https://str3.kriket.dad/hls/token/2aymysircznvkzqjpnhsyfjgd9k8/stream.m3u8|Referer=https://s5.kriket.dad/')" style="cursor: pointer;">
  <p><b class="tt">MKV Server</b><br><b class="ttt"></b></p>
    </a>
</div>
<!-------->
<!-------->

<div class="card" onclick="playInNativePlayer('https://aslsports-app.vercel.app/m3u8/willow.m3u8')" style="cursor: pointer;">

    <a href="">

        <script src=""></script>

        <p><b class="tt">Willow</b><br><b class="ttt"></b></p>

    </a>

</div>

<!-------->
	<!--------
<div class="card" onclick="playInNativePlayer('https://aslsports-app.vercel.app/m3u8/willow2.m3u8')" style="cursor: pointer;">
    <a href="">
        <script src=""></script>
        <p><b class="tt">Willow 2</b><br><b class="ttt"></b></p>
    </a>
</div>
<!-------->
	<!------
	<div class="card" onclick="playInNativePlayer('https://myapp-aslsports.vercel.app/m3u8/sky.m3u8')" style="cursor: pointer;">
  <p><b class="tt">Sky Sp Cricket</b><br><b class="ttt"></b></p>
    </a>
</div>
<!-------->
<!--------
	<div class="card" onclick="playInNativePlayer('https://edge3-moblive.yuppcdn.net/drm/smil:tencricketdrm.smil/chunklist_b996000.m3u8')" style="cursor: pointer;">
        <p><b class="tt">Ten Cricket</b><br><b class="ttt"></b></p>
    </a>
</div>
<!-------->

  <!----TNT SPORTS 1----
	<div class="card">
    <a href="https://tnt-live-sports.blogspot.com/">
        <script src=""></script>
        <p><b class="tt">TNT Sports 1</b><br><b class="ttt"></b></p>
    </a>
</div><!-------->

	<!----TNT SPORTS 2----
	<div class="card">
    <a href="https://aslsports-app.vercel.app/server/tnt2.html">
        <script src=""></script>
        <p><b class="tt">TNT Sports 2</b><br><b class="ttt"></b></p>
    </a>
</div><!-------->
<!----TNT SPORTS 3----
	<div class="card">
    <a href="https://aslsports-app.vercel.app/server/tnt3.html">
        <script src=""></script>
        <p><b class="tt">TNT Sports 3</b><br><b class="ttt"></b></p>
    </a>
</div><!-------->
<!----TNT SPORTS 4----
	<div class="card">
    <a href="https://aslsports-app.vercel.app/server/tnt4.html">
        <script src=""></script>
        <p><b class="tt">TNT Sports 4</b><br><b class="ttt"></b></p>
    </a>
</div><!-------->
</div>

<!--------><script src="https://asl-sports-app.vercel.app/iptv/CricHD-Buttons.js"> </script>
<br><!-------->
<!--------<script src="https://myapp-aslsports.vercel.app/iptv/CricHD-Buttons2.js"> </script>
<br><!-------->	

<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>ASL Sports App</title><meta property="og:title" content="ASL Sports App - Watch Live Cricket Free!"><meta property="og:description" content="Watch live India cricket matches, get team updates and more – Download ASL Sports App now!"><meta property="og:image" content="https://iili.io/FzJJ7Hb.md.jpg"><meta property="og:url" content="https://asl-sports-apk.netlify.app/"><meta property="og:type" content="website"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"><style>.whatsapp-share{display:inline-flex;align-items:center;background:linear-gradient(135deg,#25D366,#128C7E);color:white;padding:14px 24px;font-size:18px;font-weight:bold;border:none;border-radius:50px;text-decoration:none;transition:all .3s ease;box-shadow:0 4px 10px rgba(18,140,126,0.4)}.whatsapp-share i{font-size:22px;margin-right:12px}.whatsapp-share:hover{transform:scale(1.05);box-shadow:0 6px 14px rgba(18,140,126,0.5);background:linear-gradient(135deg,#128C7E,#075E54)}</style></head><body><center><a href="https://wa.me/?text=Watch vs West Indies Matches Free ! Click Here👇 https://live-criicket.blogspot.com/" class="whatsapp-share" target="_blank"><i class="fab fa-whatsapp"></i> Share on WhatsApp Status</a></center></body></html>
<!--------<script src="https://aslsports-app.vercel.app/aslsports/share.js"></script>
<br><!-------->
<!--------><script src="hhttp://asl-sports-apk.netlify.app/note.js"></script>
<br><!-------->

<script>
    function playInNativePlayer(m3u8Url) {
        if (window.AndroidInterface) {
            window.AndroidInterface.playM3U8Video(m3u8Url);
        } else {
            alert("This Link is Only available in that App..");
        }
    }
</script>

  
    

<img src="https://i.ibb.co/fVPf2nNL/504448214-17952220526964593-43206562553954034-n-webp-2.jpg" width="100%">

</body>
</html>
