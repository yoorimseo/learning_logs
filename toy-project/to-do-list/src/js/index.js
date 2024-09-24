import { makeCalendar } from './calendar.js';
import { getStorageItems } from './todoList.js';

document.addEventListener('DOMContentLoaded', () => {
  makeCalendar();
  getStorageItems();
});
