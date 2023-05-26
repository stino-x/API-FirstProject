import AddToScreen from './script.js';
import { saveTaskstoLocalStorage } from './AddtoLocalStorage.js';

let activityArray = [];
if (localStorage.getItem('activities')) {
  activityArray = JSON.parse(localStorage.getItem('activities'));
}
const DeleteTask = (e) => {
  if (e.target.classList.contains('trash')) {
    const listItem = e.target.parentNode.parentNode;
    const taskIndex = listItem.getAttribute('id');
    // const taskIndex = Array.from(listItem.parentNode.children).indexOf(listItem) - 1;
    activityArray.splice(taskIndex, 1);
    saveTaskstoLocalStorage();
    AddToScreen();
  }
};
export default DeleteTask;