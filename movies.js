function getAllMovies() {
fetch("https://cute-savory-grandparent.glitch.me/movies").then(response =>
	response.json().then(data => {
		for (let i = 0; i < 16; i++) {
			if (data[i].title === undefined) {
			} else {
				let title = data[i].title.toUpperCase();

				//language=HTML
				$('#card-div').append(`
                    <div class="card-deck">
                        <div class="card" id="movie0" style="width: 18rem;">
                            <img class="card-img-top" style="height: 429px" src="${data[i].poster}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item" style="height: 121px">${data[i].actors}</li>
                                <li class="list-group-item">${data[i].director}</li>
                                <li class="list-group-item">${data[i].genre}</li>
                                <li class="list-group-item">${data[i].plot}</li>
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

getAllMovies();
