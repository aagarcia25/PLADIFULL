import CancelIcon from "@mui/icons-material/Cancel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Collapse,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import logo from "../assets/logo_genl.svg";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
const drawerWidth: number = 280;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Main = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    setOpenMenus(!openMenus);
  };

  const closeSssion = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          sx={{ backgroundColor: "#F2F3F4" }}
          open={open}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="info"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="#000000"
              noWrap
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              Plataforma de Digitalización de Documentos
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
            <div style={{ flex: 1 }} />
            <IconButton
              style={{
                width: "90%",
                height: "90%",
              }}
              onClick={() => navigate("/home/")}
            >
              <img
                src={logo}
                alt="Descripción"
                style={{
                  width: "60%",
                  height: "60%",
                }}
              />
            </IconButton>
          </Toolbar>
          <Divider />

          <List component="nav">
            <Tooltip title={"Búsqueda General"}>
              <ListItemButton
                onClick={() => {
                  setSelectedOption("bus");
                  navigate("/home/bus");
                }}
                style={{
                  backgroundColor:
                    selectedOption === "bus" ? "#DBA901" : "transparent",
                }}
              >
                <ListItemIcon>
                  <ManageSearchIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Búsqueda General"
                  style={{
                    color: selectedOption === "bus" ? "#FFFFFF" : "",
                  }}
                />
              </ListItemButton>
            </Tooltip>

            <Tooltip title={"Solicitudes de Pago"}>
              <ListItemButton
                onClick={handleClick} // Alterna el estado abierto/cerrado
                style={{
                  backgroundColor: open ? "#DBA901" : "transparent",
                }}
              >
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Solicitudes de Pago"
                  style={{
                    color: open ? "#FFFFFF" : "",
                  }}
                />
                {openMenus ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </Tooltip>

            <Collapse in={openMenus} timeout="auto" unmountOnExit>
              <ListItemButton
                onClick={() => {
                  setSelectedOption("gasto-corriente");
                  navigate("/home/polizas/gasto-corriente");
                }}
                style={{
                  backgroundColor:
                    selectedOption === "gasto-corriente"
                      ? "#DBA901"
                      : "transparent",
                }}
              >
                <ListItemText
                  primary="Gasto Corriente"
                  style={{
                    color:
                      selectedOption === "gasto-corriente" ? "#FFFFFF" : "",
                  }}
                />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  setSelectedOption("gasto-capital");
                  navigate("/home/polizas/gasto-capital");
                }}
                style={{
                  backgroundColor:
                    selectedOption === "gasto-capital"
                      ? "#DBA901"
                      : "transparent",
                }}
              >
                <ListItemText
                  primary="Gasto Capital"
                  style={{
                    color: selectedOption === "gasto-capital" ? "#FFFFFF" : "",
                  }}
                />
              </ListItemButton>
            </Collapse>

            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes a Auditorias"
              }
            >
              <ListItemButton
                onClick={() => {
                  setSelectedOption("auditoria");
                  navigate("/home/auditoria");
                }}
                style={{
                  backgroundColor:
                    selectedOption === "auditoria" ? "#DBA901" : "transparent",
                }}
              >
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Auditorías"
                  style={{
                    color: selectedOption === "auditoria" ? "#FFFFFF" : "",
                  }}
                />
              </ListItemButton>
            </Tooltip>

            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes a Presupuesto"
              }
            >
              <ListItemButton
                onClick={() => {
                  setSelectedOption("presupuesto");
                  navigate("/home/presupuesto");
                }}
                style={{
                  backgroundColor:
                    selectedOption === "presupuesto"
                      ? "#DBA901"
                      : "transparent",
                }}
              >
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Oficios Presupuestos"
                  style={{
                    color: selectedOption === "presupuesto" ? "#FFFFFF" : "",
                  }}
                />
              </ListItemButton>
            </Tooltip>

            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes a Municipios"
              }
            >
              <ListItemButton onClick={() => navigate("/home")}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Oficios DAMOP" />
              </ListItemButton>
            </Tooltip>
            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes a Auditorias"
              }
            >
              <ListItemButton
                onClick={() => {
                  setSelectedOption("onu");
                  navigate("/home/onu");
                }}
                style={{
                  backgroundColor:
                    selectedOption === "onu" ? "#DBA901" : "transparent",
                }}
              >
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Oficios ONU" />
              </ListItemButton>
            </Tooltip>

            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes a Auditorias"
              }
            >
              <ListItemButton
                onClick={() => {
                  setSelectedOption("ppi");
                  navigate("/home/ppi");
                }}
                style={{
                  backgroundColor:
                    selectedOption === "ppi" ? "#DBA901" : "transparent",
                }}
              >
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Proyectos de Inversión"
                  style={{
                    color: selectedOption === "ppi" ? "#FFFFFF" : "",
                  }}
                />
              </ListItemButton>
            </Tooltip>
            <Tooltip title={"Manual de Procedimiento de la Dirección"}>
              <ListItemButton
                onClick={() => {
                  setSelectedOption("mpd");
                  navigate("/home/mpd");
                }}
                style={{
                  backgroundColor:
                    selectedOption === "mpd" ? "#DBA901" : "transparent",
                }}
              >
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Manual de Procedimiento de la Dirección"
                  style={{
                    color: selectedOption === "mpd" ? "#FFFFFF" : "",
                  }}
                />
              </ListItemButton>
            </Tooltip>
            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes a Auditorias"
              }
            >
              <ListItemButton
                onClick={() => {
                  setSelectedOption("pf");
                  navigate("/home/pf");
                }}
                style={{
                  backgroundColor:
                    selectedOption === "pf" ? "#DBA901" : "transparent",
                }}
              >
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Paquete Fiscal"
                  style={{
                    color: selectedOption === "pf" ? "#FFFFFF" : "",
                  }}
                />
              </ListItemButton>
            </Tooltip>

            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes al INAP"
              }
            >
              <ListItemButton
                onClick={() => {
                  setSelectedOption("inap");
                  navigate("/home/inap");
                }}
                style={{
                  backgroundColor: selectedOption === "inap" ? "#DBA901" : "",
                }}
              >
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="INAP"
                  style={{
                    color: selectedOption === "inap" ? "#FFFFFF" : "",
                  }}
                />
              </ListItemButton>
            </Tooltip>
            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes a Auditorias"
              }
            >
              <ListItemButton
                onClick={() => {
                  setSelectedOption("siregob");
                  navigate("/home/siregob");
                }}
                style={{
                  backgroundColor:
                    selectedOption === "siregob" ? "#DBA901" : "",
                }}
              >
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="SIREGOB"
                  style={{
                    color: selectedOption === "siregob" ? "#FFFFFF" : "",
                  }}
                />
              </ListItemButton>
            </Tooltip>
            <Divider></Divider>
            <ListItemButton onClick={() => closeSssion()}>
              <ListItemIcon>
                <CancelIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItemButton>
            <Divider></Divider>
          </List>
        </Drawer>
        <Divider></Divider>
        <div>
          <Toolbar />
          <Container sx={{ mt: 1, mb: 1 }}>
            <Outlet />
          </Container>
        </div>
      </Box>
    </div>
  );
};

export default Main;
