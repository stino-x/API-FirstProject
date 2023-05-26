import './style.css';

const activityList = document.querySelector('#activity-list');
const activityArray = [{
  description: 'Go to the gym',
  completed: false,
  Index: 0,
}, {
  description: 'Study',
  completed: true,
  Index: 1,
}, {
  description: 'Cook',
  completed: false,
  Index: 2,
}, {
  description: 'Suceed',
  completed: true,
  Index: 3,
}, {
  description: 'Travel',
  completed: false,
  Index: 4,
}];
window.addEventListener('load', () => {
  let content = '';
  activityArray.forEach((activity, index) => {
    content += `<li class="section" id="${index}">
        <span class="activity td"><input type="checkbox" name="" class="check-box" ${activity.completed ? 'checked' : ''}><span>${activity.description}</span><i class="fa-solid fa-ellipsis-vertical"></i></span>
    </li>`;
    activityList.innerHTML = content;
  });
});