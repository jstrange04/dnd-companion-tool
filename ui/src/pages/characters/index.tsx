import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationRoutes from "../../constants/routes";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import { CharacterService } from "../../services";

const Characters = () => {
  const [parties, setParties] = useState<any>([]);
  const [characters, setCharacters] = useState<any>([]);
  const [currentCharacter, setCurrentCharacter] = useState<any>([]);
  const navigate = useNavigate();

  const handleCreateCharacter = () => {
    navigate(NavigationRoutes.CreateCharacter);
  };

  const fetchCharacterData = async () => {
    const character = await CharacterService.getCharacter(1);
    setCurrentCharacter(character.data);
    console.log(currentCharacter)
  }

  const fetchData = async () => {
    const userData = JSON.parse(localStorage.getItem("userDetails") ?? "{}");
    const characterRetrieved = userData.characters;
    const partiesRetrieved = userData.characters
      .flatMap((x: any) => x.parties)
      .flat(1);

    setParties(partiesRetrieved);
    setCharacters(characterRetrieved);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Paper
        sx={{
          height: "100%",
          width: "100%",
          marginTop: 7,
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          padding: 1
        }}
      >
        <Box
          sx={{
            height: 70,
            width: "100%",
            fontFamily: "EnchantedLand",
            fontSize: 30,
            letterSpacing: ".3rem",
            marginLeft: 1,
          }}
        >
          <h1>Characters</h1>
        </Box>
        <Box
          sx={{
            width: "100%",
            fontFamily: "EnchantedLand",
            fontWeight: 700,
            marginTop: 7,
            marginLeft: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              fontFamily: "EnchantedLand",
              fontSize: 26,
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
            }}
          >
            {characters.map((character: any) => (
              <Card
                sx={{
                  height: 300,
                  fontFamily: "EnchantedLand",
                  width: 300,
                  fontWeight: 500,
                  letterSpacing: ".2rem",
                  justifyContent: "left",
                  alignContent: "left",
                  fontSize: 22,
                  margin: 1,
                  padding: 1,
                }}
                onClick={fetchCharacterData}
              >
                <p>
                  <em>Name: </em> {character.name}
                </p>
                <p>
                  <em>Level: </em> {character.level}
                </p>
                <p>
                  <em>Race: </em> {character.race}
                </p>
                <p>
                  <em>Class: </em> {character.class}
                </p>
              </Card>
            ))}
          </Box>
          <Button
            type="submit"
            onClick={handleCreateCharacter}
            sx={{
              fontFamily: "EnchantedLand",
              fontWeight: 500,
              fontSize: 20,
              color: "orange",
            }}
          >
            Create a Character
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default Characters;
