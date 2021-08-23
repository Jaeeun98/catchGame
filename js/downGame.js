
const list = document.querySelectorAll('.item')[0].children
const meat = document.querySelectorAll('.meat');
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');


window.onload = setPositionX;

function setPositionX(){
    for(let i=0; i<list.length; i++){
        const random = Math.floor(Math.random() * 950);
        list[i].style.transform = `translateX(${random}px)`;
    }
}

function gameStart(){
    let i=0;
    const moveAnimate = setInterval(() => {
        const sectionX = document.querySelector('section').getBoundingClientRect().left;
        const listX = list[i].getBoundingClientRect().left;
        const x = listX - sectionX;
        
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

function gameStop(){
    const getAni = list[0].getAnimations();
    console.log(getAni);
    getAni.pause();
    
}


startBtn.addEventListener('click', gameStart);
stopBtn.addEventListener('click', gameStop)
