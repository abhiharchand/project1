document.getElementById('employee-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('employee-name').value;
    const availability = document.getElementById('availability').value.split(',').map(day => day.trim());
    const hoursAllowed = parseInt(document.getElementById('hours-allowed').value);
    
    if (validateInput(name, availability, hoursAllowed)) {
        addEmployee(name, availability, hoursAllowed);
        generateSchedule();
    } else {
        alert('Invalid input. Please check your entries.');
    }
});

const employees = [];

function validateInput(name, availability, hoursAllowed) {
    const validDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const isValidDays = availability.every(day => validDays.includes(day));
    return name && isValidDays && hoursAllowed > 0 && hoursAllowed <= 49;
}

function addEmployee(name, availability, hoursAllowed) {
    employees.push({ name, availability, hoursAllowed });
}

function generateSchedule() {
    const scheduleBody = document.getElementById('schedule-body');
    scheduleBody.innerHTML = '';

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hoursPerShift = 7;
    const schedule = {};

    days.forEach(day => {
        schedule[day] = { shift1: [], shift2: [] };
    });

    employees.forEach(employee => {
        let totalHoursScheduled = 0;

        days.forEach(day => {
            if (employee.availability.includes(day) && totalHoursScheduled < employee.hoursAllowed) {
                if (totalHoursScheduled + hoursPerShift <= employee.hoursAllowed) {
                    schedule[day].shift1.push(employee.name);
                    totalHoursScheduled += hoursPerShift;
                }
                
                if (totalHoursScheduled + hoursPerShift <= employee.hoursAllowed) {
                    schedule[day].shift2.push(employee.name);
                    totalHoursScheduled += hoursPerShift;
                }
            }
        });
    });

    days.forEach(day => {
        const row = document.createElement('tr');
        const dayCell = document.createElement('td');
        dayCell.textContent = day;
        row.appendChild(dayCell);
        
        const shift1Cell = document.createElement('td');
        const shift2Cell = document.createElement('td');
        
        shift1Cell.textContent = schedule[day].shift1.join(', ');
        shift2Cell.textContent = schedule[day].shift2.join(', ');
        
        row.appendChild(shift1Cell);
        row.appendChild(shift2Cell);
        scheduleBody.appendChild(row);
    });
}
