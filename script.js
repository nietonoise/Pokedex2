// Function to fetch Pokémon data by type
async function fetchPokemonByType(type) {
    const section = document.querySelector('main section');
    section.innerHTML = `<p>Loading ${type}-type Pokémon...</p>`;

    try {
        // Fetch Pokémon list of a specific type
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();
        const randomPokemon = data.pokemon[Math.floor(Math.random() * data.pokemon.length)].pokemon;

        // Fetch details of a random Pokémon
        const pokemonResponse = await fetch(randomPokemon.url);
        const pokemonData = await pokemonResponse.json();

        // Populate the section with Pokémon details
        section.innerHTML = `
            <h2>#${pokemonData.id} - ${pokemonData.name.toUpperCase()}</h2>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            <p><strong>Type:</strong> ${pokemonData.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>Abilities:</strong> ${pokemonData.abilities.map(a => a.ability.name).join(', ')}</p>
            <p><strong>Stats:</strong></p>
            <ul>
                ${pokemonData.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
            </ul>
        `;
    } catch (error) {
        section.innerHTML = `<p>Failed to load Pokémon data. Please try again.</p>`;
        console.error(error);
    }
}