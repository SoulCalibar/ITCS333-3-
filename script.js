async function fetchData() {
    const apiUrl = 'https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100';

    console.log("Fetching data..."); // Log to check if function is being called
    
    try {
        // Fetch the data from the API
        const response = await fetch(apiUrl);
        
        console.log("Data fetched successfully"); // Log if data was fetched
        
        // Parse the JSON response
        const data = await response.json();
        
        console.log("Data received:", data); // Log the full response to see what it looks like
        
        // Check the structure of data
        if (data && data.records) {
            console.log('Data records:', data.records); // Log the actual records

            // Proceed with adding data to the table
            const tableBody = document.querySelector("#student-table tbody");
            tableBody.innerHTML = ''; // Clear any existing data

            if (data.records.length > 0) {
                // Loop through each record and add it to the table
                data.records.forEach(record => {
                    const nationality = record.fields.nationality || 'N/A';
                    const college = record.fields.colleges || 'N/A';
                    const program = record.fields.the_programs || 'N/A';
                    const studentCount = record.fields.student_count || 0;

                    // Create a new table row
                    const row = document.createElement("tr");

                    // Add table cells with the record data
                    const td1 = document.createElement("td");
                    td1.textContent = nationality;
                    row.appendChild(td1);

                    const td2 = document.createElement("td");
                    td2.textContent = college;
                    row.appendChild(td2);

                    const td3 = document.createElement("td");
                    td3.textContent = program;
                    row.appendChild(td3);

                    const td4 = document.createElement("td");
                    td4.textContent = studentCount;
                    row.appendChild(td4);

                    // Append the row to the table body
                    tableBody.appendChild(row);
                });
            } else {
                console.log("No records found in the response");
                const row = document.createElement("tr");
                const td = document.createElement("td");
                td.setAttribute("colspan", 4);
                td.textContent = "No data available.";
                row.appendChild(td);
                tableBody.appendChild(row);
            }
        } else {
            console.error("No 'records' in the API response.");
        }
    } catch (error) {
        console.error("Error fetching data:", error); // Log any fetch errors
    }
}