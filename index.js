const btnjump = document.querySelector(".btn");
const mush =document.querySelector(".mush");
const mushimg =document.querySelector(".img-mush");
//پرش قارچ
btnjump.addEventListener("click", ()=>{
    mush.classList.remove("jump");
    void mush.offsetWidth;
    mush.classList.add("jump")
})
document.addEventListener("keydown", (e)=>{
    if (e.code !== "Space") return
    mush.classList.remove("jump");
    void mush.offsetWidth;
    mush.classList.add("jump")
})
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
    const mushRect = mushimg.getBoundingClientRect();
    const zRect = zombieEl.getBoundingClientRect();

    const offset = 15; // فاصله امن تا برخورد واقعی

    return (
        zRect.right - offset > mushRect.left + offset &&
        zRect.left + offset < mushRect.right - offset &&
        zRect.bottom - offset > mushRect.top + offset &&
        zRect.top + offset < mushRect.bottom - offset
    );
}
//پایان بازی
function gameOver(){
    clearInterval(gameloop);
    alert("done")
    location.reload()
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
        if (z.pos > window.innerWidth) z.pos = -150;

        // چک برخورد
        if (checkcollision(z.el) && !mush.classList.contains("jump")) {
            gameOver();}
        });
    },50
);