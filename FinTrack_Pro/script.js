const themeToggle = document.getElementById("darkModeToggle");

if(localStorage.getItem("theme") === "dark") {
document.body.setAttribute('data-theme', 'dark');
themeToggle.checked = true;

} else {
document.body.setAttribute('data-theme', 'light');
themeToggle.checked = false;
}



const currentUser = JSON.parse(localStorage.getItem('currentUser'));


if (!currentUser) {
    window.location.href = 'login.html';
}else{
    document.querySelector('.userName').textContent = currentUser?.username ;
}

document.querySelector('.logout').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

document.querySelector('.profile-save-btn').addEventListener('click',function(){
    const name = document.querySelector('.name').value;
    const currency = document.querySelector('.currency').value;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.username = name;
    user.currency = currency;
    document.querySelector('.userName').textContent = name;
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Profile updated successfully!');

    console.log(user);

    UpdateTransactionOverview(user);
    
})




function GenerateGraph(totalIncome, totalExpense){
    const ctx = document.getElementById("incomeChart").getContext('2d');
const chart = Chart.getChart("incomeChart");

if (chart) {
    chart.destroy();
}

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Income vs Expenses"],
        datasets: [
            {
                label: 'Income',
                data: [totalIncome || 0],
                backgroundColor: "#166534", // Dark green
                 borderRadius: 0,
                barPercentage: 0.9,
                categoryPercentage: 0.8
            },
            {
                label: "Expenses",
                data:[totalExpense || 0],
                backgroundColor: "#991b1b", // Dark red
                borderRadius: 0,
                barPercentage: 0.9,
                categoryPercentage: 0.8
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: Math.max(totalIncome, totalExpense),
                ticks: {
                    stepSize: Math.floor(Math.max(totalIncome, totalExpense) / 6),
                    callback: function(value) {
                        if (value === 0) return '0';
                        return value.toLocaleString();
                    }
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.05)"
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 20,
                    usePointStyle: false,
                }
            }
        }
    }
});

}

function ToogleTheme(e){
    if(e.target.checked) {
        document.body.setAttribute('data-theme', 'dark');      
        localStorage.setItem("theme", "dark");
    } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem("theme", "light");
    }
}
let editingIndex = null; 
// Variable to track the index of the transaction being edited
const {username}= currentUser || {};
const key = `transactions_${username}`;
console.log('Transaction Key:', key);

let Transaction = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];

document.querySelector(".reset-data").addEventListener('click',function(){
    localStorage.removeItem(key);
    Transaction = [];
    UpdateTransactionOverview(currentUser);
})

let currentFilterType = "all";
let currentSearchTerm = "";

document.querySelector('#transactionTypeFilter').addEventListener('change', function(e) {
    const filterType = e.target.value;
    RenderTransactionList(currentUser.currency, filterType,currentSearchTerm);
});

document.querySelector(".search").addEventListener('input',function(e){
    const searchTerm = e.target.value;
    console.log(searchTerm);
    RenderTransactionList(currentUser.currency,currentFilterType,searchTerm);
})



function RenderTransactionList(currency,filterType="all",searchTerm=" ") {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';
    console.log("Search Term:", searchTerm);
    // let filteredTransactions=[];
    // if (filterType === 'Income') {
    //     filteredTransactions = Transaction.filter(transaction => transaction.type === 'Income');
    // } else if (filterType === 'Expense') {
    //     filteredTransactions = Transaction.filter(transaction => transaction.type === 'Expense');
    // }else{
    //     filteredTransactions = Transaction;
    // }

   const filteredTransactions= Transaction.filter(transaction =>{
     const typeMatch = filterType === 'all' || transaction.type === filterType;

     const searchMatch = searchTerm.trim() === '' || transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
     return typeMatch && searchMatch;
   })

    if (filteredTransactions.length === 0) {
        const noTransactions = document.createElement('p');
        noTransactions.textContent = 'No transactions found.';
        transactionList.appendChild(noTransactions);
        return;
    }

    console.log('Rendering transaction list:', Transaction);

    console.log("Rendering transaction:", Transaction);
    filteredTransactions.forEach((transaction, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                             <td>${transaction.date}</td>
                                <td><b>${transaction.description}</b></td>
                                <td><span class="badge">${transaction.category}</span></td>
                                <td class="${transaction.type === 'Expense' ? 'text-red' : 'text-green'} fw-bold">${transaction.type === 'Expense' ? '-' : '+'}${currency}${parseFloat(transaction.amount).toFixed(2)}</td>
                                <td class="actions">
                                    <i  data-id="${index}"  class="ri-pencil-fill edit-btn text-blue"></i>
                                    <i  data-index="${index}"  class=" ri ri-delete-bin-fill delete-btn text-red"></i>
                                </td>
        `;
        transactionList.appendChild(tr);
    });

    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            Transaction.splice(index, 1);
            SaveTransactionToLocalStorage();
            RenderTransactionList();
            UpdateTransactionOverview();
            console.log(`Deleted transaction at index: ${index}`);
        });
    });

    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-id');
            const transaction = Transaction[index];
            
            // Populate the form with the transaction data
            document.getElementById('type').value = transaction.type;
            document.getElementById('amount').value = transaction.amount;
            document.getElementById('category').value = transaction.category;
            document.getElementById('date').value = transaction.date;
            document.getElementById('description').value = transaction.description;

            editingIndex = index; // Store the index of the transaction being edited

            modal.classList.add('active');
        });
    });
    
}




function UpdateTransactionOverview(currentUser) {

    const totalIncome = Transaction.filter(t => t.type === 'Income').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const totalExpense = Transaction.filter(t => t.type === 'Expense').reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const totalBalance = totalIncome - totalExpense;
    const transactionCount = Transaction.length;
    
     document.querySelector('.income').textContent = `${currentUser.currency}${totalIncome.toFixed(2)}`;
    document.querySelector('.expense').textContent = `${currentUser.currency}${totalExpense.toFixed(2)}`;
    document.querySelector('.current-balance').textContent = `${currentUser.currency}${totalBalance.toFixed(2)}`;
    document.querySelector('.transaction-count').textContent = transactionCount;
   
    console.log("updating Overview");
    
    GenerateGraph(totalIncome, totalExpense);
    RenderTransactionList(currentUser.currency);
}

UpdateTransactionOverview(currentUser);

function SaveTransactionToLocalStorage() {
    localStorage.setItem(key, JSON.stringify(Transaction));
}



const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('change', ToogleTheme);


const modal = document.getElementById('transactionModal');
const addTransactionBtn = document.getElementById('addTransactionBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const transactionForm = document.getElementById('transactionForm');

addTransactionBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});





transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        type: e.target.type.value,
        amount: e.target.amount.value,
        category: e.target.category.value,
        date: e.target.date.value,
        description: e.target.description.value
    }

    if (editingIndex !== null) {
        Transaction[editingIndex] = formData;
        editingIndex = null;
    }else{
        Transaction.push(formData);
    }
    SaveTransactionToLocalStorage();
    UpdateTransactionOverview(currentUser);

    
    modal.classList.remove('active');
});

const dashboardLink = document.querySelector('.dashboard.links');
const settingLink = document.querySelector('.setting.links');
const dashboardView = document.getElementById('dashboardView');
const settingsView = document.getElementById('settingsView');

if(dashboardLink && settingLink && dashboardView && settingsView) {
    dashboardLink.addEventListener('click', () => {
        dashboardLink.classList.add('makeActive');
        settingLink.classList.remove('makeActive');
        dashboardView.style.display = 'flex';
        settingsView.style.display = 'none';
    });

    settingLink.addEventListener('click', () => {
        settingLink.classList.add('makeActive');
        dashboardLink.classList.remove('makeActive');
        settingsView.style.display = 'flex';
        dashboardView.style.display = 'none';
    });
}