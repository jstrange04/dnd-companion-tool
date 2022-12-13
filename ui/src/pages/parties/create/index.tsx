import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterService, PartyService } from "../../../services";
import NavigationRoutes from "../../../constants/routes";

const initialPartyData = { name: "", desc: "", image: "", parties: [] };

const partyReducer = (state: any, action: any) => {
  switch (action.type) {
    case "NAME":
      return { ...state, name: action.value };
    case "DESC":
      return { ...state, class: action.value };
    case "IMAGE":
      return { ...state, subClass: action.value };
    case "PARTIES":
      return { ...state, level: action.value };
    default:
      return state;
  }
};

const CreateParty = () => {
  const [party, dispatch] = useReducer(partyReducer, initialPartyData);
  const [characters, setCharacters] = useState<any>([]);

  const navigate = useNavigate();

  const handleNameChange = (event: any) => {
    dispatch({ type: "NAME", value: event.target.value });
  };

  const handleDescChange = (event: any) => {
    dispatch({ type: "DESC", value: event.target.value });
  };

  const handleImageChange = (event: any) => {
    dispatch({ type: "IMAGE", value: event.target.value });
  };

  const fetchData = async () => {
    const [characters] = await Promise.all([CharacterService.getCharacters()]);
    setCharacters(characters.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const CreateParty = async (party: any) => {
    debugger;
    const response = await PartyService.createParty(
      party.name,
      party.desc,
      party.image,
      party.parties
    );
    navigate(NavigationRoutes.Parties);
    return response.data;
  };

  const handleCreateParty = () => {
    try {
      console.log(party.party_name + " " + party.desc);
      CreateParty(party);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <header>The Companion Tool</header>
      <div className="box">
        <header>Create a Party</header>
        <div className="box">
          <div className="email">
            <input
              placeholder="Enter Name"
              value={party.name}
              onChange={handleNameChange}
            ></input>
            <input
              placeholder="Enter Description"
              value={party.desc}
              onChange={handleDescChange}
            ></input>
            <input
              placeholder="Enter Image (Optional)"
              value={party.image}
              onChange={handleImageChange}
            ></input>
            <button type="submit" onClick={handleCreateParty}>
              Create Party
            </button>
            <ul>
              {characters.map((characters: any) => (
                <li key={characters.id}>{characters.name}</li>
              ))}
            </ul>
            <select name="characters" id="cars">
                {characters.map((characters: any) => (
                  <option key={characters.id}>{characters.name}</option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateParty;
