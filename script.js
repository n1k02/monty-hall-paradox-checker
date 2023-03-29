// TODO: check the 3 doors paradox (change the choice after opening an empty door)

//-------check Random method probability
{
    let length = 100000
        sum = 0;
    for (let i = 0; i < length; i++) sum += Math.random()
    // console.log(sum / length) // avg: 0.4999...
}

const getRandom = (max) => {
    return Math.floor(Math.random() * max)
}

//-------get array with 2 params [where is the target (0-2), what we have selected (0-2)]
let arr = []
    length = 1000000
    sum = 0
    changedArr = [];
for (let i = 0; i < length; i++) {
    let target = getRandom(3)
    let selected = getRandom(3)
    arr.push([target, selected]) // avg of win - 0.3333...
    let opened;
    let rooms = [0,1,2]
    rooms = rooms.filter(num => num !== target && num !== selected)
    if(rooms.length > 1) {
        opened = rooms[getRandom(2)]
    } else {
        opened = rooms[0]
    }
    changedArr.push([target, 3-(selected + opened)])
}
changedArr.forEach(event => {
    if(event[0] === event[1]) {
        sum += 1;
    }
})
console.log(`Cases: ${length}`)
const probability = (sum / changedArr.length) * 100
console.log(`Probability: ${probability}%`) //avg: 66.7%


