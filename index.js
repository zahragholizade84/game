const btnjump = document.querySelector(".btn");
const mush =document.querySelector(".mush");
const mushimg =document.querySelector(".img-mush");

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

function gameOver(){
    clearInterval(gameLoop);
    alert("done");
}


let frame = 1;
let pos = 1;

let gameLoop =
setInterval(()=>{
 frame ++;
 if(frame>10) frame=1;
 zum.src =
 `walk/go_${frame}.png`;
 pos += 5;
 zombia.style.transform = `translate(${pos}px)`;
 if(pos>window.innerWidth) pos =-150;

 if (checkcollision() && ! 
mush.classList.contains("jump")){
    gameOver();
}
},50)



