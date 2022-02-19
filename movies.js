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
                        <div class="card" id="movie0" style="width: 18rem;">
                            ${imgTag}
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li id="actors" class="list-group-item" style="height: 121px">${data[i].actors}</li>
                                <li id="directors" class="list-group-item">${data[i].director}</li>
                                <li id="genre" class="list-group-item">${data[i].genre}</li>
                                <li id="plot" class="list-group-item">${data[i].plot}</li>
                            </ul>
                        </div>
                    </div>
				`)
			}
		}
		$('p').css("display", "none")
	})
);
}
function newMovies() {
    const userInput = {
        title: "",
        actors: "",
        genre: ""
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
    };

    fetch(url, options)
        .then( response => {console.log(response)
            getAllMovies()})
}
newMovies();

getAllMovies();
