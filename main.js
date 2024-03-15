let box = document.querySelectorAll(".box");
let restart = document.querySelectorAll(".restart");

let turno = true;

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