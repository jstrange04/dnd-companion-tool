import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterService } from "../../../services";
import NavigationRoutes from "../../../constants/routes";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const initialCharacterData = { name: "", race: "" };

const characterReducer = (state: any, action: any) => {
  switch (action.type) {
    case "NAME":
      return { ...state, name: action.value };
    case "RACE":
      return { ...state, race: action.value };
    case "CLASS":
      return { ...state, class: action.value };
    case "SUBCLASS":
      return { ...state, subClass: action.value };
    case "LEVEL":
      return { ...state, level: action.value };
    case "STRENGTH":
      return { ...state, strength: action.value };
    case "DEXTERITY":
      return { ...state, dexterity: action.value };
    case "CONSTITUTION":
      return { ...state, constitution: action.value };
    case "WISDOM":
      return { ...state, wisdom: action.value };
    case "INTELLIGENCE":
      return { ...state, intelligence: action.value };
    case "CHARISMA":
      return { ...state, charisma: action.value };
    case "ARMOURCLASS":
      return { ...state, armourClass: action.value };
    case "HITPOINTS":
      return { ...state, hitPoints: action.value };
    case "MOVEMENTSPEED":
      return { ...state, movementSpeed: action.value };
    default:
      return state;
  }
};

const CreateCharacter = () => {
  const [character, dispatch] = useReducer(
    characterReducer,
    initialCharacterData
  );

  const navigate = useNavigate();

  const handleNameChange = (event: any) => {
    dispatch({ type: "NAME", value: event.target.value });
  };

  const handleRaceChange = (event: any) => {
    dispatch({ type: "RACE", value: event.target.value });
  };

  const handleClassChange = (event: any) => {
    dispatch({ type: "CLASS", value: event.target.value });
  };

  const handleSubClassChange = (event: any) => {
    dispatch({ type: "SUBCLASS", value: event.target.value });
  };

  const handleLevelChange = (event: any) => {
    dispatch({ type: "LEVEL", value: event.target.value });
  };

  const handleStrengthChange = (event: any) => {
    dispatch({ type: "STRENGTH", value: event.target.value });
  };

  const handleDexterityChange = (event: any) => {
    dispatch({ type: "DEXTERITY", value: event.target.value });
  };

  const handleConstitutionChange = (event: any) => {
    dispatch({ type: "CONSTITUTION", value: event.target.value });
  };

  const handleWisdomChange = (event: any) => {
    dispatch({ type: "WISDOM", value: event.target.value });
  };

  const handleIntelligenceChange = (event: any) => {
    dispatch({ type: "INTELLIGENCE", value: event.target.value });
  };

  const handleCharismaChange = (event: any) => {
    dispatch({ type: "CHARISMA", value: event.target.value });
  };

  const handleArmourClassChange = (event: any) => {
    dispatch({ type: "ARMOURCLASS", value: event.target.value });
  };

  const handleHitPointsChange = (event: any) => {
    dispatch({ type: "HITPOINTS", value: event.target.value });
  };

  const handleMovementSpeedChange = (event: any) => {
    dispatch({ type: "MOVEMENTSPEED", value: event.target.value });
  };

  const CreateCharacter = async (character: any) => {
    const response = await CharacterService.createCharacter(
      character.name,
      character.race,
      character.class,
      character.subClass,
      character.level,
      character.strength,
      character.dexterity,
      character.constitution,
      character.wisdom,
      character.intelligence,
      character.charisma,
      character.armourClass,
      character.hitPoints,
      character.movementSpeed
    );
    navigate(NavigationRoutes.Characters);
    return response.data;
  };

  const handleRegister = () => {
    try {
      console.log(
        character.name +
          " " +
          character.race +
          " " +
          character.class +
          " " +
          character.subClass +
          " " +
          character.level +
          " " +
          character.strength +
          " " +
          character.dexterity
      );
      CreateCharacter(character);
    } catch (err) {
      console.log(err);
    }
  };

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
          marginTop: 10,
        }}
      >
        <h1>Create a Character</h1>
      </Box>
      <Box
        sx={{
          height: "auto",
          width: "100%",
          marginLeft: 10,
          marginTop: 5
        }}
      >
        <Grid></Grid>
        <Box
          sx={{
            height: "auto",
            width: "100%",
            fontFamily: "monospace",
            fontWeight: 700,
          }}
        >
          <label> Details: </label>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{
              height: 7,
              width: 250,
              marginLeft: 5,
            }}
            placeholder="Character Name"
            value={character.name}
            onChange={handleNameChange}
          ></TextField>
          <TextField
            id="outlined-basic"
            label="Race"
            variant="outlined"
            sx={{
              height: 7,
              width: 250,
              marginLeft: 5,
            }}
            placeholder="Enter Race"
            value={character.race}
            onChange={handleRaceChange}
          ></TextField>
          <TextField
            id="outlined-basic"
            label="Class"
            variant="outlined"
            sx={{
              height: 7,
              width: 250,
              marginLeft: 5,
            }}
            placeholder="Enter Class"
            value={character.charClass}
            onChange={handleClassChange}
          ></TextField>
          <TextField
            id="outlined-basic"
            label="Sub Class"
            variant="outlined"
            sx={{
              height: 7,
              width: 250,
              marginLeft: 5,
            }}
            placeholder="Enter Sub Class"
            value={character.subClass}
            onChange={handleSubClassChange}
          ></TextField>
          <TextField
            id="outlined-basic"
            label="Level"
            variant="outlined"
            sx={{
              height: 7,
              width: 250,
              marginLeft: 5,
            }}
            placeholder="Enter Level"
            value={character.level}
            onChange={handleLevelChange}
          ></TextField>
        </Box>
        <Box
          sx={{
            height: "auto",
            width: "100%",
            marginTop: 10,
            fontFamily: "monospace",
            fontWeight: 700,
          }}
        >
          <label> Attributes: </label>
          <TextField
            id="outlined-basic"
            label="Strength"
            variant="outlined"
            sx={{
              height: 20,
              width: 120,
              marginLeft: 5,
            }}
            placeholder="Enter Strength"
            value={character.strength}
            onChange={handleStrengthChange}
          ></TextField>
          <TextField
            id="outlined-basic"
            label="Dexterity"
            variant="outlined"
            sx={{
              height: 20,
              width: 120,
              marginLeft: 5,
            }}
            placeholder="Enter Dexterity"
            value={character.dexterity}
            onChange={handleDexterityChange}
          ></TextField>
          <TextField
            id="outlined-basic"
            label="Constitution"
            variant="outlined"
            sx={{
              height: 20,
              width: 120,
              marginLeft: 5,
            }}
            placeholder="Enter Constitution"
            value={character.constitution}
            onChange={handleConstitutionChange}
          ></TextField>
        </Box>
        <Box
          sx={{
            height: "auto",
            width: "100%",
            marginTop: 5,
            marginLeft: 15,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Wisdom"
            variant="outlined"
            sx={{
              height: 20,
              width: 120,
              marginLeft: 5,
            }}
            placeholder="Enter Wisdom"
            value={character.wisdom}
            onChange={handleWisdomChange}
          ></TextField>
          <TextField
            id="outlined-basic"
            label="Intelligence"
            variant="outlined"
            sx={{
              height: 20,
              width: 120,
              marginLeft: 5,
            }}
            placeholder="Enter Intelligence"
            value={character.intelligence}
            onChange={handleIntelligenceChange}
          ></TextField>
          <TextField
            id="outlined-basic"
            label="Charisma"
            variant="outlined"
            sx={{
              height: 20,
              width: 120,
              marginLeft: 5,
            }}
            placeholder="Enter Charisma"
            value={character.charisma}
            onChange={handleCharismaChange}
          ></TextField>
        </Box>
        <Box
          sx={{
            height: "auto",
            width: "100%",
            fontFamily: "monospace",
            fontWeight: 700,
            marginTop: 10,
          }}
        >
          <label> Stats: </label>
          <TextField
            id="outlined-basic"
            label="Armour Class"
            variant="outlined"
            sx={{
              height: 10,
              marginLeft: 5,
            }}
            placeholder="Enter Armour Class"
            value={character.armourClass}
            onChange={handleArmourClassChange}
          ></TextField>
          <TextField
            id="outlined-basic"
            label="Hit Points"
            variant="outlined"
            sx={{
              height: 10,
              marginLeft: 5,
            }}
            placeholder="Enter Hit Points"
            value={character.hitPoints}
            onChange={handleHitPointsChange}
          ></TextField>
          <TextField
            id="outlined-basic"
            label="Movement Speed"
            variant="outlined"
            sx={{
              height: 10,
              marginLeft: 5,
            }}
            placeholder="Enter Movement Speed"
            value={character.movementSpeed}
            onChange={handleMovementSpeedChange}
          ></TextField>
        </Box>
      </Box>
      <Box
        sx={{
          height: 50,
          width: "100%",
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        <Button type="submit" onClick={handleRegister}>
          Create Character
        </Button>
      </Box>
    </div>
  );
};

export default CreateCharacter;
