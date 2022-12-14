import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { CampaignService } from "../../../services";
import NavigationRoutes from "../../../constants/routes";
import NavBar from "../../../components/appBar";

const initialCampaignData = { name: "", desc: "", image: "", parites: []};

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

const CreateCampaign = () => {
  const [campaign, dispatch] = useReducer(
    campaignReducer,
    initialCampaignData
  );

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

  const handlePartiesChange = (event: any) => {
    dispatch({ type: "PARTIES", value: event.target.value });
  };


  const CreateCampaign = async (campaign: any) => {
    debugger;
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
      console.log(
        campaign.name + " " + campaign.desc);
      CreateCampaign(campaign);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar/>
      <header>Create a Campaign</header>
      <div className="box">
        <header>The Companion Tool</header>
        <div className="box">
          <div className="email">
            <input
              placeholder="Enter Name"
              value={campaign.name}
              onChange={handleNameChange}
            ></input>
            <input
              placeholder="Enter Description"
              value={campaign.race}
              onChange={handleDescChange}
            ></input>
            <input
              placeholder="Enter Image (Optional)"
              value={campaign.charClass}
              onChange={handleImageChange}
            ></input>
            <input
              placeholder="Enter Parties"
              value={campaign.subClass}
              onChange={handlePartiesChange}
            ></input>
            <button type="submit" onClick={handleCreateCampaign}>
              Create Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
