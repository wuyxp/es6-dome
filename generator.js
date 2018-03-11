function getSyncCall(delay, cb){
    var num = Math.random();
    setTimeout(cb.bind(null,num),delay);
}
/*
getSyncCall(2000, function(a){
    getSyncCall(1000, function(b){
        console.log('a---->',a);
        console.log('b---->',b);
        console.log('a+b ------>',a+b);
    }); 
});

*/


function getNum(delay){
    getSyncCall(delay,function(num){
        it.next(num);
    });
}

function *main(){
    var a = yield getNum(3000);
    console.log('new-a----->',a);
    var b = yield getNum(2000);
    console.log('new-b----->',b);
}

var it = main();
it.next();
