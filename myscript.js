// Event listeners for month and year input changes
document.getElementById('month').addEventListener('change', updateDays);
document.getElementById('year').addEventListener('input', updateDays);

function updateDays() {
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const daySelect = document.getElementById('day');
    const selectedDay = parseInt(daySelect.value);

    // Clear current options
    daySelect.innerHTML = '<option value="0">Day</option>'; // Add default "Day" option

    // Populate days based on selected month and year
    let maxDays = 31; // Default to 31 days
    if (month === 2) { // February
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            maxDays = 29; // Leap year
        } else {
            maxDays = 28; // Non-leap year
        }
    } else if ([4, 6, 9, 11].includes(month)) { // April, June, September, November
        maxDays = 30;
    }

    // Populate day options
    for (let day = 1; day <= maxDays; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    }

    // Set selected day if still valid
    if (selectedDay <= maxDays) {
        daySelect.value = selectedDay;
    }
}

function calculateAge() {
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = document.getElementById('year').value.trim();

    // Validate inputs
    if (month === 0) {
        document.getElementById('result').innerHTML = '<p style="color:red;">Select Month</p>';
        return;
    }
    if (day === 0) {
        document.getElementById('result').innerHTML = '<p style="color:red;">Select Day</p>';
        return;
    }
    if (year === '') {
        document.getElementById('result').innerHTML = '<p style="color:red;">Select Year</p>';
        return;
    }

    // Validate if year is a valid number
    const yearInt = parseInt(year);
    if (isNaN(yearInt)) {
        document.getElementById('result').innerHTML = '<p style="color:red;">Invalid Year</p>';
        return;
    }
    
    // Create date objects
    const birthDate = new Date(yearInt, month - 1, day);
    const today = new Date();
    const startYear = new Date(1582,1,24);
    
    // Validate year range (1582 to current date)
    // Validate birth date
    if (birthDate >= today) {
        document.getElementById('result').innerHTML = '<p style="color:red;">Birth date should be less than the current date.</p>';
        return;
    }
    
    // Validate year range (24/02/1582 to current date)
    //year also need to check greater or not from 1582(if two digit year entered it will take 1900+year)
    if ( startYear > birthDate || 1582 > year) {
        document.getElementById('result').innerHTML = `<p style="color:red;">Birthday must be greater than Feb/24/1582</p>`;
        return;
    }
    

    // Calculate age
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    // Display age
    document.getElementById('result').innerHTML = `<div>You are <p style="color: blue; display: inline-block;">${ageYears}</p> years, <p style="color: blue; display: inline-block;">${ageMonths}</p> months, and <p style="color: blue; display: inline-block;">${ageDays}</p> days old.</div>`;
}
