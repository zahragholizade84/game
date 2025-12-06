const btnjump = document.querySelector(".btn");
const mush =document.querySelector(".mush");
const mushimg =document.querySelector(".img-mush");
const zum = document.getElementById("zum");
const zombia = document.querySelector(".zombia");
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
function checkcollision(){
   
    const mushRect =
    mushimg.getBoundingClientRect();
    const  zumRect =  
   zum.getBoundingClientRect();
   const offest = 30;//مقدار دلخواه
    return (
        zumRect.right - offest > mushRect.left + offest &&
        zumRect.left + offest < mushRect.right - offest &&
        zumRect.bottom - offest > mushRect.top + offest &&
        zumRect.top + offest<  mushRect.bottom - offest
    ) ;
}

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



let frame2 = 1;
let pos2 = 1;

let gameLoop2 =
setInterval(()=>{
 frame2 ++;
 if(frame2>10) frame2=1;
 zum.src =
 `walk2/go_${frame2}.png`;
 pos2 += 5;
 zombia.style.transform = `translate(${pos2}px)`;
 if(pos>window.innerWidth) pos2 =-150;

 if (checkcollision() && ! 
mush.classList.contains("jump")){
    gameOver();
}
},50)