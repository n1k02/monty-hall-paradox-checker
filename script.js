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

function getPercentIfKeep(cases) {
    let arr = []
    sum = 0
    for (let i = 0; i < cases; i++) {
        let target = getRandom(3)
        let selected = getRandom(3)
        if(target === selected) {
            sum += 1;
        }
    }
    console.log(`Cases: ${cases}`)
    const probability = (sum / cases)
    console.log(`Probability: ${probability*100}%`) //avg: 33.3%
    return probability;
}

function getPercentIfChange (cases) {
    let arr = []
    sum = 0
    changedArr = [];
    for (let i = 0; i < cases; i++) {
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
    console.log(`Cases: ${cases}`)
    const probability = (sum / changedArr.length)
    console.log(`Probability: ${probability*100}%`) //avg: 66.7%
    return probability;
}

const btn = document.querySelector('button')
const checkbox = document.querySelector('input[type="checkbox"]')
const diagram = document.querySelector('.diagram')
const percentWin = document.querySelector('.percents__win')
const percentLose = document.querySelector('.percents__lose')
btn.addEventListener('click', ()=> {
    const cases = Number(document.querySelector('input.cases').value)
    let percent;
    if(checkbox.checked) {
        percent = getPercentIfKeep(cases)
    } else {
        percent = getPercentIfChange(cases)
    }
    console.log(percent)
    if (percent <= 0.5) {
        diagram.classList.remove('win')
        document.documentElement.style.setProperty('--angle', `${0.5-percent}turn`)
    } else {
        if(!diagram.classList.contains('win')) {
            diagram.classList.add('win')
        }
        document.documentElement.style.setProperty('--angle', `${1-percent}turn`)
    }
    percentWin.innerHTML = `${Math.floor(percent*100)}%`
    percentLose.innerHTML = `${Math.floor(100-(percent*100))}%`
})