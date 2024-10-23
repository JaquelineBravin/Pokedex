const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const maxRecords = 300;
const limit = 15;
let offset = 0;

//console.log(pokemonList);

function loadPokemonItens(offset, limit) {
  pokeApi
    .getPokemons(offset, limit) //requisição http para buscar a lista de pokemons
    .then((pokemons = []) => {
      //recebemos a lista
      //debugger;
      const newHtml = pokemons
        .map(
          (pokemon) => `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
          <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
          </ol>

          <img
            src="${pokemon.photo}"
            alt="${pokemon.name}"
          />
        </div>
      </li>
    `
        )
        .join(""); //transformamos os pokemons em uma lista HTML, separando por um espaço (join "")
      pokemonList.innerHTML += newHtml; //imprimimos os pokemons, concatenando a pagina existente com a próxima, caso clice no botão 'more...'
    })
    .catch((error) => console.log(error));
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
