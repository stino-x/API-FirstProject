import { saveTaskstoLocalStorage } from './AddtoLocalStorage.js';
import AddToScreen from './script.js';

let activityArray = [];
export const handleCheckboxchange = (event) => {
  const checkbox = event.target;
  const listItem = checkbox.parentNode.parentNode;
  const taskId = listItem.getAttribute('id');
  activityArray[taskId].completed = checkbox.checked;
  saveTaskstoLocalStorage();
  if (checkbox.checked) {
    listItem.querySelector('.text').classList.add('completed');
  } else {
    listItem.querySelector('.text').classList.remove('completed');
  }
  saveTaskstoLocalStorage();
};

//   activitleCheckboxchange);
//   activiteTask);
// deleting all checked tasks
export const deleteCheckedTasks = () => {
  activityArray = activityArray.filter((MyConstructor) => !MyConstructor.completed);
  saveTaskstoLocalStorage();
  AddToScreen();
};
export const reIndex = () => {
  activityArray.forEach((task, index) => {
    task.index = index + 1;
  });
};
  // button for dleting all checked tasks
export const cLearALL = () => {
  deleteCheckedTasks();
  reIndex();
  saveTaskstoLocalStorage();
  AddToScreen();
};
//   ALL);