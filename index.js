const btnjump = document.querySelector(".btn");
const mush =document.querySelector(".mush");
const mushimg =document.querySelector(".img-mush");
//اضافه کردن امتیاز
let score = 0;
const scorecontainer =document.createElement("div");
scorecontainer.classList.add("score");
document.body.prepend(scorecontainer);
function upditescor(){
    scorecontainer.textContent= `score:${score}`;
}
upditescor();
const audio = document.getElementById("myAudio");

function playAudio() {
  audio.play();
  
}

function pauseAudio() {
  audio.pause();
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0; // بازگرداندن به ابتدای آهنگ
}
//پرش قارچ

let isJumping = false; // وضعیت پرش

btnjump.addEventListener("click", () => {
    if(!isJumping){
        mush.classList.add("jump");
        isJumping = true;
    }
});

document.addEventListener("keydown", (e) => {
    if(e.code !== "Space") return;
    if(!isJumping){
        mush.classList.add("jump");
        isJumping = true;
    }
});

mush.addEventListener("animationend", () => {
    mush.classList.remove("jump");
    isJumping = false;
});
//ارایه نگه دارنده زامبی 
const zombies =[];

//ساخت تابع زامبی
function createZombie() {
    const zombie = document.createElement("div");
    zombie.classList.add("zombia");

    const img = document.createElement("img");
    img.src = "walk/go_1.png";
    img.classList.add("zum");

    zombie.appendChild(img);
    document.body.appendChild(zombie);

    return {
        el: zombie,
        img: img,
        frame: 1,
        pos: -150
    };
}
//اضافه شذن زامبی هر چند ثانیه
let speed= 5;
function spawnzombia() {
    zombies.push(createZombie());
}
setInterval(()=> {
    spawnzombia();
    speed++;
},8000);


// ===========================
// چک برخورد دقیق
// ===========================
function checkcollision(zombieEl) {
    const mushRect = mush.getBoundingClientRect();
    const zRect = zombieEl.getBoundingClientRect();

    const offset = 20; // فاصله امن تا برخورد واقعی

    return (
        zRect.right - offset > mushRect.left + offset &&
        zRect.left + offset< mushRect.right - offset &&
        zRect.bottom - offset > mushRect.top + offset &&
        zRect.top + offset < mushRect.bottom - offset
    );
}
//پایان بازی
function gameOver(){
    clearInterval(gameloop);
    const sound3 = document.querySelector(".suondgameover");
    sound3.play();

    const gameOverDiv = document.getElementById("game-over");
    gameOverDiv.classList.add("show");

    // دکمه ریست
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.addEventListener("click", () => {
        location.reload(); // یا می‌تونی یک تابع resetGame بسازی
    });
}
//حلقه بازی اصلی
let gameloop =setInterval(
    () =>{
        zombies.forEach(z =>{
            z.frame++;
            if (z.frame>10) z.frame =1;
            z.img.src =`walk/go_${z.frame}.png`
            z.pos +=speed;
            z.el.style.transform =`
            translateX(${z.pos}px)`;
        if (z.pos > window.innerWidth){
            score++ ;
            upditescor();
             z.pos = -150;
        }
        // چک برخورد
        if (checkcollision(z.el) && !mush.classList.contains("jump")) {
            gameOver();}
        });
    },50
);