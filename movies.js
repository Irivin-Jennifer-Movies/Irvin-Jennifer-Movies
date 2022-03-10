const url = "https://cute-savory-grandparent.glitch.me/movies"

function getAllMovies() {
	fetch(url).then(response =>
		response.json().then(data => {
			$('#card-div').html("")
			for (let i = 0; i < data.length; i++) {
				if (data[i].title === undefined) {
				} else {
					let title = data[i].title.toUpperCase();
					let imgTag = (data[i].poster) ? `<img class="card-img-top" style="height: 429px" src="${data[i].poster}" id = "posterImage-${data[i].id}" alt="Card image cap">` : "";
					//language=HTML
					let html = `
                        <div class="card-deck">
                            <div class="card m-4" id="movie0-${data[i].id}" style="width: 18rem;">
                                ${imgTag}
                                <li class="card-info"> TITLE</li>
                                <div class="card-body">
                                    <p id="card-title-${data[i].id}" class="card-title"><span
                                            contenteditable="true">${title}</span></p>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li id="id" style="display:none">${data[i].id}</li>
                                    <li class="card-info"> ACTORS</li>
                                    <li id="actors-${data[i].id}" class="list-group-item"
                                        style="height: 150px"><span contenteditable="true">${data[i].actors}</span>
                                    </li>
                                    <li class="card-info"> DIRECTOR</li>
                                    <li id="director-${data[i].id}" class="list-group-item">
                                        <span contenteditable="true">${data[i].director}</span>
                                    </li>
                                    <li class="card-info"> GENRE</li>
                                    <li id="genre-${data[i].id}" class="list-group-item"><span
                                            contenteditable="true">${data[i].genre}</span></li>
                                    <li class="card-info"> PLOT</li>
                                    <li id="plot-${data[i].id}" class="list-group-item"><span
                                            contenteditable="true">${data[i].plot}</span></li>
                                    <li class="card-info"> RATING</li>
                                    <li  id="rating-${data[i].id}" class="list-group-item d-none"><span
                                            contenteditable="true">${data[i].rating}</span></li>
                                    <li>
                                        <div class="rating">`;
                    for (let j = 1; j <= 5; j++) {
                        if (j <= data[i].rating ){
                            html += `<i value="${j}" id="star-${j}" data-id="${data[i].id}" class="fa fa-star ratingStar"></i>`
                        } else {
                            html += `<i value="${j}" id="star-${j}" data-id="${data[i].id}" class="fa fa-star"></i>`
                        }
                    }
                                       html += `
                                        </div>
                                    </li>
                                </ul>
                                <input type="button" value="Save My Edits" class="edit-button"
                                       onclick="saveEdits(${data[i].id})"/>
                                <input type="button" value="Delete" class="delete-button"
                                       onclick="deleteCard(${data[i].id})"/>
                            </div>
                        </div>
					`;
					$('#card-div').append(html);
				}
			}
			$('.gif').css("display", "none");
			$('#movies-header').css("display", "block");
			$('#movie-form').css("display", "block");
			$('#search-bar').css('display', 'block')

			// Setup rating listeners after data is loaded.
			// there were no movie elements to add the star icons for
			let iconElements = $("i")
			$(".fa-star").click((event) => {
				const rating = parseInt(event.target.id.split("-")[1]);

				// console.log(event.target)
				let recordId = $(event.target).data("id")
				console.log($(event.target))
				//data record for the id
				$(`#rating-${recordId}`).text(rating)
				updateRating(rating, event.target);
			})
			search (data);
		})
	);
}
function search(data){
	$('#search-bar').on('input', (e)=>{
		let value = e.target.value
		for (let i = 0; i < data.length; i++) {
			if (data[i].title === undefined){
				continue
			}
			if (data[i].title.includes(value.toLowerCase()) === false){
				document.querySelector(`#movie0-${data[i].id}`).classList.add("hide");
			} 			if (data[i].title.includes(value.toLowerCase()) === true) {
				document.querySelector(`#movie0-${data[i].id}`).classList.remove("hide");
			}
		}
	})
}



function newMovies(newPoster, newTitle, newCast, newDirector, newGenre, newDescription, newRating) {

	$('#new-movie-submit').attr('disabled', true);
	const userInput = {
		title: newTitle,
		poster: newPoster,
		director: newDirector,
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
		let newPoster = $('#newPoster').val();
		let newTitle = $('#newTitle').val();
		let newCast = $('#newCast').val();
		let newDirector = $('#newDirector').val();
		let newGenre = $('#newGenre').val();
		let newDescription = $('#newDescription').val();
		let newRating = $('#newRating').val();
		$('#newPoster').val("");
		$('#newTitle').val("");
		$('#newCast').val("");
		$('#newDirector').val("");
		$('#newGenre').val("");
		$('#newDescription').val("");
		$('#newRating').val("");
		newMovies(newPoster ,newTitle, newCast, newDirector, newGenre, newDescription, newRating);
	});
}
// const star = parseInt(element.id.split("-")[1]);

function saveEdits(id) {
	let id1 = id;
	let poster1 = $("#posterImage-" + id).attr("src");
	let editedTitle = $('#card-title-' + id).text().toLowerCase();
	let editedCast = $('#actors-' + id).text();
	let editedDirector = $('#director-' + id).text();
	let editedGenre = $('#genre-' + id).text();
	let editedDescription = $('#plot-' + id).text();
	let editedRating = $('#rating-' + id).text();
	// let editedRating = ($("#star-").attr("value"));
	// console.log(editedRating)

	const userInput = {
		poster: poster1,
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


//creating a rate but not not saving the rate YET
function updateRating(userRating, targetElement) {
	const siblings = Array.from(targetElement.parentElement.getElementsByTagName('i'));
	// targetElement is each of the i (star) elements
	siblings.forEach(element => {
		const ratingToCheck = parseInt(element.id.split("-")[1]);
		// splitting out the star part of ID to only read the number of the element
		if (ratingToCheck <= userRating) {
			if (!element.classList.contains("ratingStar")) {
				element.classList.add("ratingStar");
			}
		} else {
			element.classList.remove("ratingStar");
		}
	});
	// TODO: save the rating value
}


setTimeout(getAllMovies, 2000);

