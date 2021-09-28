import Game from "../game.js";

export default class Down {
    constructor(){
        this.item = document.querySelector('.item');
        this.li = document.querySelectorAll('.item')[0].children;
        this.scoreNum = document.querySelector('.score');
        this.modal = document.querySelector('.modal');
        this.resultBtn = document.querySelector('.resultplay');
        this.item.addEventListener('click', e => e.target.tagName == 'IMG' && this.catchFood(e))
        this.score;
        this.startEnd;
        this.mes;

        this.game = new Game();
    }

    setPositionX(){
        for(let i=0; i<this.li.length; i++){
            const random = Math.floor(Math.random() * 950);
            this.li[i].style.transform = `translateX(${random}px)`;
        }
    }

    foodMove(){
        let i = 0;
        const moveAnimate = setInterval(() => {
            const sectionX = document.querySelector('section').getBoundingClientRect().left;
            const listX = this.li[i].getBoundingClientRect().left;
            const x = listX - sectionX;

            const ani = this.li[i].animate([
                { transform: `translate(${x}px, 400px)` }
            ], {
                duration: this.mes,
            })

            if (this.startEnd === 'stop') {
                this.li[i].getAnimations()[0].cancel();
                i = this.li.length;

                this.startEnd = 'start';
            } else {
                this.li[i].style.zIndex = 0;
                i++;
            }

            ani.addEventListener('finish', e => {
                const target = e.target.effect.target;
                target.className != 'meat' && target.className != 'noMeat' ? this.end() : target.style.zIndex = -1
            })
            i == this.li.length && clearInterval(moveAnimate);
        }, 500)

        this.mes -= 500;
    }

    reset(){
        this.score = 0;
        this.scoreNum.innerText = 0;
        this.startEnd = '';
        this.mes = 3000;
    }

    catchFood(e){
        const list = e.target.parentElement;
    
        list.style.zIndex = -1;
        list.getAnimations()[0].cancel();
        list.className === 'meat' ? this.end() : this.scoring(e);
    }

    scoring(e){
        e.target.alt === 'noMeat' ? this.score += 5 : this.score++
        this.scoreNum.innerText = this.score;
    
        (e.target.alt ==='tomato' && this.score%5 == 0) && this.end('win');
        this.game.soundPlay('catch');
    }

    end(result){
        this.startEnd = 'stop';
        //남은 animation 삭제
        for(let i=0; i < this.li.length; i++){
            this.li[i].style.zIndex = -1;
            this.li[i].getAnimations()[0] && this.li[i].getAnimations()[0].cancel();
        }
        
        if(result === 'win'){
            this.popup('🥇', 'WIN', 'NEXT')
            this.game.soundPlay('gameClear')
        } else {
            this.popup('🏅', 'LOSER', 'REPLAY');
            this.game.soundPlay('gameOver');
        }
    }

    popup(icon, text, btn){
        if(!icon){
            this.modal.style.display = 'none';
        } else {
            const resultIcon = document.querySelector('.resultIcon');
            const resultText = document.querySelector('.resultWin');
            const resultScore = document.querySelector('.resultScore');
        
            this.modal.style.display = 'block';
            resultIcon.innerText = icon
            resultText.innerText = `YOU ${text}`;
            resultScore.innerText = this.score;
            this.resultBtn.innerText = btn; 
        }
    }

}