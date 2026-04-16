export const calcDueTime = function (deadline) {
  const deadlineDate = new Date(deadline);
  const now = new Date();

  // Calculate the raw difference
  const diffInMs = deadlineDate - now;
  const absDiff = Math.abs(diffInMs);

  // Convert to units
  const mins = Math.floor(absDiff / (1000 * 60));
  const hours = Math.floor(absDiff / (1000 * 60 * 60));
  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));

  const isOverdue = diffInMs < 0;
  const status = isOverdue ? 'Overdue by ' : 'Due in ';

  // Logic for granular display
  if (days >= 1) {
    return `${status}${days} ${days === 1 ? 'day' : 'days'}`;
  }

  if (hours >= 1) {
    return `${status}${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }

  if (mins >= 1) {
    return `${status}${mins} ${mins === 1 ? 'minute' : 'minutes'}`;
  }

  return isOverdue ? 'Overdue now' : 'Due now';
};

const localDueDate = new Date(2026, 3, 16); // 2026 April 16
const initialState = {
  title: 'Frontend Assessment',
  description:
    'Implement a pixel-perfect, accessible Todo Item Card using high-performance Vanilla JavaScript. Must include dynamic time-remaining logic, semantic HTML structure, and rigorous data-testid mapping for automated CI/CD grading.',
  priority: 'high',
  dueDate: new Date(localDueDate).toString(),
};

export const loadTaskData = function () {
  const storedTask = localStorage.getItem('task-content');
  if (!storedTask) {
    // If no task is stored, return the initial state
    return initialState;
  }

  // Parse the stored task and convert the dueDate back to a Date object
  const parsed = JSON.parse(storedTask);
  return {
    ...parsed,
    dueDate: new Date(parsed.dueDate),
  };
};

export const saveTaskToLocalStorage = function (task) {
  localStorage.setItem('task-content', JSON.stringify(task));
};

export const Priority = Object.freeze({
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
});

export const isValidPriority = function (priority) {
  return Object.values(Priority).includes(priority);
};
