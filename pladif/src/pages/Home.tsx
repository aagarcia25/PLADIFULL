import { Box, Container } from "@mui/material";
import { ChangeEvent, useState } from "react";
import logo from "../assets/logo_circular.svg";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    //clearTimeout(searchTimeout);
    const searchTimeout = setTimeout(() => {
      // Lógica para realizar la búsqueda
      console.log("Búsqueda realizada:", value);
    }, 2000); // Ajusta el tiempo de espera según tus necesidades
  };

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
