
const list = document.querySelectorAll('.item')[0].children
const meat = document.querySelectorAll('.meat');
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
let startEnd = '';

function setPositionX(){
    for(let i=0; i<list.length; i++){
        const random = Math.floor(Math.random() * 950);
        list[i].style.transform = `translateX(${random}px)`;
    }
}

function gameStart(){
    setPositionX();

    let i=0;
    const moveAnimate = setInterval(() => {
        const sectionX = document.querySelector('section').getBoundingClientRect().left;
        const listX = list[i].getBoundingClientRect().left;
        const x = listX - sectionX;

        //animate 부여
        list[i].animate([
            { transform :`translate(${x}px, 500px)`}
        ], {
            duration:4000,
            iterations:Infinity,
        })
        
        //gameStop이면, animation 제거 
        if(startEnd === 'stop'){
            list[i].getAnimations()[0].cancel();
            i = list.length;

            startEnd = 'start';
        } else {
            list[i].style.zIndex = 0;
            i++;
        }
        
        i == list.length && clearInterval(moveAnimate);
    }, 1000)
}

function gameStop(){
    for(let i=0; i < list.length; i++){
        const getAni = list[i].getAnimations();
        getAni.length != 0 && getAni[0].cancel();
        list[i].style.zIndex = -1;
    }

   startEnd = 'stop'
}




startBtn.addEventListener('click', gameStart);
stopBtn.addEventListener('click', gameStop)
