import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterService } from "../../../services";
import NavigationRoutes from "../../../constants/routes";

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
    debugger;
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
        character.name + " " + character.race + " " + character.class + " " + character.subClass + " " + character.level + " " + character.strength + " " + character.dexterity
      );
      CreateCharacter(character);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <header>Create a Character</header>
      <div className="box">
        <header>The Companion Tool</header>
        <div className="box">
          <div className="email">
            <input
              placeholder="Enter Name"
              value={character.name}
              onChange={handleNameChange}
            ></input>
            <input
              placeholder="Enter Race"
              value={character.race}
              onChange={handleRaceChange}
            ></input>
            <input
              placeholder="Enter Class"
              value={character.charClass}
              onChange={handleClassChange}
            ></input>
            <input
              placeholder="Enter Sub Class"
              value={character.subClass}
              onChange={handleSubClassChange}
            ></input>
            <input
              placeholder="Enter Level"
              value={character.level}
              onChange={handleLevelChange}
            ></input>
            <input
              placeholder="Enter Strength"
              value={character.strength}
              onChange={handleStrengthChange}
            ></input>
            <input
              placeholder="Enter Dexterity"
              value={character.dexterity}
              onChange={handleDexterityChange}
            ></input>
            <input
              placeholder="Enter Constitution"
              value={character.constitution}
              onChange={handleConstitutionChange}
            ></input>
            <input
              placeholder="Enter Wisdom"
              value={character.wisdom}
              onChange={handleWisdomChange}
            ></input>
            <input
              placeholder="Enter Intelligence"
              value={character.intelligence}
              onChange={handleIntelligenceChange}
            ></input>
            <input
              placeholder="Enter Charisma"
              value={character.charisma}
              onChange={handleCharismaChange}
            ></input>
            <input
              placeholder="Enter Armour Class"
              value={character.armourClass}
              onChange={handleArmourClassChange}
            ></input>
            <input
              placeholder="Enter Hit Points"
              value={character.hitPoints}
              onChange={handleHitPointsChange}
            ></input>
            <input
              placeholder="Enter Movement Speed"
              value={character.movementSpeed}
              onChange={handleMovementSpeedChange}
            ></input>
            <button type="submit" onClick={handleRegister}>
              Create Character
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacter;
