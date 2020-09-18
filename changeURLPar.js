function changeURLPar(destiny, par, parValue) {
    let pattern = par + '=([^&]*)'
    let replaceText = par + '=' + parValue
    let patt1 = new RegExp(pattern)

    if (destiny.match(patt1)) {
        let tmp = destiny.replace(patt1, replaceText)
        return (tmp)
    } else {
        if (destiny.match('[?]')) {
        return destiny + '&' + replaceText
        } else {
        return destiny + '?' + replaceText
        }
    }
}
const st1 = "https://www.baidu.com/"
const st2 = "https://www.baidu.com/?abc=1"
const st3 = "https://www.baidu.com/?abc=1&edf=2"
const st4 = "https://www.baidu.com/?abc=&edf=2"
console.log(changeURLPar(st1, 'abc', '5555'))
console.log(changeURLPar(st2, 'abc', '5555'))
console.log(changeURLPar(st3, 'abc', '5555'))
console.log(changeURLPar(st4, 'abc', '5555'))
function updateLocationUrl(key, value) {
    let newUrl = changeURLPar(window.location.href, key, value)
    history.replaceState(null, null, newUrl)
}