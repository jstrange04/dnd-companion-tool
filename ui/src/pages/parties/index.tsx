import { Rowing } from "@mui/icons-material";
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
        <h1>Parties</h1>
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
          Create a Party
        </Button>
      </Box>
      <Box sx={{ height: 400, width: "90%", marginLeft: 10 }}>
        {parties.map((party: any) => (
          <p>
            {"Party Id: " +
              party.id +
              " Party Name: " +
              party.name +
              " Party Level: " +
              party.level}
          </p>
        ))}
      </Box>
    </div>
  );
};

export default Parties;
