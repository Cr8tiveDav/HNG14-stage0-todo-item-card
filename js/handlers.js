import {
  isValidPriority,
  loadTaskData,
  saveTaskToLocalStorage,
} from './state.js';
import {
  renderTask,
  toggleEditMode,
  toggleInputError,
  toggleTaskStatus,
  updateDueTime,
} from './ui.js';

// Handler functions for different events

let timerID = null;

export const startDueTimeTimer = function (dueEl) {
  // Clear previous timer before starting a new one
  if (timerID) clearInterval(timerID);

  // Start the interval and save to timerID
  timerID = setInterval(() => {
    console.log('Timer Started');
    updateDueTime(dueEl);
  }, 60000);
};

export const stopDueTimeTimer = function () {
  if (timerID) {
    console.log('Timer Stopped');
    clearInterval(timerID);
    timerID = null;
  }
};

export const handleEditClick = function (card) {
  toggleEditMode(card);

  const taskData = loadTaskData();

  // Pre-fill the edit form with current task data
  // Add focus to the first input
  const titleInput = card.querySelector('.title-input');
  titleInput.value = taskData.title;
  titleInput.focus();

  card.querySelector('.description-input').value = taskData.description;
  card.querySelector('.priority-input').value = taskData.priority;
  const dueDateObj = new Date(taskData.dueDate);

  // The ISO-standard format: YYYY-MM-DDTHH:mm
  const year = dueDateObj.getFullYear();
  const month = (dueDateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dueDateObj.getDate().toString().padStart(2, '0');
  const hours = dueDateObj.getHours().toString().padStart(2, '0');
  const minutes = dueDateObj.getMinutes().toString().padStart(2, '0');

  const formattedInput = `${year}-${month}-${day}T${hours}:${minutes}`;

  card.querySelector('.due-date-input').value = formattedInput;
};

export const handleCancelEditClick = function (card) {
  const editBtn = card.querySelector('.edit-btn');
  toggleEditMode(card);
  console.log(editBtn);
  if (editBtn) editBtn.focus();
};

export const handleCheckboxChange = function (e, card) {
  const dueEl = card.querySelector('.due-time');
  toggleTaskStatus(e.target.checked, card);

  if (e.target.checked) {
    stopDueTimeTimer();
  } else {
    startDueTimeTimer(dueEl);
  }
};

export const handleStatusController = function (e, card) {
  console.log('Status controller:', e.target.value);
  const isDone = e.target.value === 'done';
  toggleTaskStatus(isDone, card);
};

export const handleSaveSubmit = function (e, card) {
  e.preventDefault();

  const title = card.querySelector('.title-input').value.trim();
  const description = card.querySelector('.description-input').value.trim();
  const priority = card.querySelector('.priority-input').value.trim();
  const dueDate = card.querySelector('.due-date-input').value;

  const titleErrorEl = card.querySelector('#title-error');
  const descriptionErrorEl = card.querySelector('#description-error');
  const priorityErrorEl = card.querySelector('#priority-error');
  const dueDateErrorEl = card.querySelector('#due-date-error');

  // Check for empty fields and show errors accordingly
  if (!title) {
    toggleInputError(titleErrorEl, true);
    return;
  } else {
    toggleInputError(titleErrorEl, false);
  }
  if (!description) {
    toggleInputError(descriptionErrorEl, true);
    return;
  } else {
    toggleInputError(descriptionErrorEl, false);
  }
  if (!dueDate) {
    toggleInputError(dueDateErrorEl, true);
    return;
  } else {
    toggleInputError(dueDateErrorEl, false);
  }

  const finalPriority = isValidPriority(priority) ? priority : 'low';

  const dueDateObj = new Date(dueDate).toString(); // Convert date to a date obj string;

  const incomingTaskUpdate = {
    title,
    description,
    priority: finalPriority,
    dueDate: dueDateObj,
  };

  const taskData = loadTaskData();

  console.log('Task Data:', taskData);
  console.log('Task update:', incomingTaskUpdate);

  // Check if any of the task data has changed
  const isChanged = Object.keys(incomingTaskUpdate).some(
    (key) => incomingTaskUpdate[key] !== taskData[key]
  );
  console.log('Has task data changed:', isChanged);

  // If no changes, simply toggle back to view mode without saving
  if (!isChanged) {
    toggleEditMode(card);
    return;
  }

  // If there are changes, save to localStorage
  saveTaskToLocalStorage(incomingTaskUpdate);

  // Update the UI with new data
  renderTask(card);

  // Toggle back to view mode
  toggleEditMode(card);
};
