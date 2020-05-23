const cards = document.querySelector('.card');

var request = new XMLHttpRequest();
request.open('GET', 'https://randomuser.me/api/?seed=javascript&results=10&nat=BR&noinfo', true);

let data = null;

request.onload = function() {
    data = JSON.parse(this.response);
    console.log(data);
}

var filtro = document.getElementById('filtro-pesquisa');

filtro.onkeyup = function() {
    var nomeFiltro = filtro.value;
    document.getElementById('itemContainer').innerHTML = "";

    data.results.forEach(x => {      
        if((x.name.first.toLowerCase().indexOf(nomeFiltro) >= 0) || (x.name.last.toLowerCase().indexOf(nomeFiltro) >= 0)){
            buildCard(x.name, x.gender, x.picture, x.registered);
        }
    });
};

const buildCard = (name, gender, picture, registered) => {
    const html = `

        <strong>${name.title} ${name.first} ${name.last}</strong>
        <strong>${gender}</strong>

    `;

    const div = document.createElement('li');
    div.innerHTML = html;

    cards.appendChild(div);
}

request.send();