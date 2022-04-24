function generateDates(min, max) {
    // Function to generate dates between two dates
    // and format them in format YYYY-MM-DD
    let dates = [];
    let currentDate = new Date(min);
    let endDate = new Date(max);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

module.exports = {
    generateDates
}