import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CampaignService, PartyService } from "../../services";
import NavigationRoutes from "../../constants/routes";

const Campaigns = () => {
  const [parties, setParties] = useState<any>([]);
  const [campaigns, setCampaigns] = useState<any>([]);
  const navigate = useNavigate();

  const handleCreateCampaign = () => {
    navigate(NavigationRoutes.CreateCampaign);
  };

  const fetchData = async () => {
    const [parties, campaigns] = await Promise.all([
      PartyService.getParties(),
      CampaignService.getCampaigns(),
    ]);

    setParties(parties.data);
    setCampaigns(campaigns.data);
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
          marginTop: 10
        }}
      >
        <h1>Campaigns</h1>
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
        <Button type="submit" onClick={handleCreateCampaign}>
          Create a Campaign
        </Button>
      </Box>
      <Box sx={{ height: "auto", width: "90%", marginLeft: 10 }}>
        {campaigns.map((campaign: any) => (
          <p>{campaign.name}</p>
        ))}
      </Box>
      <Box sx={{ height: "auto", width: "90%", marginLeft: 10 }}>
        {parties.map((party: any) => (
          <p>{party.party_name}</p>
        ))}
      </Box>
    </div>
  );
};

export default Campaigns;
