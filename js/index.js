const btn_1 = document.querySelector(".btn-1");
const btn_2 = document.querySelector(".btn-2");
const list = document.querySelector(".list");
const pokemon_info = document.querySelector("card-pokemon-information");
const img_logo = document.querySelector(".img-logo");
img_logo.addEventListener('click', function(){
    window.open("index.html", "_self");
});
btn_1.addEventListener('click', function () {
    buscarTodosPokemons();
});

async function buscarTodosPokemons() {
    try {
        let resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        let dados = await resposta.json();
        // console.log(dados);
        dados.results.forEach(async function (pokemon) {
            
            let nome = pokemon.name;
            let respostaPokemon = await fetch(pokemon.url);
            let dadosPokemon = await respostaPokemon.json();
            let idPokemon = dadosPokemon.id;
            let img = dadosPokemon.sprites.front_shiny;
            let urlCor = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}/`); 
            let dadosCor = await urlCor.json();
            let corPokemon = dadosCor.color.name;
            list.innerHTML +=
            `<ion-list style="--ion-background-color: ${corPokemon};">
            <ion-item>
            <ion-thumbnail slot="start">
            <img alt="Silhouette of mountains" src="${img}" />
            </ion-thumbnail>
            <ion-label>${nome}</ion-label>
            <ion-button class="btn_2" onclick="mostrar(${idPokemon})"><img src="img/pokeball.png" alt="Imagem indisponível"></ion-button>
            </ion-item>
            </ion-list>`
            // estava usando o elemento
        });
        btn_1.style.display = 'none';
    }
    catch (erro){
        alert('Servidor ocupado');
        console.log(erro);
    }
}
async function mostrar(idPokemon) {
    // não consigo pegar esse atributo
    try {
        let url = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`);
        let urlCor = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}/`); 
        let dados = await url.json();
        let dadosCor = await urlCor.json();
        console.log(dados);
        let id = dados.id;
        let nomePokemon = dados.name;
        let imgtrasPokemon = dados.sprites.back_default;
        let imgPokemonBrilhanteTras = dados.sprites.back_shiny;
        let imgPokemonFrentePadrao = dados.sprites.front_default;
        let imgPokemonFrenteBrilhante = dados.sprites.front_shiny;
        let habilidade1 = dados.abilities[0].ability.name;
        let experiencia = dados.base_experience;
        let peso = dados.weight;
        let tipo = dados.types[0].type.name;
        let corPokemon = dadosCor.color.name;

        list.innerHTML =
            `<section class="pokemon-information" style="background-color: ${corPokemon};">
            <h1 class="informacoes-pokemon-h1">${nomePokemon}</h1>
            <ion-slides class="slides-pokemmon" pager="true" [options]="slideOpts">
                <ion-slide class="img-slide">
                    <img src="${imgPokemonFrentePadrao}" alt="unavailable">
                </ion-slide>
                <ion-slide class="img-slide">
                    <img src="${imgPokemonFrenteBrilhante}" alt="unavailable">
                </ion-slide>
                <ion-slide class="img-slide">
                    <img src="${imgtrasPokemon}" alt="unavailable">
                </ion-slide>
                <ion-slide class="img-slide">
                <img src="${imgPokemonBrilhanteTras}" alt="unavailable">
                </ion-slide>
            </ion-slides>
            <div class="informacao-pokemon">
                <ul>
                    <li>ID: ${id}</li>
                    <li>Type: ${tipo}</li>
                    <li>Ability 1: ${habilidade1}</li>
                    <li>Experience: ${experiencia}</li>
                    <li>Weight: ${peso}</li>
                </ul>
            </div>
        </section>`;
    }
    catch(erro) {
        alert("Servidor ocupado");
        console.log(erro);
    }
}