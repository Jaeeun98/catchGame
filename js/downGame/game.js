

class Game {
    setPositionX(){
        for(let i=0; i<list.length; i++){
            const random = Math.floor(Math.random() * 950);
            list[i].style.transform = `translateX(${random}px)`;
        }
    }

    foodAnimate(){
        let i = 0;
        const moveAnimate = setInterval(() => {
            const sectionX = document.querySelector('section').getBoundingClientRect().left;
            const listX = list[i].getBoundingClientRect().left;
            const x = listX - sectionX;

            const ani = list[i].animate([
                { transform: `translate(${x}px, 400px)` }
            ], {
                duration: 4000,
            })

            if(startEnd === 'stop') {
                list[i].getAnimations()[0].cancel();
                i = list.length;

                startEnd = 'start';
            } else {
                list[i].style.zIndex = 0;
                i++;
            }

            i == list.length && clearInterval(moveAnimate);

            ani.addEventListener('finish', function (e) {
                const target = e.target.effect.target;
                target.className != 'meat' ? gameOver() : target.style.zIndex = -1
            })
        }, 1000)
    }

    gameOver(){

    }


}



/*
 constructor(){
        this.score = 0;
    }

    animateReset(){
        for(let i=0; i<list.length; i++){
            const getAni = list[i].getAnimations();
            getAni.length != 0 && getAni[0].cancel();
    
            list[i].style.transform = `translate(${0}px, ${0}px)`;
        }
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

    catchFood(e){
        e.style.zIndex = -1;
        e.getAnimations()[0].cancel();

        if(e.className === 'meat'){
            gameStop();
        } else {
            this.scoring(e);
            this.foodMove
        }
    }

    scoring(e){
        e.className === 'noMeat' ? score += 4 : score++
        scoreNum.innerText = score;
    }


*/