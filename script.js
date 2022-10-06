// Reference Element by id
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dataTransition =[
//     {id:1,text:'ค่าขนม',amount:-100},
//     {id:2,text:'ค่าห้อง',amount:-3000},
//     {id:3,text:'เงินเดือน',amount:+18000},
//     {id:4,text:'ค่าอาหาร',amount:-500}
// ]

// let transaction = dataTransition;

let transaction = [];

function init(){
    list.innerHTML='';
    transaction.forEach(addDataTolist);
    calculateMoney();
    
}
function addDataTolist(transaction){
    const symbol = transaction.amount < 0 ? '-' : '+';
    const status = transaction.amount < 0 ? 'minus' : 'plus';
    const item = document.createElement('li');
    result = numberWithCommas(Math.abs(transaction.amount));
    item.classList.add(status);
    // item.innerHTML = 'ค่าซ่อมรถ <span>- ฿400</span><button class="delete-btn">x</button>';
    item.innerHTML = `${transaction.text} <span>${symbol}${result}</span><button class="delete-btn" onclick="removeData(${transaction.id})">x</button>`;
    list.appendChild(item);
}
function calculateMoney(){
    const amounts = transaction.map(transaction => transaction.amount);

    // calculate total
    const total = amounts.reduce((result,item) => (result+=item),0).toFixed(2);

    // calculate income
    const income = amounts.filter(item => item > 0).reduce((result,item) => (result+=item),0).toFixed(2);

    //calcualte expense
    const expense = Math.abs(amounts.filter(item => item < 0).reduce((result,item) => (result+=item),0).toFixed(2));

    balance.innerText = `฿`+numberWithCommas(total);
    money_plus.innerText =  `฿`+numberWithCommas(income);
    money_minus.innerText =  `฿`+numberWithCommas(expense);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function autoID(num){
    return Math.floor(Math.random()*1000000);
}

function removeData(id){
    transaction = transaction.filter(x => x.id !== id);
    init();
}

function addTransaction(e){
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert("กรุณากรอกข้อมูล");
        return;
    }else{
        const data = {
            id: autoID(),
            text: text.value,
            amount: +amount.value
        }
        transaction.push(data);
        addDataTolist(data);
        calculateMoney();
        text.value='';
        amount.value='';
    }

}

form.addEventListener('submit',addTransaction);

init();