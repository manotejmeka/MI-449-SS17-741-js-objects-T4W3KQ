// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// Saving jokes to localStorage
function saveJokes() {
  var stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
}
// Get saved JSON
function getJokes() {
  // console.log("Getting jokes")
  var stringifiedJokes = window.localStorage.getItem('jokes')
  // console.log(stringifiedJokes)
  if (stringifiedJokes) {
    jokes = JSON.parse(stringifiedJokes)
  }
}
// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Checking the Jokes object if object exists
var checkJokesObject = function (input) {
  for (var key in jokes) {
    if (key === input) {
      // console.log(jokes[key].setup, jokes[key].punchline)
      return key
    }
  }
  return null
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value.trim()

  var keyObject = checkJokesObject(requestedJokeKey)
  if (keyObject) {
    jokeBox.innerHTML = '<p>' + jokes[keyObject].setup + '</p>'
    jokeBox.innerHTML += '<p>' + jokes[keyObject].punchline + '</p>'
  } else {
    jokeBox.innerHTML = '<p> No matching joke found </p>'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  getJokes()
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)

// When clicked the button it updates or makes a new joke
function remeberTheJoke () {
  var newJokeName = document.getElementById('new-joke-name').value.trim()
  var newJokeSetup = document.getElementById('new-joke-setup').value.trim()
  var newJokePunchline = document.getElementById('new-joke-punchline').value.trim()

  if (newJokeName && newJokeSetup && newJokePunchline) {
    var keyObject = checkJokesObject(newJokeName)
    if (keyObject) {
      jokes[keyObject].setup = newJokeSetup
      jokes[keyObject].punchline = newJokePunchline
    } else {
      var newObject = new Object()
      newObject.setup = newJokeSetup
      newObject.punchline = newJokePunchline
      jokes[newJokeName] = newObject
    }
    // console.log("Created a new thing")
    saveJokes()
    updatePage()
  }
}

// Delete the joke when the button is hit
function deleteJoke() {
  // console.log("Deleted a joke")
  var deleteJokeName = document.getElementById('delete-joke-name').value.trim()
  // console.log(deleteJokeName)
  // console.log(checkJokesObject(deleteJokeName))
  if (deleteJokeName) {
    delete jokes[deleteJokeName]
  }
  saveJokes()
  updatePage()
}


