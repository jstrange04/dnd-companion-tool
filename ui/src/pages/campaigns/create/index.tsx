import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CampaignService, PartyService } from "../../../services";
import NavigationRoutes from "../../../constants/routes";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";

const initialCampaignData = { name: "", desc: "", image: "", parites: [] };

const campaignReducer = (state: any, action: any) => {
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
    field: "party_name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "party_level",
    headerName: "Level",
    type: "number",
    width: 50,
    editable: true,
  },
];

const CreateCampaign = () => {
  const [campaign, dispatch] = useReducer(campaignReducer, initialCampaignData);
  const [parties, setParties] = useState<any>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    const [parties] = await Promise.all([PartyService.getParties()]);
    setParties(parties.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNameChange = (event: any) => {
    dispatch({ type: "NAME", value: event.target.value });
  };

  const handleDescChange = (event: any) => {
    dispatch({ type: "DESC", value: event.target.value });
  };

  const handleImageChange = (event: any) => {
    dispatch({ type: "IMAGE", value: event.target.value });
  };

  const handlePartiesChange = (event: any) => {
    dispatch({ type: "PARTIES", value: event.target.value });
  };

  const CreateCampaign = async (campaign: any) => {
    const response = await CampaignService.createCampaign(
      campaign.name,
      campaign.desc,
      campaign.image,
      campaign.parties
    );
    navigate(NavigationRoutes.Campaigns);
    return response.data;
  };

  const handleCreateCampaign = () => {
    try {
      console.log(campaign.name + " " + campaign.desc);
      CreateCampaign(campaign);
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
        }}
      >
        <h1>Create a Campaign</h1>
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
          value={campaign.name}
          onChange={handleNameChange}
        ></TextField>
        <TextField
          placeholder="Enter Description"
          value={campaign.race}
          onChange={handleDescChange}
        ></TextField>
        <TextField
          placeholder="Enter Image (Optional)"
          value={campaign.charClass}
          onChange={handleImageChange}
        ></TextField>
        <TextField
          placeholder="Enter Parties"
          value={campaign.subClass}
          onChange={handlePartiesChange}
        ></TextField>
      </Box>
      <Box sx={{ height: 400, width: "90%", marginLeft: 10 }}>
        <DataGrid
          rows={parties}
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
        {/* <Button type="submit" onClick={handleAddCharacter}>
          Add
        </Button> */}
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
        <Button type="submit" onClick={handleCreateCampaign}>
          Create Campaign
        </Button>
      </Box>
    </div>
  );
};

export default CreateCampaign;
