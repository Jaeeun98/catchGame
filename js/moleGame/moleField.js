
export default class MoleField {
    constructor(moleNum, bugNum){
        this.ul = document.getElementsByTagName('ul')[0];
        this.moleNum = moleNum;
        this.bugNum = bugNum;
    }

    init(){
        this.addItem('mole', this.moleNum);
        this.addItem('bug', this.bugNum);
    }

    addItem(item, num){
        for(let i=1; i<=num; i++){
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = `../img/${item}.png`;
            img.alt = item;

            this.ul.appendChild(li);
            li.appendChild(img);
        }
        item === 'bug' && this.fieldSeting();
    }

    fieldSeting(){
        const li = document.getElementsByTagName('li');

        for(let i=0; i<li.length; i++){
            const randomX = Math.floor(Math.random() * 950);
            const randomY = Math.floor(Math.random() * 200);
    
            li[i].style.transform = `translate(${randomX}px, ${randomY}px)`;
            li[i].style.zIndex = '0';
        } 
    }
}