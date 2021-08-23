const item = document.querySelector('.item');
const list = document.querySelectorAll('.item')[0].children
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const scoreNum = document.querySelector('.score');
let startEnd = '';
let score = 0;

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
   scoreNum.innerText = 0;
}

function catchFood(e){
    e.style.zIndex = -1;
    e.getAnimations()[0].cancel();
    
    console.log(e);
    

    setTimeout(() => {
        const sectionX = document.querySelector('section').getBoundingClientRect().left;
        const listX = e.getBoundingClientRect().left;
        const x = listX - sectionX;

        e.style.zIndex = 1;
        e.animate([
            { transform :`translate(${x}px, 500px)`}
        ], {
            duration:4000,
            iterations:Infinity,
        })
    }, 3000)
    
}

function scoring(e){
    const li = e.target.parentElement;
    
    if(li.className === 'meat'){
        gameStop();
        
    } else {
        score++;
        scoreNum.innerText = score;
        catchFood(li);
    }
}


startBtn.addEventListener('click', gameStart);
stopBtn.addEventListener('click', gameStop)
item.addEventListener('click', e => scoring(e))
