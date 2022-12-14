import NavBar from "../../components/appBar";
import { useEffect, useState } from "react";
import { CharacterService, PartyService } from "../../services";
import { useNavigate } from "react-router-dom";
import NavigationRoutes from "../../constants/routes";

const Characters = () => {
  const [parties, setParties] = useState<any>([]);
  const [characters, setCharacters] = useState<any>([]);
  const navigate = useNavigate();

  const handleCreateCharacter = () => {
    navigate(NavigationRoutes.CreateCharacter);
  }

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
      <NavBar />
      <header>Characters</header>
      <ul>
        {characters.map((character: any) => (
          <li key={character.id}>{character.name + ` Race: ` + character.race + ` Class: ` + character.char_class + ` Subclass: ` + character.sub_class + ` Level: ` + character.level}</li>
        ))}
      </ul>
      <ul>
        {parties.map((party: any) => (
          <li key={party.id}>{party.party_name}</li>
        ))}
      </ul>
      <button onClick={handleCreateCharacter}>Create a Character</button>
    </div>
  );
};

export default Characters;
