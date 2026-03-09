// YouTube RSS Reader

const YT_CHANNEL_ID = "UCUcXH4QwZmM4kRj0v3MVKbg"; // tuo ID YT

fetch(`https://api.allorigins.win/raw?url=https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`)
  .then(res => res.text())
  .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => {
    const entries = data.querySelectorAll("entry");
    if(entries.length > 0){
      const latest = entries[0];
      const videoId = latest.querySelector("yt\\:videoId").textContent;

      // embed ultimo video
      document.getElementById("yt-latest-iframe").src = `https://www.youtube.com/embed/${videoId}`;

      // SHORTS — prende primo video con short nel titolo o nei tag (approccio semplice)
      let shortEntry = null;
      entries.forEach(e => {
        const title = e.querySelector("title").textContent.toLowerCase();
        if(title.includes("short")) {
          shortEntry = e;
        }
      });
      const shortsId = shortEntry ? shortEntry.querySelector("yt\\:videoId").textContent : videoId;
      document.getElementById("yt-shorts-iframe").src = `https://www.youtube.com/embed/${shortsId}`;
    }
  })
  .catch(err => console.error("YT RSS error:", err));

  // TikTok ultimo video automatico (richiede endpoint serverless)
// Sostituisci URL_SERVERLESS con il tuo endpoint che restituisce { "videoId": "..." }
fetch('URL_SERVERLESS')
.then(res=>res.json())
.then(data=>{
  const tiktokId = data.videoId;
  document.getElementById("tiktok-iframe").src = `https://www.tiktok.com/embed/${tiktokId}`;
})
.catch(err=>console.error("TikTok fetch error:",err));

// particelle (tuo script)
const canvas=document.getElementById('particles');
const ctx=canvas.getContext('2d');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

class Particle{
constructor(){
this.x=Math.random()*canvas.width;
this.y=Math.random()*canvas.height;
this.size=Math.random()*3+1;
this.speedX=Math.random()*1-0.5;
this.speedY=Math.random()*1-0.5;
}

update(){
this.x+=this.speedX;
this.y+=this.speedY;

if(this.x<0||this.x>canvas.width)this.speedX*=-1;
if(this.y<0||this.y>canvas.height)this.speedY*=-1;
}

draw(){
ctx.fillStyle='rgba(255,42,42,0.7)';
ctx.beginPath();
ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
ctx.fill();
}
}

function init(){
particles=[];
for(let i=0;i<100;i++){
particles.push(new Particle());
}
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);
particles.forEach(p=>{
p.update();
p.draw();
});
requestAnimationFrame(animate);
}

init();
animate();