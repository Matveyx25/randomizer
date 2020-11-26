var answer = document.getElementById("answer")
var variant = document.getElementById("variants")
var someV = document.getElementById("someRadio")
var team = document.getElementById("teamRadio")
var order = document.getElementById("orderRadio")
var withNum = document.getElementById("withNum")
var newInput = document.createElement("input")
newInput.className = "selectInput"
newInput.placeholder = "name variant"
var wrapInput = document.getElementById("wrap")
var someInput = document.getElementById("someInput")
var teamInput = document.getElementById("teamInput")
var form = document.getElementById("form")
newInput.id = "variant"

let selectCount = () => {
  let count = variant
  if(+count.value > +count.max){
    alert("Max 20 count")
    variant.value = ""
  }else if(!withNum.checked){
    wrapInput.innerHTML = ""
    for(i = 0; i < count.value; i++){
      wrapInput.appendChild(newInput.cloneNode(true))
    }
  }
}

withNum.oninput = () =>{
    if(withNum.checked){
        wrapInput.innerHTML = ""
    }else{
        selectCount()
    }
}

let validate = (id) => {
    let el = document.getElementById(id)
    if(+el.value > +el.max || +el.value < +el.min){
        alert("Max " + el.max + " min is " + el.min)
        el.value = ""
    }
}

let someCheck = () => {
  someInput.disabled = false
  teamInput.disabled = true
}

let teamCheck = () => {
  someInput.disabled = true
  teamInput.disabled = false
}

let orderCheck = () => {
  someInput.disabled = true
  teamInput.disabled = true
}


function returnRadio(){
  let rad = document.getElementsByName('radio');
  let check
  
    for (i=0;i < rad.length; i++) {
        if (rad[i].checked) {
            check = rad[i].value
        }
    }
  return check
}


let colSplit = (input, size) => {
    for (var x, i = 0, c = -1, l = input.length, n = []; i < l; i++) {
        (x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
    }
    return n;
}

  

let sub = () => {
  let count = variant.value
  let arr = []
  
    if(withNum.checked){
      for(i = 1;i <= count; i++){
        arr.push(i)
      }
    }else{
      let sel = document.getElementsByClassName("selectInput")
      for(let n = 0; n < sel.length; n++){
        arr.push(sel[n].value)
      }
    }
  
  arr.sort(() => {
    return Math.random() - 0.5
  })

  if(returnRadio() === "order"){
    answer.innerHTML = arr
  }else if(returnRadio() === "some"){
    let countSome = someInput.value
    arr.length = countSome
    answer.innerHTML = arr
  }else if(returnRadio() === "team"){
    let countTeam = Math.ceil(arr.length / +teamInput.value)
    let newArr = colSplit(arr , countTeam)
    answer.innerHTML = newArr.join(" | ")
    console.log(newArr)
  }
  return false
}