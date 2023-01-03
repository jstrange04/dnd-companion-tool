import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterService, PartyService } from "../../../services";
import NavigationRoutes from "../../../constants/routes";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { TextField } from "@mui/material";

import "./index.css"

const initialPartyData = { party_name: "", party_level: 0, parties: [] };

const partyReducer = (state: any, action: any) => {
  switch (action.type) {
    case "NAME":
      return { ...state, party_name: action.value };
    case "LEVEL":
      return { ...state, party_level: action.value };
    case "PARTIES":
      return { ...state, parties: action.value };
    default:
      return state;
  }
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 40 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "race",
    headerName: "Race",
    width: 150,
    editable: true,
  },
  {
    field: "char_class",
    headerName: "Class",
    width: 100,
    editable: true,
  },
  {
    field: "sub_class",
    headerName: "Sub Class",
    width: 150,
    editable: true,
  },
  {
    field: "level",
    headerName: "Level",
    type: "number",
    width: 50,
    editable: true,
  },
];

const CreateParty = () => {
  const [party, dispatch] = useReducer(partyReducer, initialPartyData);
  const [characters, setCharacters] = useState<any>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const navigate = useNavigate();

  const handleNameChange = (event: any) => {
    dispatch({ type: "NAME", value: event.target.value });
  };

  const handleLevelChange = (event: any) => {
    dispatch({ type: "LEVEL", value: event.target.value });
  };

  // const handleImageChange = (event: any) => {
  //   dispatch({ type: "IMAGE", value: event.target.value });
  // };

  const fetchData = async () => {
    const [characters] = await Promise.all([CharacterService.getCharacters()]);
    setCharacters(characters.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const CreateParty = async (party: any) => {
    const response = await PartyService.createParty(party.party_name, party.party_level);
    navigate(NavigationRoutes.Parties);
    return response.data;
  };

  const handleCreateParty = () => {
    try {
      console.log(party.party_name + " " + party.party_level);
      CreateParty(party);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCharacter = () => {
    return selectionModel.map((selection: any) => <h1>{selection}</h1>);
  };

  const getLevels = () => {
    let content = [];
    let levels = 20;
    for (let i = 1; i <= levels; i++) {
      content.push(<option value={i}>{i}</option>);
    }
    return content;
  }

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
        <h1>Create a Party</h1>
      </Box>
      <Box
        sx={{
          height: 50,
          width: "100%",
          fontFamily: "monospace",
          fontWeight: 700,
          marginLeft: 10,
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
          placeholder="Enter Name"
          value={party.name}
          onChange={handleNameChange}
          sx={{
            height: 10,
            width: 250,
            fontFamily: "monospace",
          }}
        ></TextField>
        <label> Level: </label>
        <select className="select" onSelect={handleLevelChange}>
        { getLevels() }
        </select>
      </Box>
      <Box sx={{ height: 400, width: "90%", marginLeft: 10, marginBottom: 2 }}>
        <DataGrid
          rows={characters}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(newSelection: any) => {
            setSelectionModel(newSelection);
          }}
          selectionModel={selectionModel}
        />
        {selectionModel.map((selection: any) => (
          <h1>{selection}</h1>
        ))}
        <Button type="submit" onClick={handleAddCharacter}>
          Add
        </Button>
      </Box>
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
        <Button type="submit" onClick={handleCreateParty}>
          Create Party
        </Button>
      </Box>
    </div>
  );
};

export default CreateParty;
