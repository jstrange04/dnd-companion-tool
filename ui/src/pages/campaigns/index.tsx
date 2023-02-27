import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationRoutes from "../../constants/routes";
import { CampaignService } from "../../services";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Campaigns = () => {
  const [parties, setParties] = useState<any>([]);
  const [campaigns, setCampaigns] = useState<any>([]);
  const [currentCampaign, setCurrentCampaign] = useState<any>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    fetchCampaignData();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleCreateCampaign = () => {
    navigate(NavigationRoutes.CreateCampaign);
  };

  const fetchCampaignData = async () => {
    const campaign = await CampaignService.getCampaign(1);
    setCurrentCampaign(campaign.data);
    console.log(campaign.data)
  }

  const fetchData = async () => {
    const userData = JSON.parse(localStorage.getItem("userDetails") ?? "{}");
    const partiesRetrieved = userData.characters
      .flatMap((x: any) => x.parties)
      .flat(1);
    const campaignsRetrieved = partiesRetrieved
      .flatMap((x: any) => x.campaigns)
      .flat(1);

    setParties(partiesRetrieved);
    setCampaigns(campaignsRetrieved);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <Paper
        sx={{
          height: "100%",
          width: "100%",
          marginTop: 7,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "start",
          padding: 1,
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
            alignContent: "start",
          }}
        >
          <h1>Campaigns</h1>
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
              justifyContent: "center",
            }}
          >
            {campaigns.map((campaign: any) => (
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
              >
                <em>Name: </em>
                {campaign.name}
                <br />
                <em>Synopsis:</em>
                <br />
                {campaign.description}
              </Card>
            ))}
          </Box>
          <Button
            type="submit"
            onClick={handleCreateCampaign}
            sx={{
              height: 60,
              fontFamily: "EnchantedLand",
              fontWeight: 500,
              fontSize: 20,
              color: "orange",
            }}
          >
            Create a Campaign
          </Button>
          <Button onClick={handleOpen}>Open modal</Button>
        </Box>
      </Paper>
    </div>
  );
};

export default Campaigns;
