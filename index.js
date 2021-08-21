const item = document.querySelector('.item');
const list = document.querySelectorAll('.item')[0].children
const meat = document.querySelectorAll('.meat');
const startBtn = document.querySelector('.start');
const stop = document.querySelector('.stop');

console.log(item);
window.onload = function(){
    for(let i=0; i<list.length; i++){
        const random = Math.floor(Math.random() * 950);
        list[i].style.transform = `translateX(${random}px)`;
    }
}

function startPositionY(){
    let i=0;
    const moveAnimate = setInterval(() => {
        const rect = list[i].getBoundingClientRect().left;
        const x = rect - 130;

        list[i].style.zIndex = 0;
        list[i].animate([
            { transform :`translate(${x}px, 500px)`}
        ], {
            duration:4000,
            iterations:Infinity,
        })
        
        i++;
        i == 21 && clearInterval(moveAnimate)
    }, 1000)
}

startBtn.addEventListener('click', startPositionY);

