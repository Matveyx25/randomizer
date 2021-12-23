let namesArr = []

let colSplit = (input, size) => {
    for (var x, i = 0, c = -1, l = input.length, n = []; i < l; i++) {
        (x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
    }
    return n;
}

const getNames = () => {
    let area = document.getElementById('area')
    let nameInArr,
        name,
        arr

    arr = area.value.split(/[\s.]+/);
    arr.forEach(el => {
        if (el.split('').includes(':')) {
            nameInArr = el.split('')
            name = nameInArr.pop()
            namesArr.push(nameInArr.join(''))
        }
    })
    area.value = namesArr
    document.querySelector('.count-value').innerHTML = namesArr.length
}

document.getElementById('area').addEventListener('input', () => {
    if(!document.getElementById('area').value){
        namesArr = []
    }
})

const generateTeam = () => {
    let countInput = document.getElementById('countTeam')
    let out = document.querySelector('.out')
    let countTeam = Math.floor(namesArr.length / +countInput.value)
    namesArr.sort(() => Math.random() - 0.5)
    let newArr = colSplit(namesArr , countTeam)
    for(let i = 0; i < newArr.length; i++) {
        newArr[i] = newArr[i].join(', ')
    }
    if(newArr.length%2 != 0) {
        const ln = newArr.length
        newArr[ln - 1] = newArr[ln - 1] + ', '
        newArr[ln - 2] = newArr[ln - 1].concat(newArr[ln - 2])
        newArr.pop()
        // newArr[ln - 1].join(', ')
    }

    out.innerHTML = newArr.join(" | ")
}

const copy = () => {
    var copyText = document.querySelector('.out')
    navigator.clipboard.writeText(copyText.innerHTML);
}

