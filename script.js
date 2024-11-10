let timeout;

function showContent() {
    const delay = 0;
    const duration = 0.75;
    const contentDiv = document.getElementById("content-div");

    clearTimeout(timeout);
    contentDiv.style.transition = `opacity ${duration}s`;
    contentDiv.style.opacity = '0';

    timeout = setTimeout(() => {
        contentDiv.style.opacity = '1';
    }, delay);
}

function calculateAge(birthDay, birthMonth, birthYear) {
    const date = new Date();

    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const age = (currentMonth == birthMonth && currentDay >= birthDay) ? currentYear - birthYear : currentYear - (birthYear + 1);

    const ageSpan = document.getElementById("current-age");
    ageSpan.innerText = age;
}

document.addEventListener('DOMContentLoaded', function() {
    showContent();
    calculateAge(28, 12, 2003);
});