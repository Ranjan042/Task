const ctx = document.getElementById("incomeChart");

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Income vs Expenses"],
        datasets: [
            {
                label: 'Income',
                data: [10000],
                backgroundColor: "#0a7d2c",
                borderRadius: 0,
                barPercentage: 0.9,
                categoryPercentage: 0.8
            },
            {
                label: "Expenses",
                data: [200],
                backgroundColor: "#b71c1c",
                borderRadius: 0,
                barPercentage: 0.9,
                categoryPercentage: 0.8
            }
        ]
    }
});