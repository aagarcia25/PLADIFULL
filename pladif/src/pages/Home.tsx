import { Box, Container } from "@mui/material";
import logo from "../assets/logo_circular.svg";
const Home = () => {
  return (
    <Container fixed>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <img
          src={logo}
          alt="Descripción"
          style={{
            width: "80%",
            height: "80%",
            objectFit: "contain",
          }}
        />
      </Box>
    </Container>
  );
};

export default Home;
