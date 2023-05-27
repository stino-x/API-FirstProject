import Updateposition from './Modules/input.js';
import './style.css';

const refreshButton = document.querySelector('.refresh');
const submitButton = document.querySelector('#submit');
const namevalue = document.querySelector('#name');
const score = document.querySelector('#score');
const scoreList = document.querySelector('#scores');
const Form = document.querySelector('form');
const displayError = (message) => {
  const container = document.querySelector('.container-2');
  const errorMessage = document.createElement('div');
  errorMessage.setAttribute('class', 'error-message');
  errorMessage.textContent = message;
  container.appendChild = errorMessage;
};
const newCompetitor = (data) => {
  while (scoreList.firstChild) {
    scoreList.removeChild(scoreList.firstChild);
  }
  data.forEach((person) => {
    const contestant = document.createElement('li');
    const contestantID = data.indexOf(person) + 1;
    contestant.setAttribute('id', `${contestantID}`);
    contestant.innerHTML = `${person.user}:${person.score}`;
    scoreList.appendChild(contestant);
  });
};
const submitScore = async (e) => {
  e.preventDefault();
  const updatePosition = new Updateposition(namevalue.value, score.value);
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/austin/scores/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatePosition),
  });

  if (!response.ok) {
    throw new Error('Leaderboard score was not created correctly');
  }

  Form.addEventListener('submit', (event) => {
    event.preventDefault();
    Form.reset();
  });
  Form.reset();
};
const displayScore = async () => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/austin/scores/');
    const data = await response.json();
    newCompetitor(data.result);
  } catch (error) {
    displayError(error);
  }
};

submitButton.addEventListener('click', submitScore);
refreshButton.addEventListener('click', displayScore);
displayScore();
