const totalBill = document.getElementById('inp-totalbill');
const tipBtns = document.querySelectorAll('.tip');
const tipCustom = document.getElementById('inp-tip');
const numberOfpeople = document.getElementById('inp-people');
const errorMsg = document.querySelector('.error-msg');
const finalOutput = document.querySelectorAll('.value');
const resetButtton = document.querySelector('.reset');


totalBill.addEventListener('input', setBillValue);
tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('input', setTipCustomValue);
numberOfpeople.addEventListener('input', setPeopleValue);
resetButtton.addEventListener('click', reset);


let billValue = 0.0; 
let tipValue = 0.15; 
let peopleValue = 1; 

function validateFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s){
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function setBillValue(){
    if (totalBill.value.includes(',')){
        totalBill.value = totalBill.value.replace(',', '.');
    }

    if(!validateFloat(totalBill.value)){
        totalBill.value = totalBill.value.substring(0, totalBill.value.length-1);
    }

    billValue = parseFloat(totalBill.value);

    calculateTip();
    
}
function handleClick(event){
    tipBtns.forEach(btn => {
     
        btn.classList.remove('btn-active');

        
        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    });

   
    tipCustom.value = '';

    calculateTip();

    
}

function setTipCustomValue(){
    if(!validateInt(tipCustom.value)){
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
    }
    tipValue = parseFloat(tipCustom.value/100);

    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    if(tipCustom.value !== ''){
        calculateTip();
    }
    
}

function setPeopleValue(){
    if(!validateInt(numberOfpeople.value)){
        numberOfpeople.value = numberOfpeople.value.substring(0, numberOfpeople.value.length-1);
    }
    peopleValue = parseFloat(numberOfpeople.value);
    if(peopleValue <= 0){
        errorMsg.classList.add('show-error-msg');
        setTimeout(function(){
            errorMsg.classList.remove('show-error-msg');
        }, 3000);
    }
    calculateTip();
   
}

function calculateTip(){
    if (peopleValue >=1 ){
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        finalOutput[0].innerHTML = '$' + tipAmount.toFixed(2);
        finalOutput[1].innerHTML = '$' + total.toFixed(2);
    }
}
function reset(){
    totalBill.value = '0.0';
    setBillValue();
    tipBtns[2].click();
    numberOfpeople.value = '1';
    setPeopleValue();
}