const apiKey = '';
const searchUrl = "https://api.github.com/";

function displayResults(responseJson){
  console.log(responseJson);
  $("#results-list").empty();

  for (let i=0; i<responseJson.length; i++){
    $('#results-list').append(
      `<li>
        <h3>${responseJson[i].name}</h3>
        <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
      </li>`
    )
  };
  $("#results").removeClass("hidden");
}

function getUserRepo(searchTerm){
  const url = `${searchUrl}users/${searchTerm}/repos`;

  const options = {
    headers: new Headers({
      'authorization': apiKey,
      'Content-Type': 'application/json'
    })
  };
  fetch(url, options).then(response => {
      if(response.ok){
          return response.json();
      }
      throw new Error(response.statusText);
      }).then(responseJson => displayResults(responseJson))
  .catch(err => {
      $('#js-error-message').text(`Something Failed: ${err.message}`);
  })
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        console.log("data", searchTerm);
        getUserRepo(searchTerm);
    })
}

$(watchForm);