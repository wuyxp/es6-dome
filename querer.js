/**
 * 使用JavaScript实现栈实现队列的操作
f)push(x) 将一个元素放入队列的尾部
g)pop() 从队列首部移除元素
h)peek() 返回队列首部的元素
i)empty() 返回队列是否为空
 */

class Querer {
    constructor () {
       this.querer = []
    }
    push(obj) {
       this.querer.push(obj)
    }
    pop() {
       if (!this.empty()) {
           return this.querer.shift()
       } else {
           console.log('数据已空')
       }
    }
    peek () {
       if (!this.empty()) {
           return this.querer[0]
       } else {
           console.log('数据已空')
       }
    }
    empty () {
       return this.querer.length === 0
    }
}

const querer = new Querer()
querer.push({a: 1})
querer.push(2)
console.log(querer.peek()) // {a: 1}
querer.pop()
console.log(querer.peek()) // 2

console.log(querer.empty()) // false
querer.pop()
console.log(querer.empty()) // true