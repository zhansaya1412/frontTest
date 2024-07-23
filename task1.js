document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#cryptoTable tbody');

            data.forEach((coin, index) => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = coin.id;
                row.appendChild(idCell);

                const symbolCell = document.createElement('td');
                symbolCell.textContent = coin.symbol;
                row.appendChild(symbolCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = coin.name;
                row.appendChild(nameCell);

                // добавление классов для фона
                if (index < 5) {
                    row.classList.add('blue-background');
                }
                if (coin.symbol.toLowerCase() === 'usdt') {
                    row.classList.add('green-background');
                }

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
