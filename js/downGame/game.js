

class Game {
    constructor(){
        this.score = 0;
    }

    setPositionX(){
        for(let i=0; i<list.length; i++){
            const random = Math.floor(Math.random() * 950);
            list[i].style.transform = `translateX(${random}px)`;
        }
    }

    foodMove(){
        let i = 0;

        const moveAnimate = setInterval(() => {
            const sectionX = document.querySelector('section').getBoundingClientRect().left;
            const listX = list[i].getBoundingClientRect().left;
            const x = listX - sectionX;
    
            
            list[i].animate([{ 
                transform :`translate(${x}px, 400px)`  
            }], {
                duration:4000,
                iterations:Infinity,
            })

            i == list.length && clearInterval(moveAnimate);
        }, 1000)
    }

    scoring(e){
        if(e.className === 'meat'){
            gameStop();
            
        } else {
            if(e.className === 'noMeat'){
                score += 4;
            } else {
                score++;
            } 
            scoreNum.innerText = score;
        }
    }

    catchFood(e){
        e.style.zIndex = -1;
        e.getAnimations()[0].cancel();

        this.scoring(e);
        this.foodMove
    }

    start(){
        
    }
}