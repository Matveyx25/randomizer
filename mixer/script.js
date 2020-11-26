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
}

const generateTeam = () => {
    let countInput = document.getElementById('countTeam')
    let out = document.querySelector('.out')
    let countTeam = Math.ceil(namesArr.length / +countInput.value)
    let newArr = colSplit(namesArr , countTeam)
    out.innerHTML = newArr.join(" | ")
}