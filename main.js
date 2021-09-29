let bill = document.querySelector('.bill');
let userSelectedTip = document.querySelectorAll('.select-tip button');
let customTip = document.querySelector('.custom');
let people = document.querySelector('.people');
let tipHtml = document.querySelector('#tip');
let totalHtml = document.querySelector('#total');
let resetBtn = document.querySelector('.reset');
let errorMessage = document.querySelector('.error-message')
let tip = 0, total = 0, billamount = 0, numberOfPeople = 0;


// preventing false inputs
bill.addEventListener('input', () => {
    billamount = bill.value * 1;
    calculateTip();
    calculateTotal();
})

people.addEventListener('input', () => {
    people.value = people.value.replace(/[^\d]/, '');
    numberOfPeople = people.value * 1;
    calculateTip();
    calculateTotal()
})

//selecting the tip percent
userSelectedTip.forEach(btn => {
    btn.addEventListener('click', () => {
        tip = btn.dataset.percent * 1;
        unselect();
        customTip.value = ''
        btn.classList.add('active');
        calculateTip();
        calculateTotal();
    })
})

customTip.addEventListener('input', () => {
    tip = customTip.value * 1;
    unselect();
    calculateTip();
    calculateTotal();
})

resetBtn.addEventListener('click', () => {
    tipHtml.textContent = '$0.00';
    totalHtml.textContent = '$0.00';
    resetBtn.disabled = true;
    unselect();
    bill.value = 0
    people.value = 1;
})


function calculateTip() {
    if (checkPeople()) {
        let result = ((billamount * tip / 100) / numberOfPeople);
        tipHtml.textContent = `$${result.toFixed(2)}`;
    }
}

function calculateTotal() {
    if (checkPeople()) {
        let result = (((billamount * tip / 100) / numberOfPeople) + billamount / numberOfPeople);
        totalHtml.textContent = `$${result.toFixed(2)}`;
        resetBtn.disabled = false;
    }
}

function unselect() {
    userSelectedTip.forEach(btn => {
        btn.classList.remove('active');
    })
}

function checkPeople() {
    if (numberOfPeople > 0) {
        people.classList.remove('error');
        errorMessage.classList.add('hide');
        return true;
    }
    people.classList.add('error');
    errorMessage.classList.remove('hide');
    resetBtn.disabled = true;
    return false;
}