'use strict';

import { renderTask, updateDueTime } from './ui.js';
import * as handlers from './handlers.js';

const editBtn = document.querySelector('.edit-btn');
const deleteBtn = document.querySelector('.delete-btn');
const checkbox = document.querySelector(
  '[data-testid="test-todo-complete-toggle"]'
);
const dueEl = document.querySelector('.due-time');
const cancelEditBtn = document.querySelector('.cancel-btn');
const saveEditBtn = document.querySelector('.save-btn');
const card = document.querySelector('[data-testid="test-todo-card"]');

// Update the UI
renderTask(card);
// Load due time immediately
updateDueTime(dueEl);

// Update due time every 60000 milliseconds (60000 === 60s)
handlers.startDueTimeTimer(dueEl);

checkbox.addEventListener('change', (e) =>
  handlers.handleCheckboxChange(e, card)
);

card
  .querySelector('.status-controller')
  .addEventListener('click', (e) => handlers.handleStatusController(e, card));

// Edit Form
editBtn.addEventListener('click', () => handlers.handleEditClick(card));

// View Task
cancelEditBtn.addEventListener('click', () =>
  handlers.handleCancelEditClick(card)
);

// Save Edit
saveEditBtn.addEventListener('click', (e) =>
  handlers.handleSaveSubmit(e, card)
);

deleteBtn.addEventListener('click', function () {
  alert('Delete clicked');
});
