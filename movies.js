const url = "https://cute-savory-grandparent.glitch.me/movies"

function getAllMovies() {
    fetch(url).then(response =>
        response.json().then(data => {
            $('#card-div').html("")
            for (let i = 0; i < data.length; i++) {
                if (data[i].title === undefined) {
                } else {
                    let title = data[i].title.toUpperCase();
                    let imgTag = (data[i].poster) ? `<img className="card-img-top" style="height: 429px" src="${data[i].poster}" alt="Card image cap">` : "";
                    //language=HTML
                    $('#card-div').append(`
                        <div class="card-deck">
                            <div class="card m-4" id="movie0" style="width: 18rem;">
                                ${imgTag}
                                <div class="card-body">
                                    <h5 contenteditable="true" id="card-title-${data[i].id}" class="card-title">${title}</h5>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li id="id" style="display:none">${data[i].id}</li>
                                    <li contenteditable="true" id="actors-${data[i].id}" class="list-group-item"
                                        style="height: 121px">${data[i].actors}
                                    </li>
                                    <li contenteditable="true" id="director-${data[i].id}" class="list-group-item">
                                        ${data[i].director}
                                    </li>
                                    <li contenteditable="true" id="genre-${data[i].id}" class="list-group-item">${data[i].genre}</li>
                                    <li contenteditable="true" id="plot-${data[i].id}" class="list-group-item">${data[i].plot}</li>
                                </ul>
                                <input type="button" value="save my edits" class="edit-button" onclick="saveEdits(${data[i].id})"/>
                                <input type="button" value="delete" onclick="deleteCard(${data[i].id})"/>

                            </div>
                        </div>
                    `)
                }
            }
            $('p').css("display", "none");
        })
    );
}

function newMovies(newTitle, newCast, newDirector, newGenre, newDescription) {
    const userInput = {
        title: newTitle,
        actors: newCast,
        genre: newGenre
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
        newMovies(newTitle, newCast, newDirector, newGenre, newDescription);
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
    const userInput = {
        title: editedTitle,
        actors: editedCast,
        director: editedDirector,
        genre: editedGenre,
        plot: editedDescription
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


getAllMovies();
