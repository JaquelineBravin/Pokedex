const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url) //requisição da lista de pokemons
    .then((response) => response.json()) //converteu a lista para json
    .then((jsonBody) => jsonBody.results) //pegamos a lista que está dentro do json
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //transformando a lista em promessas do detalhe do pokemon e fazendo conversão pra json
    .then((detailsRequests) => Promise.all(detailsRequests)) //esperara lista ser resolvida
    .then((pokemonsDetails) => pokemonsDetails) //aqui temos a lista com os detalhes
    .catch((error) => console.log(error));
};
