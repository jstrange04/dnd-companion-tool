import NavBar from "../../components/appBar";
import { useEffect, useState } from "react";
import { CharacterService, PartyService } from "../../services";

const Parties = () => {

  const [parties, setParties] = useState<any>([]);
  const [characters, setCharacters] = useState<any>([]);

  const fetchData = async () => {
    const [parties, characters] = await Promise.all([PartyService.getParties(), CharacterService.getCharacters(),]);

    setParties(parties.data);
    setCharacters(characters.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <header>Parties</header>
      <ul>
        {parties.map((party: any) => (
          <li key={party.id}>{party.party_name}</li>
        ))}
      </ul>
      <ul>
        {characters.map((characters: any) => (
          <li key={characters.id}>{characters.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Parties;
