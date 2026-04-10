'use strict';

const editBtn = document.querySelector('.edit-btn');
const deleteBtn = document.querySelector('.delete-btn');
const checkbox = document.querySelector(
  '[data-testid="test-todo-complete-toggle"]'
);
const statusEl = document.querySelector('[data-testid="test-todo-status"]');

const deadline = new Date('2026-04-16T00:00:00');
const calcDueTime = function (deadline) {
  const now = new Date();

  // Difference in Milliseconds
  const diffInMs = deadline - now;
  // Difference in Days
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
};

// Update due time every 1000 milliseconds (1000 === 1s)
setInterval(() => calcDueTime(deadline), 1000);
console.log();

editBtn.addEventListener('click', function () {
  console.log('Edit clicked');
});

deleteBtn.addEventListener('click', function () {
  alert('Delete clicked');
});

checkbox.addEventListener('change', function (event) {
  if (event.target.checked) {
    console.log('Checkbox clicked');
    statusEl.textContent = 'Done';
    statusEl.classList.remove('status-in-progress');
    statusEl.classList.add('status-done');
  } else {
    statusEl.textContent = 'In Progress';
    statusEl.classList.remove('status-done');
    statusEl.classList.add('status-in-progress');
  }
});
