const data = [
{
    id: 'food',
    parent:null
},{
    id: 'hongfushi',
    parent: 'apple'
},{
    id: 'fruits',
    parent: 'food'
},{
    id: 'apple',
    parent: 'fruits'
},{
    id: 'banana',
    parent: 'fruits'
},{
    id: 'orange',
    parent: 'fruits'
},{
    id: 'vegetables',
    parent: 'food'
},{
    id: 'tomato',
    parent: 'vegetables'
},{
    id: 'egg',
    parent: 'vegetables'
}
];
console.log(data);
const makeTree = (arr,parent) => {
    let node = {}
    arr
    .filter(item => item.parent === parent)
    .forEach( c => {
        node[c.id] = makeTree(data,c.id)
            } )
    return node
}
console.log(JSON.stringify(makeTree(data,null),null,2));
