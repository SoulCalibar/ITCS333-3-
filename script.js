const endpoint = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

fetch(endpoint)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data fetched:', data); // Log the fetched data
        displayData(data.results);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function displayData(results) {
    const container = document.getElementById('data-container');
    if (results.length === 0) {
        container.innerHTML = '<p>No data available.</p>'; // Handle no data case
        return;
    }

    const table = document.createElement('table');
    table.classList.add('table');

    // Create table header
    const header = table.createTHead();
    const headerRow = header.insertRow();
    const headers = ['Year', 'Semester', 'Nationality', 'Number of Students'];

    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });

    // Create table body
    const tbody = table.createTBody();
    results.forEach(item => {
        const row = tbody.insertRow();
        row.insertCell().textContent = item.year;
        row.insertCell().textContent = item.semester;
        row.insertCell().textContent = item.nationality;
        row.insertCell().textContent = item.number_of_students;
    });

    container.appendChild(table);
}