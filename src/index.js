const cards = document.querySelector('.card');

var request = new XMLHttpRequest();
request.open('GET', 'https://randomuser.me/api/?seed=javascript&results=10&nat=BR&noinfo', true);


request.onload = function() {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  
  console.log(data);
  
    if (request.status >= 200 && request.status < 400) {
        data.results.forEach(x => {
            buildCard(x.gender, x.name);
        });
    }else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
}


const buildCard = (gender, name) => {
    const html = `

        <strong>${name.title} ${name.first} ${name.last}</strong>
        <strong>${gender}</strong>

    `;

    const div = document.createElement('li');
    div.innerHTML = html;

    cards.appendChild(div);
}

request.send();