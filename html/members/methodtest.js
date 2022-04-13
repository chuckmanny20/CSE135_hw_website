// Test file is correctly linked
// console.log('Check!');

// Populate the Date with a new Date Object
export function initDate() {
    let current_date = new Date();
    let current_year = current_date.getFullYear();
    let current_month = current_date.getMonth() + 1;
    let current_day = current_date.getDate();

    if(parseInt(current_month) < 10) {
        current_month = '0' + current_month;
    }

    if(parseInt(current_day) < 10) {
        current_day = '0' + current_day;
    }

    let date_string = `${current_year}-${current_month}-${current_day}`

    //get Date from form
    document.getElementById('date').value = date_string;
}