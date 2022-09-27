// Criado uma Arrow Function que tem o nome ID como seu parâmetro.
// Ao invés de ter que mudar o id no final do link da api o ID vai ser responsável por isso.
const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

// Foi criado uma Arrow Function que é responsável por requisitar e mostrar o pokemon no console.
const fetchPokemon = () => {
  // Uma variável responsável por receber os resultados das requisições.
  const pokemonPromises = [];
  
  // Criado uma estrutura de repetição FOR responsável por mudar o ID.
  for(let i = 1;i <= 151 ;i++) {
    // Está colocando a informação dentro do objeto pokemonPromises.
    pokemonPromises.push(
      // O FETCH é uma função assíncrona usada para fazer a requisição. 
      // Está requisitando as informações do objeto getPokemonUrl e como seu parametro o ID do pokemon.
      fetch(getPokemonUrl(i))
      // O THEN é usado para pedir para ele realizar tal comando após terminar o anterior.
      // Está pegando a resposta da ação anterior é transformando a resposta em JSON(Objeto).
      .then((response) => (response.json()))
    );
  }

  // Está pegando todas as promessas do pokemonPromises.
  Promise.all(pokemonPromises)
  // Depois de pegar as promises ele vai pegar essas repostas e armazenar no pokemons.
  .then((pokemons) => {
    // Está pegando as informações dos pokemons e modificando a resposta, tendo como seu argumento o acumulador e o valor do elemento atual.
    const listPokemons = pokemons.reduce((accumulator, pokemon) => {
      // Está sendo responsável por selecionar o typeInfo na API e com isso selecionar o nome do tipo do pokemon.
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
      // Vai adicionando a lista no accumulator e colocando na lista do HTML.
      // Está fazendo o accumulator pegar todas as informações da requisição e criar um item de lista para cada um dos pokemons.
      accumulator += `
        <li class="card ${types[0]}">
          <img class="card-image" alt="${pokemon.name}"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
          <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
          <p class="card-subtitle">${types.join(" | ")}</p>
        </li>
      `
      // Retorna novamente para o accumulator para ele continuar criando mais elementos LI.
      return accumulator;
    }, "");
    // Está puxando o UL do HTML.
    const ul = document.querySelector('[data="pokedex"]');
    // Está modificando a UL atribuindo a ela todas as LI com todas as informações dos pokemons.
    ul.innerHTML = listPokemons;
  });
};

// Está invocando a Arrow Function.
fetchPokemon();