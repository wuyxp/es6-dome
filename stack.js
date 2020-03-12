/**
 * 
 * 使用JavaScript实现栈的下列操作
a)push(x) --元素x入栈
b)pop() --移除栈顶元素
c)top() --获取栈顶元素
d)empty() --返回栈是否为空
 */

 class Stack {
     constructor () {
        this.stack = []
     }
     push(obj) {
        this.stack.unshift(obj)
     }
     pop() {
        if (!this.empty()) {
            return this.stack.shift()
        } else {
            console.log('数据已空')
        }
     }
     top () {
        if (!this.empty()) {
            return this.stack[0]
        } else {
            console.log('数据已空')
        }
     }
     empty () {
        return this.stack.length === 0
     }
 }

 const stack = new Stack()
 stack.push({a: 1})
 stack.push(2)
 console.log(stack.top()) // 2
 stack.pop()
 console.log(stack.top()) // {a: 1}
 
 console.log(stack.empty()) // false
 stack.pop()
 console.log(stack.empty()) // true