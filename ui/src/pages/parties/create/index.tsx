import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterService, PartyService } from "../../../services";
import NavigationRoutes from "../../../constants/routes";
import Button from "@mui/material/Button";
import "./index.css";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { TextField } from "@mui/material";

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

  const handleAddCharacter = () => {
    return selectionModel.map((selection: any) => <h1>{selection}</h1>);
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
          letterSpacing: ".3rem",
          marginLeft: 10,
        }}
      >
        <TextField
          placeholder="Enter Name"
          value={party.name}
          onChange={handleNameChange}
        ></TextField>
        <TextField
          placeholder="Enter Description"
          value={party.desc}
          onChange={handleDescChange}
        ></TextField>
        <TextField
          placeholder="Enter Image (Optional)"
          value={party.image}
          onChange={handleImageChange}
        ></TextField>
      </Box>
      <Box sx={{ height: 400, width: "90%", marginLeft: 10 }}>
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
          <h1>{selection.name}</h1>
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
          marginLeft: 20,
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
