
// o parametro async indica que vamos executar dentro da funçao codigos que nao sao ordenados.
document.querySelector('.busca').addEventListener('submit', async (event)=>{

    // Impedindo o formulário de ser enviado.
    event.preventDefault();

    // captar o que foi digitado.
    let input = document.querySelector('#searchInput').value;

    // Testar se o usuario realmente digitou algo
    if(input !== '') {

        showWarning('Loading...');

        // Consultando a cidade com aplicativo externo.
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid={da15042c8dd4708ef00481eb37e31d64&units=metric&lang=pt_br}`;
        // 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';

        let results = await fetch(url);

        let json = await results.json();

        if(json.cod == 200) {

            clearInfo();
            showInfo({

                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,

            });

        } else {

            clearInfo();
            showWarning('Place not found.');

        }

    } else {

        clearInfo();

    }

});

// Funcao para mostrar ou remover avisos
function showWarning(msg) {

    document.querySelector('.aviso').innerHTML = msg;

}

//  funcao para mostrar informacoes
function showInfo(json) {

    //sumir com o aviso de carregando.
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.temInfo').innerHTML = `${json.tempo} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km</span>`;
    document.querySelector('.tempo img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    // Mostrar grade de resultados.
    document.querySelector('.resultado').getElementsByClassName.display = 'block';
    
}

// Função para limpar tela
function clearInfo() {

    showWarning('');
    document.querySelector('.resultado').style.display = 'none';

}