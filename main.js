let box = document.querySelectorAll(".box");
let restart = document.querySelectorAll(".restart");
let turno = true;

let next = document.getElementById("next");
let select = document.getElementById("select");
let area = document.getElementById("area")


let selectedDiv = null;

function changeColor(clickedDiv) {
    if (selectedDiv !== null) {
        selectedDiv.style.backgroundColor = 'transparent'; 
        selectedDiv.style.color = 'white';
    }

    clickedDiv.style.backgroundColor = 'white'; 
    clickedDiv.style.color = 'black';
    
    selectedDiv = clickedDiv;
}

next.addEventListener("click",()=>{
    if (selectedDiv === null) {
        alert("Please select a option before proceeding.");
        return; 
    }

    select.style.display="none"
    area.style.display= "flex"
})




let  winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]
box.forEach((box)=>{
    box.addEventListener("click", ()=>{
        console.log("box was clicked");
        if(turno == true){
            box.innerHTML = "O";
            turno = false;
        }else{
            box.innerHTML = "X";
            turno = true;

        }
        box.disabled = true;
    })
})