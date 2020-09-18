const obj = {
    3:[10],
    4:[14,46],
    5:[8,15,45,47],
    7:[9,21],
    8:[9,5],
    9:[7,8],
    10:[3,11,16,45],
    11:[10,14,20],
    14:[4,11,15,40],
    15:[5,14,45],
    16:[10,11,29,33,45],
    17:[22,23],
    18:[21,28,32,48],
    19:[20,40],
    20:[11,19,34],
    21:[7,18],
    22:[17,33],
    23:[17,28],
    28:[18,23,29],
    29:[16,28],
    32:[18,45],
    33:[16,22],
    34:[20],
    40:[14,19],
    45:[5,10,15,16,32],
    46:[4,47],
    47:[5,46],
    48:[18]
}

const generatorPoint = (point, history => {}) => {
    return {
        start: history.start || point,
        current: point,
        path: [...history.path, point]
    }
}

const bfs = (graph, [start, end]) => {

    // 0 初始化起点
    const startPoint = generatorPoint(start)

    // 1. 当前要遍历的路径
    let currentPath = graph[startPoint.current]

    // 2. 下次要遍历的路径
    let nextPath = []

    // 3. 已经遍历过的路径
    let alreadyPath = []

    // 4. 存储遍历的路径
    let pathPoint = []

    // 5. 当前的点
    let currentPoint = startPoint


    while(currentPath.length > 0 && currentPoint.current !== end) {
        for(let i = 0; i < currentPath.length; i++) {
            nextPath.push([...currentPath[i]])
        }
    }

}

console.log(bfs(obj, [3, 40])) // [3, 11, 14, 40]
