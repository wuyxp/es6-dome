const arr1 = [
    {
        id: '1501127845757504842',
        pid: '3833645159518211383',
        name: '灰灰灰a1children'
    },
    {
        id: '3833645159518211383',
        pid: '0000012312312312300001231',
        name: '灰灰灰a1'
    },
    {
        id: '4530177129885774855',
        pid: '3833645159518211355',
        name: 'bbbchildren22'
    },
    {
        id: '1501127845757504844',
        pid: '3833645159518211355',
        name: 'bbba1children'
    },
    {
        id: '3833645159518211355',
        pid: '0000012312312312300001231',
        name: 'bbba1'
    },
    {
        id: '4530177129885774899',
        pid: '4530177129885774855',
        name: 'bbbba1children22'
    },
    {
        id: '0000012312312312300001231',
        pid: '0',
        name: '0000000'
    },
]

var arr2 = [
    {"name":"test_1_1_1","pid":"4393645508945265426","id":"508485532630769112","sort":1},
    {"name":"b3","pid":"4031788484998257261","id":"1243695279754478655","sort":1},
    {"name":"a2","pid":"3833645159518211383","id":"1501127845757504842","sort":2},
    {"name":"test001","pid":"1","id":"1742610580924599789","sort":1},
    {"name":"a9","pid":"1501127845757504842","id":"1801622736154028874","sort":1},
    {"name":"test3","pid":"12345654321","id":"1903155125057110542","sort":1},
    {"name":"wer","pid":"1801622736154028874","id":"2640377577335262816","sort":1},
    {"name":"南京测试","pid":"111111","id":"3568039479989663885","sort":1},
    {"name":"a1","pid":"0","id":"3833645159518211383","sort":0},
    {"name":"b5","pid":"3833645159518211383","id":"4031788484998257261","sort":1},
    {"name":"test_1_1","pid":"12138002","id":"4393645508945265426","sort":1},
    {"name":"111","pid":"508485532630769112","id":"5711133174828786084","sort":1},
    {"name":"we","pid":"1501127845757504842","id":"6597711757744343277","sort":3},
    {"name":"b4","pid":"1501127845757504842","id":"6850280004839113594","sort":2},
    {"name":"2222","pid":"5711133174828786084","id":"7725214833595403294","sort":1},
    {"name":"test4","pid":"32345654321","id":"8090646261121890667","sort":1},
    {"name":"b2","pid":"4031788484998257261","id":"8315238998464016789","sort":2},
    {"name":"b1","pid":"4031788484998257261","id":"9168257760557584471","sort":3}
]

const generatorDeepArray = (arr) => {
    let oldArr = JSON.parse(JSON.stringify(arr)) // 这里需要一个深度克隆，暂时先用这个方法
    oldArr = oldArr.map(item => ({ ...item, chilren: [] })) // 这里统一价chilren属性，下面就不用进行判断了
    let index = 0 // 定义循环数组的索引
    let length = oldArr.length // 如果循环两遍的长度不变，那么就说明，没有可以关联的数据了，直接返回就好了
    let result = oldArr.shift() // 定义返回的对象数组
    let pidMap = {
        [result.pid]: result
    }   // 用来缓存所做加入result的pid Map数据
    let idMap = {
        [result.id]: result
    }   // 用来缓存所做加入result的id Map数据
    while( oldArr.length ) {
        const current = oldArr[index]
        // 如果当前对象的id或者pid在map中有对应上的，那么这个数据就被锁定了
        if (pidMap[current.id] || idMap[current.pid]) {
            // 源数组删除，然后分别进行缓存了
            oldArr.splice(index, 1)
            pidMap[current.pid] = current
            idMap[current.id] = current

            if(pidMap[current.id]) {
                // 如果pid缓存了当前数组的id值，那么说明，当前的数据是pid这个对象的父级          
                current.chilren.push(pidMap[current.id])
                // 如果这里需要这个节点是最顶部的节点的父级，那么更新父节点
                if (result.pid === current.id) {
                    result = current
                }
            } else if (idMap[current.pid]) {
                // 如果id缓存了当前数组的id值，那么说明，当前的数据是pid这个对象的子级
                idMap[current.pid].chilren.push(current)
            }
        }
        // 如果index超过当前数组长度，那么从头循环
        if(index >= oldArr.length - 1) {
            index = 0
            if(length === oldArr.length) {
                return {
                    result,
                    oldArr
                }
            }
            length = oldArr.length
        } else {
            index++
        }
    }
    return {
        result,
        oldArr
    }
}

const deepArray = arr => {
    const resultArr = []
    let copyArr = JSON.parse(JSON.stringify(arr))
    while(copyArr.length > 0) {
        const { result, oldArr } = generatorDeepArray(copyArr)
        resultArr.push(result)
        copyArr = oldArr
    }
    return resultArr
}
const resultArr = deepArray(arr2)
// console.log(generatorDeepArray(arr1))
console.log(JSON.stringify(resultArr, null, 2))

// console.log(resultArr)

// 返回一个 tree 对象下，所有整合的 id
const getIdsForTree = arr => {
    // console.log(arr)
    return arr.map(item => {
        if (item.chilren && item.chilren.length > 0) {
            return [item.name, getIdsForTree(item.chilren)]
        } else {
            return [item.name]
        }
    })
}

// 在一个 tree 中，查询指定id，并返回该对象
const queryIdForTree = (id, arr) => {
    let temp;
    for(let i = 0; i< arr.length; i++) {
        if (arr[i].id === id) {
            return [arr[i]]
        } else {
            if (arr[i].chilren && arr[i].chilren.length > 0) {
                temp = queryIdForTree(id, arr[i].chilren)
                if (temp) {
                    return temp
                }
            }
        }
    }
}

// console.log(queryIdForTree('3833645159518211383', resultArr))
// console.log(queryIdForTree('1243695279754478655', resultArr))
// console.log(queryIdForTree('1801622736154028874', resultArr))
// console.log(queryIdForTree('1742610580924599789', resultArr))

console.log(getIdsForTree(queryIdForTree('3833645159518211383', resultArr)).flat(Infinity))
console.log(getIdsForTree(queryIdForTree('1243695279754478655', resultArr)).flat(Infinity))
console.log(getIdsForTree(queryIdForTree('1801622736154028874', resultArr)).flat(Infinity))
console.log(getIdsForTree(queryIdForTree('1742610580924599789', resultArr)).flat(Infinity))
