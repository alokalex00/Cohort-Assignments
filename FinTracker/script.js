let title = document.querySelector("#title");
let amount = document.querySelector("#amount");
let type = document.querySelector("#type");

let addBtn = document.querySelector("#addBtn");
let transactionList = document.querySelector("#transactionList");

let balance = document.querySelector("#balance");
let income = document.querySelector("#income");
let expense = document.querySelector("#expense");

let filterBtns = document.querySelectorAll(".filterBtn");

let incomeBar = document.querySelector("#incomeBar");
let expenseBar = document.querySelector("#expenseBar");

let userName = document.querySelector("#userName");
let currency = document.querySelector("#currency");
let saveProfile = document.querySelector("#saveProfile");
let welcome = document.querySelector("#welcome");

let themeBtn = document.querySelector("#themeBtn");
let resetBtn = document.querySelector("#resetBtn");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let selectedCurrency = localStorage.getItem("currency") || "₹";
let savedName = localStorage.getItem("name") || "User";

currency.value = selectedCurrency;
userName.value = savedName;
welcome.innerText = "Welcome " + savedName +"👋";

if(localStorage.getItem("theme") == "dark"){
    document.body.classList.add("dark");
    themeBtn.innerText = "☀️ Light";
}

addBtn.addEventListener("click", addTransaction);

function addTransaction(){

    let titleValue = title.value;
    let amountValue = Number(amount.value);
    let typeValue = type.value;

    if(titleValue == "" || amountValue <= 0){
        alert("Please Fill All Details");
        return;
    }

    let transaction = {
        title: titleValue,
        amount: amountValue,
        type: typeValue
    };

    transactions.push(transaction);

    saveTransactions();
    displayTransactions("all");

    title.value = "";
    amount.value = "";
}

function saveTransactions(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function displayTransactions(filterValue){

    transactionList.innerHTML = "";

    for(let i = 0; i < transactions.length; i++){

        if(filterValue == "all" || transactions[i].type == filterValue){

            let li = document.createElement("li");

            li.classList.add(transactions[i].type);

            let sign = "";

            if(transactions[i].type == "income"){
                sign = "+";
            }
            else{
                sign = "-";
            }

            li.innerHTML = `
                <div>
                    <h3>${transactions[i].title}</h3>
                    <p>${transactions[i].type}</p>
                </div>

                <div>
                    <b>${sign} ${selectedCurrency}${transactions[i].amount}</b>
                    <button class="deleteBtn" onclick="deleteTransaction(${i})">Delete</button>
                </div>
            `;

            transactionList.appendChild(li);
        }
    }

    calculateSummary();
}

function deleteTransaction(index){

    transactions.splice(index, 1);

    saveTransactions();
    displayTransactions("all");
}

function calculateSummary(){

    let totalIncome = 0;
    let totalExpense = 0;

    for(let i = 0; i < transactions.length; i++){

        if(transactions[i].type == "income"){
            totalIncome = totalIncome + transactions[i].amount;
        }
        else{
            totalExpense = totalExpense + transactions[i].amount;
        }
    }

    let totalBalance = totalIncome - totalExpense;

    income.innerText = selectedCurrency + totalIncome;
    expense.innerText = selectedCurrency + totalExpense;
    balance.innerText = selectedCurrency + totalBalance;

    updateChart(totalIncome, totalExpense);
}

for(let i = 0; i < filterBtns.length; i++){

    filterBtns[i].addEventListener("click", function(){

        let filterValue = filterBtns[i].getAttribute("data-filter");

        displayTransactions(filterValue);

    });
}

function updateChart(totalIncome, totalExpense){

    let total = totalIncome + totalExpense;

    if(total == 0){
        incomeBar.style.height = "30px";
        expenseBar.style.height = "30px";
        return;
    }

    let incomeHeight = (totalIncome / total) * 200;
    let expenseHeight = (totalExpense / total) * 200;

    incomeBar.style.height = incomeHeight + "px";
    expenseBar.style.height = expenseHeight + "px";
}

saveProfile.addEventListener("click", function(){

    selectedCurrency = currency.value;
    savedName = userName.value;

    if(savedName == ""){
        savedName = "User";
    }

    localStorage.setItem("currency", selectedCurrency);
    localStorage.setItem("name", savedName);

    welcome.innerText = "Welcome " + savedName + " 👋";

    displayTransactions("all");
});

themeBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
        themeBtn.innerText = "☀️ Light";
    }
    else{
        localStorage.setItem("theme", "light");
        themeBtn.innerText = "🌙 Dark";
    }
});

resetBtn.addEventListener("click", function(){

    let answer = confirm("Are you sure you want to reset all data?");

    if(answer == true){

        localStorage.clear();

        transactions = [];
        selectedCurrency = "₹";
        savedName = "User";

        currency.value = selectedCurrency;
        userName.value = savedName;
        welcome.innerText = "Welcome User 👋";

        document.body.classList.remove("dark");
        themeBtn.innerText = "🌙 Dark";

        displayTransactions("all");
    }
});

displayTransactions("all");