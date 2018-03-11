/**
 *顺序求治
 *@param { number } 传入正整数
 *@param { getArr } 获取返回的数组对象
 */
class Countdown {
    constructor (n) {
        this.n = n;
        this.arr = [];
    }
    toArr () {
        while(this.n >= 0) {
            this.arr.push(this.n--);
        }
    }
    getArr () {
        this.toArr();
        return this.arr;
    }
}
let cnt = new Countdown(10);

console.log(cnt);
