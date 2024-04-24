import LoginIcon from "@mui/icons-material/Login";
import {
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logonuevoleon.png";
import tesoreria from "../assets/tesoreria.png";
const SignIn = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const login = () => {
    axios
      .post("http://10.200.4.176:3001/login", {
        username,
        pass,
      })
      .then((response) => {
        console.log(response.data);
        // Manejar la respuesta del servidor
        if (response.status == 200) {
          navigate("/home/");
        } else {
          Swal.fire({
            title: "Acceso",
            text: "Error",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Acceso",
          text: error,
          icon: "error",
        });
        console.error(error);
      });
  };

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img src={tesoreria} alt="Descripción" style={{ maxWidth: "100%" }} />
        </Grid>
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
          <img
            src={logo}
            alt="Descripción"
            style={{
              width: "25%",
              height: "25%",
              objectFit: "contain",
            }}
          />
          <Typography
            variant={isSmallScreen ? "subtitle1" : "h5"}
            sx={{
              textAlign: "center",
              marginTop: "20px",
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
                marginTop: "20px",
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
