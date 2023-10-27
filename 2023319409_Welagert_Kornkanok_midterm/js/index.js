// Function to add a digit to the account number
function add(a){
	console.log("add");
	account_number = document.getElementById("account_number").value;
	acc = document.getElementById("account_number");

	acc.value = account_number + a;
}

// Function to delete the last digit from the account number
function del(){
	console.log("del");
	account_number = document.getElementById("account_number").value;
	acc = document.getElementById("account_number");

	acc.value = account_number.slice(0, -1);
}

// Function to enter the account number and navigate to PIN page
function enter(){
	console.log("enter");
	account_number = document.getElementById("account_number").value;
	if (account_number == "1234567890123456"){
		window.location = "./pin.html"
	} else{
		alert("That account number does not exist!")
		window.location = "./index.html"
	}
}

// Function to enter the PIN and navigate to the account page
function enterPin(){
	console.log("enterPIN");
	account_number = document.getElementById("account_number").value;
	count_pin = document.getElementById("count_pin").value;
	c_pin = document.getElementById("count_pin");
	console.log(count_pin);


	if (account_number == "1234"){
		localStorage.setItem("balance", 2000)
		window.location = "./account.html"
	} else{
		if (count_pin == 0){
			alert("You have no more attempts left. Your account has been locked.")
			window.location = "./index.html"
		} else{
			alert("Incorrect PIN. You have " + count_pin + " attempts left.")
			c_pin.value = count_pin - 1;
		}

	}
}

// Function to return the card and clear stored data
function returnCard(){
	localStorage.clear();
	window.location='./index.html'
}

// Function to prepare for a deposit operation
function preDeposit(){
	amount = document.getElementById("account_number").value;
	if (amount == ""){
		alert("Please enter amount!")
		return;
	}
	window.location = "./deposit_sure.html?amount=" + amount;
}

// Function to complete a deposit and update the transaction history
function enterDeposit(money){
	balance = localStorage.getItem("balance");

	console.log("enterDeposit")
	date = new Date();
	m_out = 0; // Set the amount to be deposited in (0 for deposit)
	m_in = money;
	m_balance = (balance * 1) + (m_in * 1);

	// Update the account balance in local storage
	localStorage.setItem("balance", m_balance);

	jsondata = {
		"m_date": date,
		"m_out": m_out,
		"m_in": m_in,
		"m_balance": m_balance
	}

	old_transaction = localStorage.getItem("transaction");
	if (old_transaction == null){
		old_transaction = [];
	} else{
		old_transaction = JSON.parse(old_transaction);
	}

	old_transaction.push(jsondata);

	localStorage.setItem("transaction", JSON.stringify(old_transaction));
	window.location = "./deposit_atm.html"; // deposit_atm link to deposited in html code
}

// Function to display transaction history
function getTransaction(){
	table_transaction = document.getElementById("table_transaction");

	transaction = localStorage.getItem("transaction");
	if (transaction == null){
		transaction = [];
	} else{
		transaction = JSON.parse(transaction);
	}

	for (let i = 0; i < transaction.length; i++){
		fulldate = new Date(transaction[i].m_date);

		table_transaction.innerHTML += "<tr><td>" + fulldate + "</td><td>" + transaction[i].m_out + "</td><td>" + transaction[i].m_in + "</td><td>" + transaction[i].m_balance + "</td></tr>";
	}
}

// Function to load and display the account balance
function loadBalance(){
	acc_balance = document.getElementById("acc_balance");
	now_balance = localStorage.getItem("balance");

	acc_balance.innerHTML = now_balance;
}

// Function to clear all stored data
function clearData(){
	localStorage.clear();
}

function setWith(amount){
	window.location = "./withdraw_sure.html?amount=" + amount;
}

function addWith(amount){
	withdraw_amount = document.getElementById("withdraw_amount");
	withdraw_amount.value = (withdraw_amount.value * 1) + (amount * 1);
}

function delWith(amount){
	withdraw_amount = document.getElementById("withdraw_amount");
	withdraw_amount.value = (withdraw_amount.value * 1) - (amount * 1);
	if (withdraw_amount.value < 0){
		withdraw_amount.value = 0;
	}
}

// Function to prepare for a withdrawal operation
function preWithdraw(){
	amount = document.getElementById("withdraw_amount").value;

	if (amount == ""){
		alert("Please enter amount!")
		return;
	}
	window.location = "./withdraw_sure.html?amount=" + amount;
}

// Function to complete a withdrawal and update the transaction history
function enterWithdraw(money){
	balance = localStorage.getItem("balance");

	console.log("enterWithdraw")
	date = new Date();
	m_out = money;
	m_in = 0; // Set the amount to be withdrawed in (0 for outgoing withdraw)
	m_balance = (balance * 1) - (m_out * 1);

	if (m_balance < 0){
		alert("You do not have enough money to withdraw!")
		window.location = "./withdraw.html"
		return;
	}

    // Update the account balance in local storage
	localStorage.setItem("balance", m_balance);

	// Create a JSON object to represent the transaction
	jsondata = {
		"m_date": date,
		"m_out": m_out,
		"m_in": m_in,
		"m_balance": m_balance
	}

	old_transaction = localStorage.getItem("transaction");
	if (old_transaction == null){
		old_transaction = [];
	} else{
		old_transaction = JSON.parse(old_transaction);
	}

	old_transaction.push(jsondata);

	localStorage.setItem("transaction", JSON.stringify(old_transaction));
	window.location = "./withdrawed.html";
}

function enterTransfer(money){
	balance = localStorage.getItem("balance");

	console.log("enterTransfer")
	date = new Date();
	m_out = money;
	m_in = 0; // Set the amount to be transferred in (0 for outgoing transfer)
	m_balance = (balance * 1) - (m_out * 1); // Calculate the new account balance after the transfer


	if (m_balance < 0){
		alert("You do not have enough money to transfer!")
		window.location = "./transfer.html"
		return;
	}

	localStorage.setItem("balance", m_balance);

	jsondata = {
		"m_date": date,
		"m_out": m_out,
		"m_in": m_in,
		"m_balance": m_balance
	}

	old_transaction = localStorage.getItem("transaction");
	if (old_transaction == null){
		old_transaction = [];
	} else{
		old_transaction = JSON.parse(old_transaction);
	}

	old_transaction.push(jsondata);

	localStorage.setItem("transaction", JSON.stringify(old_transaction));
	// Redirect to the 'transferred.html' page
	window.location = "./transferred.html";
}

function preTransfer(){
	// check selected not null
	t_from = document.getElementById("t_from");
	t_to = document.getElementById("t_to");

	if (t_from.value == "" || t_to.value == ""){
		alert("Please select account number!")
		return;
	}

	amount = document.getElementById("account_number").value;
	if (amount == ""){
		alert("Please enter amount!")
		return;
	}

	window.location = "./transfer_sure.html?amount=" + amount;
}
