const ctx = document.getElementById("incomeChart").getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Income vs Expenses"],
        datasets: [
            {
                label: 'Income',
                data: [70000],
                backgroundColor: "#166534", // Dark green
                 borderRadius: 0,
                barPercentage: 0.9,
                categoryPercentage: 0.8
            },
            {
                label: "Expenses",
                data: [2000],
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
                max: 70000,
                ticks: {
                    stepSize: 10000,
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

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('change', (e) => {
    if(e.target.checked) {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
    }
});