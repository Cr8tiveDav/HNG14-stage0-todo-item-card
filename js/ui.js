import { formatDueDate } from '../utils.js';
import { calcDueTime, loadTaskData } from './state.js';

export const renderTask = function (card) {
  const taskData = loadTaskData();
  card.querySelector('.task-title').textContent = taskData.title;

  // Priority badge
  const priorityBadge = card.querySelector('.priority-badge');
  const priorityDot = card.querySelector('.priority-dot');
  const priorityText = card.querySelector('.priority-text');
  // Use priority for dynamic class
  const currentPriority = taskData.priority.toLowerCase();

  priorityText.textContent =
    taskData.priority.charAt(0).toUpperCase() + taskData.priority.slice(1);

  // Reset class to default before adding the new class
  priorityDot.className = 'priority-dot';
  priorityDot.classList.add(currentPriority);
  // Reset class to default...
  priorityBadge.className = 'priority-badge';
  priorityBadge.classList.add(currentPriority);
  // Reset class to default...
  priorityText.className = 'priority-text';
  priorityText.classList.add(currentPriority);

  // Format due date, and display due date and time
  const dueDate = card.querySelector('.due-date');
  const formattedDueDate = formatDueDate(taskData.dueDate);
  dueDate.textContent = formattedDueDate;
  updateDueTime(card.querySelector('.due-time'));

  const showMoreBtn = card.querySelector('.show-more-btn');
  const descriptionEl = card.querySelector('.task-description');
  const descriptionContainer = card.querySelector('.description-container');

  const longDescription = taskData.description;
  const charLimit = 150;

  // Check if description is more than limit
  if (longDescription.length > charLimit) {
    const shortDescription = longDescription.substring(0, charLimit) + '...';
    descriptionEl.textContent = shortDescription;
    showMoreBtn.style.display = 'block';
    showMoreBtn.textContent = 'See more';
    descriptionContainer.style.marginBottom = '0';

    // Add click event to toggle the description length
    showMoreBtn.onclick = () => {
      const isExpanded = showMoreBtn.textContent === 'See less';
      descriptionEl.textContent = isExpanded
        ? shortDescription
        : longDescription;
      // Toggle show more btn text content
      showMoreBtn.textContent = isExpanded ? 'See more' : 'See less';
    };
  } else {
    descriptionEl.textContent = longDescription;
    showMoreBtn.style.display = 'none';
    descriptionContainer.style.marginBottom = '1.5rem';
  }
};

// Toggle between View and Edit Mode
export const toggleEditMode = function (card) {
  card.querySelector('.view-task').classList.toggle('hidden');
  card.querySelector('.edit-form').classList.toggle('hidden');
};

export const toggleTaskStatus = function (isCompleted, card) {
  const taskTitle = card.querySelector('[data-testid="test-todo-title"]');
  const statusController = card.querySelector(
    '[data-testid="test-todo-status-control"]'
  );
  const statusIndicator = card.querySelector(
    '[data-testid="test-todo-status"]'
  );
  const taskCheckbox = card.querySelector(
    '[data-testid="test-todo-complete-toggle"]'
  );

  const timeContainer = card.querySelector(
    '[data-testid="test-todo-overdue-indicator"]'
  );
  const timeLabel = card.querySelector(
    '[data-testid="test-todo-time-remaining"]'
  );

  const alarmSvg = card.querySelector('.lucide-alarm-clock');
  const checkSvg = card.querySelector('.lucide-circle-check');

  if (isCompleted) {
    // Update State & Inputs
    taskCheckbox.checked = true;
    taskTitle.classList.add('completed-text');
    statusController.value = 'done';
    statusIndicator.textContent = 'Done';
    statusIndicator.classList.replace('status-pending', 'status-done');

    // Swap SVGs
    if (alarmSvg) alarmSvg.classList.add('hidden');
    if (checkSvg) checkSvg.classList.remove('hidden');

    // Update Text without wiping out the SVGs
    if (timeLabel) timeLabel.textContent = 'Completed';

    timeContainer.classList.add('task-completed');
    timeContainer.classList.remove('due-in', 'overdue-red');
  } else {
    // Reset to Pending state
    taskCheckbox.checked = false;
    taskTitle.classList.remove('completed-text');
    statusController.value = 'pending';
    statusIndicator.textContent = 'Pending';
    statusIndicator.classList.replace('status-done', 'status-pending');

    // Swap SVGs back
    if (alarmSvg) alarmSvg.classList.remove('hidden');
    if (checkSvg) checkSvg.classList.add('hidden');

    timeContainer.classList.remove('task-completed');
    timeContainer.classList.add('due-in');

    if (timeLabel) updateDueTime(timeLabel);
  }
};

// Update Due Time
export const updateDueTime = function (dueEl) {
  const taskData = loadTaskData();
  const label = calcDueTime(taskData.dueDate);
  const parent = dueEl.parentElement;
  const svg = parent.querySelector('.lucide-alarm-clock-icon');

  if (dueEl) {
    dueEl.textContent = label;
  }
  if (label.includes('Overdue')) {
    parent.classList.add('overdue-red');
    svg.classList.add('overdue-svg-red');
    svg.classList.remove('due-in-svg');
    parent.classList.remove('due-in');
  } else {
    parent.classList.remove('overdue-red');
    svg.classList.remove('overdue-svg-red');
    parent.classList.add('due-in');
    svg.classList.add('due-in-svg');
  }
};

export const toggleInputError = function (errorElement, showError) {
  if (showError) {
    errorElement.classList.remove('hidden');
  } else {
    errorElement.classList.add('hidden');
  }
};
