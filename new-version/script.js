const wrapper = document.querySelector('.new-randomizer__forms-group')

let countBlocks = 1;

const addBlock = (event) => {
    event?.preventDefault
    const newForm = `<div class="form-wrapper" id="form${countBlocks + 1}">\
                        <div class="input-with-delete">\
                            <input type="text" id="name-input" placeholder="name"/>\
                            <a href="#" class="trash" onclick="remove(this)">\
                                <img src="./trash.svg" alt="">\
                            </a>\
                        </div>\
                        <textarea placeholder="some text" id="message-area"></textarea>\
                    </div>`
    wrapper.insertAdjacentHTML('beforeend', newForm)
    countBlocks++
}

const remove = (el) => {
    el.parentElement.parentElement.remove()
}

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


const generateTeam = () => {
    const allFromGroups = document.querySelectorAll('.form-wrapper')
    const members = []

    for (var group of allFromGroups) {
        const name = group.querySelector('#name-input').value
        const message = group.querySelector('#message-area').value
        if(name && message) members.push(name + ':</br>' + message + '</br>')
    }

    members.sort(() => Math.random() - 0.5)
    let newArr = generateTeams(members, Math.floor(members.length/2))
    const ln = newArr.length

    for(let i = 0; i < ln; i++) {
        newArr[i] = newArr[i].join('')
    }
    const text = newArr.join("------------------</br>")
    if(text){
        document.querySelector('.modal > .modal-body > .text-area').innerHTML = text
    }
    document.querySelector('.modal').classList.add('active')
}

const closeModal = (el) => {
    el.parentElement.parentElement.classList.remove('active')
}

const copy = () => {
    var copyText = document.querySelector('.modal-clipboard > .modal-body > .text-area')
    let text = copyText.innerHTML.replace(/<br\s*[\/]?>/gi, "\n");
    navigator.clipboard.writeText(text).then(() => {
        const range = document.createRange();
        range.selectNode(copyText);

        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        document.querySelector('.modal-clipboard > .modal-body > .popup').classList.add('active')
        setTimeout(() => {
            document.querySelector('.modal-clipboard > .modal-body > .popup').classList.remove('active')
        }, 4000)
    });
}

const openModal = () => {
    document.querySelector('.modal-fill').classList.add('active')
}

const fillAreas = () => {
    let namesArr = []
    let messagesArr = []

    const value = document.getElementById('fill-area').value
    if(value){
        let nameInArr,
            name,
            arr,
            message = '',
            counter = 0
    
        arr = value.split(/[\s.]+/);
        arr.forEach((el, index) => {
            if (el.split('').includes(':')) {
                nameInArr = el.split('')
                name = nameInArr.pop()
                // name = nameInArr[0]
                // message = nameInArr[1]
                namesArr.push(nameInArr.join(''))
                counter++
                if(message){
                    messagesArr.push(message)
                    message = ''
                }
            }else if(namesArr.length <= counter){
                message += el + ' '
                if(index == arr.length - 1){
                    messagesArr.push(message)
                    message = ''
                }
            }
        })
    }

    document.querySelector('.modal-fill').classList.remove('active')

    for(let i = 1; i < namesArr.length; i++){
        addBlock()        
    }

    const groups = document.querySelectorAll('.form-wrapper')

    for (const [index, group] of groups.entries()) {
        group.querySelector('#name-input').value = namesArr[index]
        group.querySelector('#message-area').value = messagesArr[index]
    }
}