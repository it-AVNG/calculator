//declare global variable
var log = [0,0,''];
var opr_index = 2; 
var num1_index = 0;
var num2_index = 1;


//computation function
function add(num1,num2){ return num1+num2; }
function substract(num1,num2){ return num1-num2; }
function multiply(num1,num2){ return num1*num2; }
function divide(num1,num2){
  if (num2==0 || num2 ==''){ return "╮(￣ω￣;)╭" }
  return num1/num2;
}
//

//function to update operand
function addOperand(operand){
  if (log[num2_index] !=0){ 
    //compute the number then return
    let acc = compute(log);
    document.getElementById("display").innerText = acc;
    log = [acc,0,operand];
  }

  log[opr_index] = operand;
  console.log(log);
}

// for trigger computation function:
function compute(array){
  switch (array[opr_index]){
    case "+": return add(array[num1_index],array[num2_index]);
    case "-": return substract(array[num1_index],array[num2_index]);
    case "*": return multiply(array[num1_index],array[num2_index]);
    case "/": return divide(array[num1_index],array[num2_index]);
  }
}

//clear display function
function clrDisplay(){
  document.getElementById("display").innerText = 0;
}

//Function to update the Display
function updateDisplay(number){
  let display_number = updateLog(number);
  let display = document.getElementById("display");
  // console.log(display);
  display.innerText = display_number;
}

// function to update the log array
function updateLog(number){
  //check operand, if available, log in number 2
  if(log[opr_index] != ""){
    log[num2_index] = log[num2_index]*10+ (number*1);
    //return the number
    return log[num2_index];
  } 
  log[num1_index] = log[num1_index]*10 + (number*1);
  //return the number
  return log[num1_index];
}


//main//
//update the display whenver we clicked a number
document.querySelectorAll("button.number").forEach((button) => {
  button.addEventListener('click',(e) => updateDisplay(e.target.innerText));
});

//listen to keystroke from the operator
document.querySelectorAll('.opr-btn').forEach(
  (button) => {
    button.addEventListener('click', (e) => addOperand(e.target.innerText))
  });

// give "AC" button a job to reset the memory
document.querySelector('#reset').addEventListener('click',(e) =>{
  clrDisplay();
  document.querySelectorAll('.opr-btn').forEach(
    (button) => {
      button.disabled= false;
    });
  log = [0,0,''];
});

// give "=" button a job to compute
document.querySelector('#equal').addEventListener('click',(e) =>{
  if (log[opr_index]!=''){
    let computeValue = compute(log)
    document.getElementById("display").innerText =computeValue;
    log = [computeValue,0,''];
  }
});


