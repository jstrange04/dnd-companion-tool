import { useEffect, useState } from "react";
import { CharacterService, PartyService } from "../../services";
import { useNavigate } from "react-router-dom";
import NavigationRoutes from "../../constants/routes";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Characters = () => {
  const [parties, setParties] = useState<any>([]);
  const [characters, setCharacters] = useState<any>([]);
  const navigate = useNavigate();

  const handleCreateCharacter = () => {
    navigate(NavigationRoutes.CreateCharacter);
  };

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
      <Box
        sx={{
          height: 50,
          width: "100%",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          marginLeft: 10,
        }}
      >
        <h1>Characters</h1>
      </Box>
      <Box
        sx={{
          height: "auto",
          width: "90%",
          marginLeft: 10,
          fontFamily: "monospace",
        }}
      >
        <ul>
          {characters.map((character: any) => (
            <li key={character.id}>
              {character.name +
                ` Race: ` +
                character.race +
                ` Class: ` +
                character.char_class +
                ` Subclass: ` +
                character.sub_class +
                ` Level: ` +
                character.level}
            </li>
          ))}
        </ul>
      </Box>
      <Box
        sx={{
          height: "auto",
          width: "90%",
          marginLeft: 10,
          fontFamily: "monospace",
        }}
      >
        <ul>
          {parties.map((party: any) => (
            <li key={party.id}>{party.party_name}</li>
          ))}
        </ul>
      </Box>
      <Box
        sx={{
          height: 50,
          width: "100%",
          marginLeft: 10,
        }}
      >
        <Button onClick={handleCreateCharacter}>Create a Character</Button>
      </Box>
    </div>
  );
};

export default Characters;
