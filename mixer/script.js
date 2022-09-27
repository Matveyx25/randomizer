let namesArr = []

const generateTeams = (players, numTeams) => {
    var tempArray = [];
    tempArray = players.slice();

    var arrayLength = tempArray.length;
    var playerPerTeam = 
    Math.floor(tempArray.length/numTeams);
    var results = [];
    while (results.length < numTeams ){
       results.push(tempArray.splice(0, playerPerTeam));
    }
    if(tempArray.length){
    results[results.length-1]=[...results[results.length-1],...tempArray]
    }
    return results;
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

    out.innerHTML = newArr.join(" | ")
}

const copy = () => {
    var copyText = document.querySelector('.out')
    navigator.clipboard.writeText(copyText.innerHTML);
}

