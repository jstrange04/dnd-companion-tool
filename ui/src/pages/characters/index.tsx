import NavBar from "../../components/navBar";
import { useEffect, useState } from "react";
import { CharacterService, PartyService } from "../../services";

const Characters = () => {
  const [parties, setParties] = useState<any>([]);
  const [characters, setCharacters] = useState<any>([]);

  const fetchData = async () => {
    const [parties, characters] = await Promise.all([
      PartyService.getParties(),
      CharacterService.getCharacters(),
    ]);

    setParties(parties.data);
    setCharacters(characters.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <header>Parties</header>
      <NavBar />
      <ul>
        {characters.map((character: any) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
      <ul>
        {parties.map((party: any) => (
          <li key={party.id}>{party.party_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Characters;
