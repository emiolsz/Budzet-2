document.getElementById("add-income").addEventListener("click", addIncome);
document.getElementById("add-expense").addEventListener("click", addExpense);

function addIncome() {
  addItem("income");
}

function addExpense() {
  addItem("expense");
}

function addItem(type) {
  const name = document.getElementById(`${type}-name`).value;
  const amount = parseFloat(document.getElementById(`${type}-amount`).value);

  if (!name || !amount) {
    return;
  }

  const item = document.createElement("li");
  item.innerHTML = `<span>${name}: ${amount.toFixed(2)} zł</span>
                      <button class="edit-btn">Edytuj</button>
                      <button class="delete-btn">Usuń</button>`;

  item
    .querySelector(".edit-btn")
    .addEventListener("click", () => editItem(item, type));
  item
    .querySelector(".delete-btn")
    .addEventListener("click", () => deleteItem(item, type));

  document.getElementById(`${type}-list`).appendChild(item);

  document.getElementById(`${type}-name`).value = "";
  document.getElementById(`${type}-amount`).value = "";

  updateBalance();
}

function editItem(item, type) {
  const currentAmount = parseFloat(
    item.firstChild.textContent.split(": ")[1].split(" ")[0]
  );
  const currentName = item.firstChild.textContent.split(": ")[0];

  const newName = prompt("Podaj nową nazwę:", currentName);
  const newAmount = parseFloat(prompt("Podaj nową kwotę:", currentAmount));

  if (newName && newAmount) {
    item.firstChild.textContent = `${newName}: ${newAmount.toFixed(2)} zł`;
    updateBalance();
  }
}

function deleteItem(item, type) {
  document.getElementById(`${type}-list`).removeChild(item);
  updateBalance();
}

function updateBalance() {
  const incomeList = document.getElementById("income-list").children;
  const expenseList = document.getElementById("expense-list").children;

  let incomeTotal = 0;
  let expenseTotal = 0;

  for (const item of incomeList) {
    incomeTotal += parseFloat(
      item.firstChild.textContent.split(": ")[1].split(" ")[0]
    );
  }

  for (const item of expenseList) {
    expenseTotal += parseFloat(
      item.firstChild.textContent.split(": ")[1].split(" ")[0]
    );
  }

  document.getElementById(
    "income-total"
  ).textContent = `Suma przychodów: ${incomeTotal.toFixed(2)} zł`;
  document.getElementById(
    "expense-total"
  ).textContent = `Suma wydatków: ${expenseTotal.toFixed(2)} zł`;

  const topBalance = incomeTotal - expenseTotal;
  document.getElementById(
    "top-balance-message"
  ).textContent = `${topBalance.toFixed(2)} zł`;
}
