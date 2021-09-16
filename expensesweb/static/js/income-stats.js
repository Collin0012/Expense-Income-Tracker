const renderChart_ = (data, labels)=>{
    var ctx = document.getElementById('my_chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        // type: 'polarArea', 
        data: {
            labels: labels,
            datasets: [{
                label: 'Last six months income',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    // 'rgba(69, 146, 95, 1)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 4
            }] 
        },
        options: {
            title: {
                display: true,
                text: 'Income per source',
            }
        }
    });
}; 

const getChartData_=()=> { 
    fetch('/income/income_source_summary').then(res=>res.json()).then(results=>{
        console.log("results", results);

        const source_data = results.income_source_data;
        const [labels, data] = [Object.keys(source_data), Object.values(source_data)];

        renderChart_(data, labels);
    });
}; 

document.onload = getChartData_();
