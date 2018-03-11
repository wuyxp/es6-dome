class Countdown {
    constructor(n){
        this.n = n
    }
    * [Symbol.iterator](){
        while(this.n >= 0){
            yield this.n--;
        }
    }
}
let cnt = new Countdown(10);
let arr = [...cnt];
console.log(arr);
