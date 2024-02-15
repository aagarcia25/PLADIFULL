import React, { useState } from "react";
import Progress from "../components/share/Progress";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { AuthService } from "../services/AuthService";
import Swal from "sweetalert2";
import { setItem } from "../services/localStorage";
const SignIn = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [slideropen, setslideropen] = useState(false);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const login = () => {
    let data = {
      P_Usuario: username,
      P_Password: pass,
    };
    AuthService.login(data).then((res) => {
      if (res.NUMCODE == 200) {
        localStorage.clear();
        setItem(true, "l1");
        setItem(res.RESPONSE[0], "User");
        navigate("/home/");
      } else {
        localStorage.clear();
        Swal.fire({
          title: "Acceso",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });

    //navigate("/home/");
  };
  return (
    <div>
      <Progress open={slideropen}></Progress>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // Cambiar a sx=
            backgroundRepeat: "no-repeat",
            backgroundColor:
              theme.palette.mode === "light" // Cambiar a theme.palette.mode
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={1}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              paddingTop: "20px",
              textAlign: "center", // Centra el texto horizontalmente
            }}
          >
            {/* <img src={logo} alt="Descripción de la imagen" /> */}
          </Box>
          <Typography
            variant={isSmallScreen ? "subtitle1" : "h5"}
            sx={{
              textAlign: "center", // Centra el texto horizontalmente
              margin: "20px",
            }}
          >
            Digitalización de Documentos
          </Typography>

          <LoginIcon color="error" />
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(v) => setUsername(v.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={pass}
              onChange={(v) => setPass(v.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={{
                marginTop: "20px", // Agregar margen superior
              }}
              onClick={login}
              disabled={!(username.trim() !== "" && pass.trim() !== "")}
            >
              Ingresar
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
