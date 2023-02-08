import { Rowing } from "@mui/icons-material";
import { Card, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationRoutes from "../../constants/routes";

const Parties = () => {
  const navigate = useNavigate();
  const [parties, setParties] = useState<any>([]);

  const fetchData = async () => {

    const userData = JSON.parse(localStorage.getItem("userDetails") ?? "{}");
    const partiesRetrieved = userData.characters.flatMap( (x: any) => x.parties).flat(1);

    setParties(partiesRetrieved);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateParty = () => {
    navigate(NavigationRoutes.CreateParty);
  };

  return (
    <div>
            <Paper
      sx={{
        height: "100%",
        width: "100%",
        marginTop: 7,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: 'start',
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
            alignContent: 'start',
          }}
        >
          <h1>Parties</h1>
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
            {parties.map((party: any) => (
              <Card
                sx={{
                  height: 300,
                  fontFamily: "EnchantedLand",
                  width: 300,
                  fontWeight: 500,
                  justifyContent: "left",
                  alignContent: "left",
                  fontSize: 22,
                  margin: 1,
                  padding: 1,
                }}
              >
                <em>Name: </em>
                {party.name}
                <br />
                <em>Party Level:  </em>
                {party.level}
              </Card>
            ))}
          </Box>
          <Button
            type="submit"
            onClick={handleCreateParty}
            sx={{
              height: 60,
              fontFamily: "EnchantedLand",
              fontWeight: 500,
              fontSize: 20,
              color: 'orange'
            }}
          >
            Create a Party
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default Parties;
