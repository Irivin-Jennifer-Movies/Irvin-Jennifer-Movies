

fetch("https://cute-savory-grandparent.glitch.me/movies").then(response =>
    response.json().then(data => {
        for (let i =0; i < 16; i++){
            console.log(data[i].title);
        }
        $('p').css("display", "none")
    })
);

