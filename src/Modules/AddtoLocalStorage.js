import { AddToScreen } from './script.js';

const inputArea = document.querySelector('#input');

let activityArray = [];
if (localStorage.getItem('activities')) {
  activityArray = JSON.parse(localStorage.getItem('activities'));
}
export function MyConstructor(description, completed, index) {
  this.description = description;
  this.completed = completed;
  this.index = index;
}
export const saveTaskstoLocalStorage = () => {
  localStorage.setItem('activities', JSON.stringify(activityArray));
};

export const AddtoLocalStorage = () => {
  const description = inputArea.value.trim();
  const completed = false;
  const Index = activityArray.length + 1;
  const Object = new MyConstructor(description, completed, Index);
  activityArray.push(Object);
  saveTaskstoLocalStorage();
  AddToScreen();
};
