const url = "https://cute-savory-grandparent.glitch.me/movies"

function getAllMovies() {
    fetch(url).then(response =>
        response.json().then(data => {
            $('#card-div').html("")
            for (let i = 0; i < data.length; i++) {
                if (data[i].title === undefined) {
                } else {
                    let title = data[i].title.toUpperCase();
                    let imgTag = (data[i].poster) ? `<img class="card-img-top" style="height: 429px" src="${data[i].poster}" alt="Card image cap">` : "";
                    //language=HTML
                    $('#card-div').append(`
                        <div class="card-deck">
                            <div class="card m-4" id="movie0" style="width: 18rem;">
                                ${imgTag}
                                <div class="card-body">
                                    <h5 id="card-title-${data[i].id}" class="card-title">Title: <span contenteditable="true">${title}</span></h5>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li id="id" style="display:none">${data[i].id}</li>
                                    <li id="actors-${data[i].id}" class="list-group-item"
                                        style="height: 121px">Actors: <span contenteditable="true">${data[i].actors}</span>
                                    </li>
                                    <li id="director-${data[i].id}" class="list-group-item">
                                        Directors: <span contenteditable="true">${data[i].director}</span>
                                    </li>
                                    <li id="genre-${data[i].id}" class="list-group-item">Genres: <span contenteditable="true">${data[i].genre}</span></li>
                                    <li id="plot-${data[i].id}" class="list-group-item">Plot: <span contenteditable="true">${data[i].plot}</span></li>
                                    <li id="rating-${data[i].id}" class="list-group-item">Rating: <span contenteditable="true">${data[i].rating}</span></li>
                                </ul>
                                <input type="button" value="Save My Edits" class="edit-button" onclick="saveEdits(${data[i].id})"/>
                                <input type="button" value="Delete" class="delete-button" onclick="deleteCard(${data[i].id})"/>
                            </div>
                        </div>
                    `)
                }
            }
            $('.gif').css("display", "none");
            $('#movies-header').css("display", "block");
            $('#movie-form').css("display", "block");

        })
    );
}

function newMovies(newTitle, newCast, newDirector, newGenre, newDescription, newRating) {

	$('#new-movie-submit').attr('disabled', true);
    const userInput = {
        title: newTitle,
        actors: newCast,
        genre: newGenre,
		plot: newDescription,
        rating: newRating
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
    };

    fetch(url, options)
        .then(response => {
            console.log(response)
			$('#new-movie-submit').attr('disabled', false);
            getAllMovies()
        })
}

function onLoad() {

    $("#movie-form").on("submit", (e) => {
        e.preventDefault()
        let newTitle = $('#newTitle').val();
        let newCast = $('#newCast').val();
        let newDirector = $('#newDirector').val();
        let newGenre = $('#newGenre').val();
        let newDescription = $('#newDescription').val();
        let newRating = $('#newRating').val();
        newMovies(newTitle, newCast, newDirector, newGenre, newDescription, newRating);
    });
}

function saveEdits(id) {
    let id1 = id;
    let editedTitle = $('#card-title-' + id ).text();
    console.log(editedTitle)
    let editedCast = $('#actors-' + id ).text();
    let editedDirector = $('#director-' + id ).text();
    let editedGenre = $('#genre-' + id ).text();
    let editedDescription = $('#plot-' + id ).text();
    let editedRating = $('#rating-' + id ).text();
    const userInput = {
        title: editedTitle,
        actors: editedCast,
        director: editedDirector,
        genre: editedGenre,
        plot: editedDescription,
        rating: editedRating
    }
    fetch(url + "/" + id1, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput),
    }).then(response => {
        console.log(response)
        getAllMovies()
    });
}


function deleteCard(id) {
    let id1 = id;
    fetch(url + "/" + id1, {
        method: 'DELETE'
    }).then(response => {
        console.log(response)
        getAllMovies()
    });
    console.log(id1)
}



setTimeout(getAllMovies, 3000);
// setTimeout($("#movies-form"), 3000)

