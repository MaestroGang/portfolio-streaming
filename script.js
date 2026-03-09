/* =========================
   YOUTUBE ULTIMO VIDEO
========================= */

fetch("data/youtube.json")
.then(res => res.json())
.then(data => {

const latestFrame = document.getElementById("yt-latest-iframe");

if(latestFrame && data.videoId){

latestFrame.src =
`https://www.youtube.com/embed/${data.videoId}`;

}

})
.catch(err => console.error("YouTube JSON error:", err));



/* =========================
   YOUTUBE SHORTS (fallback)
========================= */

fetch("https://corsproxy.io/?https://www.youtube.com/feeds/videos.xml?channel_id=UCUcXH4QwZmM4kRj0v3MVKbg")
.then(res => res.text())
.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
.then(data => {

const entries = data.querySelectorAll("entry");

let shortId = null;

entries.forEach(e => {

const title = e.querySelector("title").textContent.toLowerCase();

if(title.includes("short")){

shortId = e.querySelector("yt\\:videoId").textContent;

}

});

if(shortId){

const shortsFrame = document.getElementById("yt-shorts-iframe");

if(shortsFrame){

shortsFrame.src =
`https://www.youtube.com/embed/${shortId}`;

}

}

})
.catch(err => console.log("Shorts RSS fallback:", err));



/* =========================
   TIKTOK
========================= */

/*
TikTok automatico senza backend non funziona.
Per ora lasciamo spazio per embed manuale.
*/

function loadTikTok(videoId){

const frame = document.getElementById("tiktok-iframe");

if(frame){

frame.src =
`https://www.tiktok.com/embed/${videoId}`;

}

}



/* =========================
   PARTICLE BACKGROUND
========================= */

const canvas = document.getElementById("particles");

if(canvas){

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle{

constructor(){

this.x = Math.random() * canvas.width;
this.y = Math.random() * canvas.height;

this.size = Math.random() * 3 + 1;

this.speedX = Math.random() * 1 - 0.5;
this.speedY = Math.random() * 1 - 0.5;

}

update(){

this.x += this.speedX;
this.y += this.speedY;

if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;

if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;

}

draw(){

ctx.fillStyle = "rgba(255,42,42,0.7)";

ctx.beginPath();

ctx.arc(this.x,this.y,this.size,0,Math.PI*2);

ctx.fill();

}

}

function initParticles(){

particles = [];

for(let i = 0; i < 100; i++){

particles.push(new Particle());

}

}

function animateParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p => {

p.update();
p.draw();

});

requestAnimationFrame(animateParticles);

}

initParticles();
animateParticles();

window.addEventListener("resize", () => {

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

initParticles();

});

}