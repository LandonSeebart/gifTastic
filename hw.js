
// ======================Declare Variables===========================

// Hard code a few buttons for user to click
let topics = ['swimming', 'games', 'french food'];

//Ensure we don't mess up our api call
const apiKey = '9UkzR27kH4xwsPK1tapSVKv17bDQoTcA'
const queryURL = 'https://api.giphy.com/v1/gifs/search'

// =====================Main Function================================

//Create buttons and listen for clicks when document loads
$( document ).ready(function () {
    createButtons();

    $('form').submit(handleSearchClick);
    $('#search').click(handleSearchClick);
});

//====================Functions=====================================

function createButtons() {

    // Clear button div each time we run this to avoid creating duplicates
    $('#buttons').empty();

    topics.forEach(function(topic) {
        
        // Create a new button for each item in array
        const button = `<button class="button">${topic}</button>`
        
        // append to button div
        $('#buttons').append(button);
    })

    //Add another listener because we didn't have one for buttons when the doc loaded
    $(".button").click(handleButtonClick);
}


function handleButtonClick() {

    //Clean up search query and launch API call when user hits button
    const q = $(this).text().replace(' ', '+');

    makeAjaxCall(q)
}


function handleSearchClick(e) {
    //Make sure form doesnt submit
    e.preventDefault()
    //Grab user input
    const input = $('#user-input').val();

    //Clean up search query and call API
    $('#user-input').val('');

    const q = input.replace(' ', '+');

    makeAjaxCall(q)
    topics.push(input);
    createButtons();
}

//Our API call
function makeAjaxCall(q) {
    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            apiKey: apiKey,
            q: q,
            
            // limit to 10 responses
            limit: 10
        }
    }).then(function(response) {
        $('#results').empty();

        //Display search resuts on DOM
        for (let i = 0; i < response.data.length; i++) {
            const gif = response.data[i]
            $('#results').append(`<div class="gif"><img class="gif-image" src="${gif.images.downsized_still.url}"><img class="gif-image" style="display: none;" src="${gif.images.downsized.url}"><div class="rating">Rating: ${gif.rating}</div></div>`)
        }

        $('.gif-image').click(function() {
            $(this).hide();
            $(this).siblings().show();
        })
    });
}