'use strict';

const editBtn = document.querySelector('.edit-btn');
const deleteBtn = document.querySelector('.delete-btn');
const checkbox = document.querySelector(
  '[data-testid="test-todo-complete-toggle"]'
);
const statusInProgress = document.querySelector('.status-in-progress');
const statusDone = document.querySelector('.status-done');
const dueEl = document.querySelector('.due-time');
const taskTitle = document.querySelector('[data-testid="test-todo-title"]');
const editTask = document.querySelector('[data-testid="test-todo-edit-form"]');
const viewTask = document.querySelector('.view-task');
const cancelEditBtn = document.querySelector(
  '[data-testid="test-todo-cancel-button"]'
);

const dueDate = new Date('2026-04-16T00:00:00');
const calcDueTime = function (deadline = dueDate) {
  const now = new Date();

  // Difference in Milliseconds
  const diffInMs = deadline - now;
  // Difference in Days
  const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  let label;
  switch (true) {
    case days > 1:
      label = `Due in ${days} days`;
      break;
    case days === 1:
      label = `Due tomorrow`;
      break;
    case days === 0:
      label = `Due now`;
      break;
    default:
      label = `Overdue by ${Math.abs(days)} ${Math.abs(days) === 1 ? 'day' : 'days'}`;
      break;
  }
  dueEl.textContent = label;
};

// Load due time immediately
calcDueTime();

// Update due time every 60000 milliseconds (60000 === 60s)
setInterval(() => {
  calcDueTime();
}, 60000);

// Toggle between View and Edit Mode
const toggleEditMode = function () {
  viewTask.classList.toggle('hidden');
  editTask.classList.toggle('hidden');
};

// Edit Form
editBtn.addEventListener('click', function () {
  toggleEditMode();
});

// View Task
cancelEditBtn.addEventListener('click', function () {
  toggleEditMode();
});

deleteBtn.addEventListener('click', function () {
  alert('Delete clicked');
});

checkbox.addEventListener('change', function (event) {
  if (event.target.checked) {
    statusDone.classList.remove('hidden');
    statusInProgress.classList.add('hidden');
    taskTitle.classList.add('completed-text');
  } else {
    statusInProgress.classList.remove('hidden');
    statusDone.classList.add('hidden');
    taskTitle.classList.remove('completed-text');
  }
});
