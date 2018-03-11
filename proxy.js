console.log('proxy...')
const initalState = function(){};
const h = {
    get: function(){
        return 123
    },
    apply: function(target, thisArg, arg){
        return (function(){
            let cacheHandle = [];
            return {
                add: function(num){
                    cacheHandle.push(function(result){return result+num})
                    return this;
                },
                multip: function(num){
                    cacheHandle.push(function(result){return result*num})
                    return this;
                },
                get: function(){
                    return cacheHandle.reduce(function(result, fun){return fun(result)},arg[0])
                }
            }
        }())
    }
}

const proxy = new Proxy(initalState,h);
console.log(proxy.abc)
console.log(proxy(3).add(2).multip(3).get());
