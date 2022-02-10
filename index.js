
let perPerson = document.getElementById('perPerson');
let total = document.getElementById('total');
let tip = {value: 0}
let tips = [...document.getElementById('tipBox').querySelectorAll('div.tip-box')];
let bill = null;
let people = null;

// add event listeners
for (let index = 0; index < tips.length; ++index) {
    const element = tips[index];
    element.addEventListener("click", function() {
        const evt = (e) => {
            tips.forEach(t => t.classList.remove('tip-selected'));
            e.target.classList.add('tip-selected');
            document.getElementById('customTip').value = null;
            tip.value = element.textContent;
            if (document.getElementById('bill').value !== '' && document.getElementById('people').value !== '' && tip.value !== 0){
              calculate();
              resetToggle();
            }
          };
          tips.forEach(t => t.addEventListener('click', evt));
    })
}

// log the bill
function billLog(){
    const billValue = document.getElementById('bill').value;
    bill = billValue;
    // run the calculations if nothing is empty
    if (billValue !== '' && document.getElementById('people').value !== '' && tip.value !== 0){
        calculate();
        resetToggle();
    }
}
// log the amount of people
function peopleLog(){
    const peopleValue = document.getElementById('people').value;
    people = peopleValue;
    if (peopleValue == 0){
        document.getElementById('people').classList.add('wrong-people-num');
        document.getElementById('wrongPeopleNum').style.visibility = "visible";

    } else if (document.getElementById('people').classList.contains('wrong-people-num') == true) {
        document.getElementById('people').classList.remove('wrong-people-num');
        document.getElementById('wrongPeopleNum').style.visibility = "hidden";
    }
     // run the calculations if nothing is empty
    if (document.getElementById('bill').value !== '' && peopleValue !== '' && tip.value !== 0){
        calculate();
        resetToggle();
    }
}
// log the custom tip if there is one
function customTip(){
    tip.value = document.getElementById('customTip').value;
    tipReset();
    if (document.getElementById('bill').value !== '' && document.getElementById('people').value !== '' && tip.value !== 0){
        calculate();
        resetToggle();
    }
}
// calculate the tip
function calculate(){
    let tipPerPerson = ((bill * (tip.value / 100)) / people).toFixed(2);
    let tipTotal = ((bill * (tip.value / 100))).toFixed(2);
    perPerson.innerHTML = tipPerPerson.toString();
    total.innerHTML = tipTotal.toString();
}
// reset tip selection
function tipReset(){
    for (let index = 0; index < tips.length; ++index) {
        const element = tips[index];
        element.classList.remove('tip-selected');
    }
}
// reset everything
function reset(){
    tipReset();
    resetToggle()
    perPerson.textContent = '0.00';
    total.textContent = '0.00';
    document.getElementById('customTip').value = null;
    document.getElementById('bill').value = null;
    document.getElementById('people').value = null;
}
// toggle for reset button
function resetToggle(){
    document.getElementById('resetBtn').classList.toggle('btn-active');
}