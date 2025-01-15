// OBTENCION DE DATOS DE LA API 
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

async function fetchPokemon(nameOrId) {
  try {
    const response = await fetch(`${API_URL}${nameOrId}`);
    if (!response.ok) throw new Error("Pokémon not found");
    const pokemon = await response.json();
    return pokemon;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Ejemplo: Buscar a Gible
fetchPokemon("gible").then(pokemon => console.log(pokemon));

//MOSTRAR LOS POKEMON EN LISTA
document.getElementById("search").addEventListener("input", async (e) => {
    const query = e.target.value.toLowerCase();
    if (query) {
      const pokemon = await fetchPokemon(query);
      if (pokemon) {
        const list = document.getElementById("pokemon-list");
        list.innerHTML = `
          <div>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <button onclick="addToTeam('${pokemon.name}')">Add to Team</button>
          </div>`;
      }
    }
  });
  
//CREACION DE EQUIPOS POKEMON
const team = [];

function addToTeam(name) {
  if (team.length < 6 && !team.includes(name)) {
    team.push(name);
    updateTeamDisplay();
  } else {
    alert("Your team is full or this Pokémon is already in the team!");
  }
}

function updateTeamDisplay() {
  const teamList = document.getElementById("team");
  teamList.innerHTML = team.map(p => `<li>${p}</li>`).join("");
}
