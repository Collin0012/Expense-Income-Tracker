const searchField = document.querySelector('#searchField');

const tableOutput = document.querySelector('.table-output');

const appTable = document.querySelector('.app-table');

const tbody = document.querySelector('.table-body');

const paginationContainer = document.querySelector('.pagination-container');

tableOutput.style.display = 'none';

searchField.addEventListener('keyup', (e)=>{

    const searchValue = e.target.value;

    if(searchValue.trim().length > 0){
        
        paginationContainer.style.display = 'none';

        tbody.innerHTML = "";

        fetch('/income/search-income/', {
            body: JSON.stringify({ searchText: searchValue }), 
            method: 'POST', 
        })
        .then(res => res.json())
        .then(data =>{
            // 
            //console.log('data', data);

            appTable.style.display = 'none';
            
            tableOutput.style.display = 'block';

            if(data.length === 0){
                tableOutput.innerHTML = 'No results was found!';
                //tableOutput.style.display = 'none';
            }else{

                //tableOutput.style.display = 'none';

                data.forEach(item =>{
                    
                    tbody.innerHTML+=
                    `<tr>
                        <td>${item.amount}</td>
                        <td>${item.source}</td>
                        <td>${item.description}</td>
                        <td>${item.date}</td>
                    </tr>`

                });
                
            }
        });
    }else{
        appTable.style.display = 'block';
        paginationContainer.style.display = 'block';
        tableOutput.style.display = 'none';
    }
})