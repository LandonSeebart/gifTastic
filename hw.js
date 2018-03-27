let topics = ['swimming', 'games', 'french food'];

const apiKey = '9UkzR27kH4xwsPK1tapSVKv17bDQoTcA'
const queryURL = 'https://api.giphy.com/v1/gifs/search'

$( document ).ready(function () {
    createButtons();

    $('form').submit(handleSearchClick);
    $('#search').click(handleSearchClick);
});

function createButtons() {
    $('#buttons').empty();

    topics.forEach(function(topic) {
        const button = `<button class="button">${topic}</button>`
        $('#buttons').append(button);
    })

    $(".button").click(handleButtonClick);
}

function handleButtonClick() {
    const q = $(this).text().replace(' ', '+');

    makeAjaxCall(q)
}

function handleSearchClick(e) {
    e.preventDefault()
    const input = $('#user-input').val();
    $('#user-input').val('');
    const q = input.replace(' ', '+');
    makeAjaxCall(q)
    topics.push(input);
    createButtons();
}

function makeAjaxCall(q) {
    $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            apiKey: apiKey,
            q: q,
            limit: 10
        }
    }).then(function(response) {
        $('#results').empty();

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