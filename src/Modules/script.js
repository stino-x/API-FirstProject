// import { cLearALL, handleCheckboxchange } from './Modules/checkbox.js';
// import DeleteTask from './Modules/Delete.js';
import reFreshPage from './refresh.js';
// import { AddtoLocalStorage, saveTaskstoLocalStorage } from './Modules/AddtoLocalStorage.js';

const inputArea = document.querySelector('#input');
const Form = document.querySelector('form');
const clearAll = document.querySelector('button');
let activityArray = [];
export const ActivityArray = () => activityArray;
export const mutableActvityArray = () => {
  if (localStorage.getItem('activities')) {
    activityArray = JSON.parse(localStorage.getItem('activities'));
  }
};
const enter = document.querySelector('#enter');
export const activitySection = document.querySelector('#activity-list');
// const reFresh = document.querySelector('#refresh');
function MyConstructor(description, completed, index) {
  this.description = description;
  this.completed = completed;
  this.index = index;
}

if (localStorage.getItem('activities')) {
  activityArray = JSON.parse(localStorage.getItem('activities'));
}

const saveTaskstoLocalStorage = () => {
  localStorage.setItem('activities', JSON.stringify(activityArray));
};

export const AddToScreen = () => {
  activitySection.innerHTML = '';
  activityArray.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('section', 'listitem');
    li.id = index;

    const span = document.createElement('span');
    span.classList.add('activity', 'td');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = '';
    checkbox.classList.add('check-box');
    checkbox.checked = task.completed;

    const taskDescription = document.createElement('span');
    taskDescription.classList.add('text');
    taskDescription.textContent = task.description;

    const ellipsis = document.createElement('i');
    ellipsis.classList.add('fa-solid', 'fa-ellipsis-vertical');

    span.appendChild(checkbox);
    span.appendChild(taskDescription);
    span.appendChild(ellipsis);

    li.appendChild(span);

    activitySection.appendChild(li);
  });
};

if (activityArray.length > 0) {
  AddToScreen();
}

// RE-INDEX
const reIndex = () => {
  activityArray.forEach((task, index) => {
    task.index = index + 1;
  });
};

//  changing html styling for editing purposes

const changeHTMLforEdit = (e) => {
  const listItem = e.target.closest('li');
  const index = listItem.getAttribute('id');
  if (e.target.classList.contains('fa-solid')) {
    // Remove the existing list item styling and add the edit class
    listItem.classList.remove('listitem');
    listItem.classList.add('edit');
    const taskId = listItem.getAttribute('id');
    // Create the edit form HTML
    const span = document.createElement('span');
    span.classList.add('activity');
    const input = document.createElement('input');
    input.focus();
    input.type = 'text';
    input.classList.add('input-edit');
    input.value = activityArray[taskId].description;
    const trashIcon = document.createElement('box-icon');
    // trashIcon.addEventListener('click', deLete); // event listener
    trashIcon.setAttribute('name', 'trash-alt');
    trashIcon.setAttribute('type', 'solid');
    trashIcon.classList.add('trash');
    span.appendChild(input);
    span.appendChild(trashIcon);
    // Replace the existing HTML with the edit form HTML
    listItem.innerHTML = '';
    listItem.appendChild(span);
    listItem.querySelector('.input-edit').setAttribute('id', `input-edit-${index}`);
  }
};

activitySection.addEventListener('dblclick', changeHTMLforEdit);

const AddtoLocalStorage = () => {
  const description = inputArea.value.trim();
  const completed = false;
  const Index = activityArray.length + 1;
  const Object = new MyConstructor(description, completed, Index);
  activityArray.push(Object);
  saveTaskstoLocalStorage();
  AddToScreen();
};

const submitForm = (event) => {
  if (inputArea.value !== '') {
    event.preventDefault();
    AddtoLocalStorage();
    saveTaskstoLocalStorage();
    AddToScreen();
  }
  Form.reset();
};

Form.addEventListener('submit', submitForm);
// double click enter icon
const clickToAddNewTask = () => {
  if (inputArea.value !== '') {
    AddtoLocalStorage();
    saveTaskstoLocalStorage();
    AddToScreen();
    Form.reset();
  }
};
enter.addEventListener('dblclick', clickToAddNewTask);

// check box change
const handleCheckboxchange = (event) => {
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

activitySection.addEventListener('change', handleCheckboxchange);

const loadActivityArrayFromLocalStorage = () => {
  const activityArrayString = localStorage.getItem('activities');
  if (activityArrayString) {
    return JSON.parse(activityArrayString);
  }
  return [];
};

const activityArray1 = loadActivityArrayFromLocalStorage();

activityArray1.forEach((task, index) => {
  const listItem = document.getElementById(index);
  if (task.completed) {
    listItem.querySelector('.text').classList.add('completed');
  }
});

// deleteing a task

const DeleteTask = (e) => {
  if (e.target.classList.contains('trash')) {
    const listItem = e.target.parentNode.parentNode;
    const taskIndex = listItem.getAttribute('id');
    // const taskIndex = Array.from(listItem.parentNode.children).indexOf(listItem) - 1;
    activityArray.splice(taskIndex, 1);
    reIndex();
    saveTaskstoLocalStorage();
    AddToScreen();
  }
};
activitySection.addEventListener('click', DeleteTask);
// deleting all checked tasks

const deleteCheckedTasks = () => {
  activityArray = activityArray.filter((MyConstructor) => !MyConstructor.completed);
  saveTaskstoLocalStorage();
  AddToScreen();
};
// button for dleting all checked tasks
const cLearALL = () => {
  deleteCheckedTasks();
  reIndex();
  saveTaskstoLocalStorage();
  AddToScreen();
};
clearAll.addEventListener('click', cLearALL);
// refresh function
// const reFreshPage = (e) => {
//   if (e.target.classList.contains('refresh')) {
//     reFresh.setAttribute('animation', 'spin');
//     window.location.reload();
//     window.addEventListener('load', () => {
//       reFresh.setTimeout(() => reFresh.classList.remove('animation'), 4500);
//     });
//   }
// };
document.addEventListener('click', reFreshPage);

// editing text in task
const EditTask = (e) => {
  const parent = e.target.parentNode.parentNode;
  const index = parent.getAttribute('id');
  if (e.key === 'Enter' && e.target.classList.contains('input-edit')) {
    const newDescription = e.target.value;
    // editTask(newDescription, index);
    activityArray[index].description = newDescription;
    saveTaskstoLocalStorage();
    parent.innerHTML = `
    <span class="activity td">
    <input type="checkbox" name="" class="check-box"
    ${activityArray[index].completed ? 'checked' : ''}>
    <span class="text">${activityArray[index].description}</span>
    <i class="fa-solid fa-ellipsis-vertical"></i></span>
`;
    parent.classList.add('listitem');
    parent.classList.remove('edit');
  }
};
activitySection.addEventListener('keypress', EditTask);
// MyConstructor();
// AddtoLocalStorage();
// saveTaskstoLocalStorage(); // AddToScreen();