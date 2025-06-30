function signup() {
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;

  if (username && password) {
    localStorage.setItem('user', JSON.stringify({ username, password }));
    alert('Signup successful! Please log in.');
    window.location.href = 'login.html';
  } else {
    alert('Please fill out all fields.');
  }
}

function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.username === username && user.password === password) {
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'index.html'; // redirect to home or game
  } else {
    alert('Invalid username or password.');
  }
}

function logout() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'login.html';
}

function checkAuth() {
  if (localStorage.getItem('loggedIn') !== 'true') {
    alert('Please log in first.');
    window.location.href = 'login.html';
  }
}
