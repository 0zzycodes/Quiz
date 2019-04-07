const config = {
  apiKey: 'AIzaSyC5czWXQu4FTocNYrmB7xzqii6iMzNsgfM',
  authDomain: 'quiz-bc70b.firebaseapp.com',
  databaseURL: 'https://quiz-bc70b.firebaseio.com',
  projectId: 'quiz-bc70b',
  storageBucket: 'quiz-bc70b.appspot.com',
  messagingSenderId: '130964826277'
};
firebase.initializeApp(config);
// Referance
const database = firebase.database();

// FETCHING DATA BACK FROM FIREBASE
const messagesRef = database.ref('players');
const ref = database.ref('players');
ref.on('value', fetchData);
function fetchData(data) {
  const players = data.val();
  const keys = Object.keys(players);

  const output = document.querySelector('.candidates');
  output.innerHTML = [];
  // LOOP THROUGH THE DATA RECIVED
  for (var i = 0; i < keys.length; i++) {
    const k = keys[i];
    // STORE EACH PROPERTY FROM THE OBJECT AS A VARIABLE
    const names = players[k].name;
    const score = players[k].score;
    // APPEND THE DATA TO A LIST
    output.innerHTML +=
      '<li><span>' +
      names +
      '</span><span class = "score">' +
      score +
      '</span>' +
      '</li>';
  }
}

const Btn = document.querySelector('#quiz').addEventListener('submit', Submit);

const form = document
  .querySelector('form')
  .addEventListener('submit', event => {
    event.preventDefault();
    const user = document.querySelector('#user').value;
    if (user === '') {
      alert('Please enter your name');
      return;
    } else {
      document.querySelector('#quiz').style.display = 'block';
      document.querySelector('#userName').style.display = 'none';
    }
  });
// FUNCTION THAT CHECK IF THE USER ANSWERS ARE CORRECT
function Submit(e) {
  e.preventDefault();
  // STORING THE USER ANSWERS TO A VARIABLE
  let Q1 = document.quiz.Q1.value;
  let Q2 = document.quiz.Q2.value;
  let Q3 = document.quiz.Q3.value;
  let Q4 = document.quiz.Q4.value;
  let Q5 = document.quiz.Q5.value;
  let Q6 = document.quiz.Q6.value;
  let Q7 = document.quiz.Q7.value;
  let Q8 = document.quiz.Q8.value;
  let Q9 = document.querySelector('#Q9').value.toLowerCase();
  Q1.value = '';
  // INITIATE SCORE
  let correct = 0;
  // CHECKING IF THE ANSWER MATCHES AND INCREACING SCORE FOR EACH RIGHT ANSWERS
  if (Q1 == 'Night Owl') {
    correct++;
  }
  if (Q2 == 'Black') {
    correct++;
  }
  if (Q3 == '19') {
    correct++;
  }
  if (Q4 == 'Coffee') {
    correct++;
  }
  if (Q5 == 'Tab') {
    correct++;
  }
  if (Q6 == 'Linux') {
    correct++;
  }
  if (Q7 == 'Cat') {
    correct++;
  }
  if (Q8 == 'Alone') {
    correct++;
  }
  if (Q9 == 'math' || Q9 == 'mathematics') {
    correct++;
  }
  // THIS GET USER NAME, STORED IT TO A VARIABLE AND CHANGE VALUE TO UPPERCASE LETTER
  const user = document.querySelector('#user').value.toUpperCase();
  const messages = [
    `Damn, I guess we are besties ${user}`,
    `That's just okay ${user}`,
    `Its okay ${user}`,
    `I guess you don't know me ${user}`
  ];

  let reward;
  // CONDITION THAT TELLS WHICH MESSAGE TO APPEAR AFTER USER SUBMITTION
  if (correct == 0) {
    reward = 3;
  }

  if (correct <= 4 && correct > 2) {
    reward = 2;
  }

  if (correct > 4 && correct < 9) {
    reward = 1;
  }

  if (correct > 7 && correct == 9) {
    reward = 0;
  }
  // STORING USER DATA TO AN OBJECT
  const players = {
    name: user,
    score: `${correct} / 9`
  };
  // SENDING USER DATA TO FIREBASE
  var newMessageRef = messagesRef.push();
  newMessageRef.set(players);
  // APPLIED THE FOLLOWING STYLE TO SELECTED ELEMENTS
  document.querySelector('#quiz').style.display = 'none';
  document.getElementById('submitted').style.opacity = '1';
  document.getElementById('Corrects').innerHTML =
    'You got ' + correct + ' correct.';
  document.getElementById('message').innerHTML = messages[reward];
  document.querySelector('.finish').innerHTML = 'Your Score';
  document.querySelector('.thanks').innerHTML = 'Thanks For Your Time';
}
