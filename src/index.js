const cards = document.querySelector('.card');

var request = new XMLHttpRequest();
request.open('GET', 'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo', true);

let data = null;
let countUsuario = 0;
let countSexoFemale = 0;
let countSexoMale = 0;
let sumIdade = 0;
let mediaIdade = 0;

request.onload = function() {
    // pega os dados da API
    data = JSON.parse(this.response);
} 

// pega os dados digitados no campo input (pesquisa)
var filtro = document.getElementById('filtro-pesquisa');

document.getElementById('dados').innerHTML = "Nenhum usuário filtrado! ";

filtro.onkeyup = function() {
    
        var nomeFiltro = filtro.value.toLowerCase().trim();
        //var str = nomeFiltro.replace(/\s/g, ''); //função para tirar todos os espaços

        document.getElementById('itemContainer').innerHTML = "";
        countUsuario = 0;
        mediaIdade = 0;
        sumIdade = 0;
        countSexoMale = 0;
        countSexoFemale = 0;

        data.results.forEach(x => {
            var names = x.name.first + " " + x.name.last;
            //var namesSemEspaco = names.replace(/\s/g, ''); //função para tirar todos os espaços
            if(names.toLowerCase().indexOf(nomeFiltro) >= 0 && nomeFiltro != ""){ 
                countUsuario ++;
                buildCard(x.name, x.gender, x.picture, x.dob);
                calculosEstatisticas(x.gender, x.dob, countUsuario);
            }
        });

        if(nomeFiltro == ""){
            document.getElementById('dados').innerHTML = "Nenhum usuário filtrado! ";
            document.getElementById('itemContainer').innerHTML = "";
            document.getElementById('dadosEstatisticas').innerHTML = "";
            return;
        };
        
        document.getElementById('dados').innerHTML = countUsuario + " usuário(s) encontrado(s)";
        buildCardEstatisticas();
};

const buildCard = (name, gender, picture, dob) => {
    const html = `

        <img src="${picture.thumbnail}" class="card-img-top br0" alt="...">
        <div class="texts">
            <strong>${name.title} ${name.first} ${name.last}</strong>
            <p>Idade: ${dob.age}</p>
            <strong>Sexo: ${gender}</strong>
        </div>

    `;

    const div = document.createElement('li');
    div.innerHTML = html;

    cards.appendChild(div);
}

const buildCardEstatisticas = () => {

    mediaIdade = sumIdade / countUsuario;
    var mediaIdadeArredondado = parseFloat(mediaIdade.toFixed(2));

    const html = `
    
        <p> <b>Usuários do Sexo Feminino:</b> ${countSexoFemale} </p>
        <p> <b>Usuários do Sexo Masculino:</b> ${countSexoMale} </p>
        <p> <b>Total da Soma das Idades:</b> ${sumIdade} </p>
        <p> <b>Média das Idades:</b> ${mediaIdadeArredondado} </p>

    `;

    const div = document.getElementById('dadosEstatisticas');
    div.innerHTML = html;
}

const calculosEstatisticas = (gender, dob) => {

    if(gender == "female"){
        countSexoFemale ++;
    }else {
        countSexoMale ++;
    };

    sumIdade += dob.age;
}

request.send();