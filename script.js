'use strict'

let username = $('input').val().toLowerCase()

//this function handles the repository list display in the DOM
function displayResults(responseJson, username) {
  console.log('`displayResults` ran')
  console.log('response', responseJson)
  if (responseJson.length === 1) {
      $('.results').prepend(`<h2>Here is ${username}'s ${responseJson.length} GitHub repository:</h2>`)
        for (let i=0; i<responseJson.length; i++) {
          $('.results').append(`
            <li><p>1. ${responseJson[i].name}</p>
              <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
              </li>`)
      }
    }

      else {
        $('.results').prepend(`<h2>Here's a list of ${username}'s ${responseJson.length} GitHub repositories:</h2>`)
        for (let i=0; i<responseJson.length; i++) {
          $('.results').append(`
            <li><p>${i + 1}. ${responseJson[i].name}</p>
              <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
              </li>`)
              }
            }
}

//this function gets the repository list for a given username
//it also handles the catch error
function getRepositoryList(username) {
  console.log('`getRepositoryList` ran')
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
      if (response.ok) {
              return response.json()
            }
            throw new Error(response.statusText)
          })
    .then(responseJson =>
        displayResults(responseJson, username))
    .catch(error => {
        $('.error-results').append(`Oops! Something went wrong: ${error.message}`)
      })
}

//this function handles the submit
function submitForm() {
  $('.js-submit-button').on('click', function(event)  {
    console.log('`submitForm` ran')
    event.preventDefault()
    let username = $('input').val().toLowerCase()
    console.log(username)
    $('.results').empty()
    $('.error-results').empty()
    getRepositoryList(username)
  })
}

// Shorthand for $( document ).ready()
$(function() {
    console.log( "your app has loaded!" )
    submitForm()
})
