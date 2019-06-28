const apiKey = "";
const searchUrl = "https://api.github.com/";

function getUserRepo(searchTerm){
    const url = `${searchUrl}user/repos?key=${apiKey}`;
    fetch(url).then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    }).then(responseJson => console.log(responseJson))
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