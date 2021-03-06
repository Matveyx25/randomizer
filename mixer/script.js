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

const generateTeam = () => {
    let countInput = document.getElementById('countTeam')
    let out = document.querySelector('.out')
    let countTeam = Math.ceil(namesArr.length / +countInput.value)
    namesArr.sort(() => Math.random() - 0.5)
    let newArr = colSplit(namesArr , countTeam)
    for(let i = 0; i < newArr.length; i++) {
        newArr[i] = newArr[i].join(', ')
    }
    out.innerHTML = newArr.join(" | ")
}