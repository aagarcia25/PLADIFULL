import CancelIcon from "@mui/icons-material/Cancel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
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
import { getItem } from "../../services/localStorage";
import logo from "../../assets/logo_genl.svg";
import ArticleIcon from "@mui/icons-material/Article";
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
  const [openMenus, setOpenMenus] = useState([false, false, false]);
  const data = JSON.parse(String(getItem("User"))) as any;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (index: number) => {
    const updatedMenus = [...openMenus];
    updatedMenus[index] = !updatedMenus[index];
    setOpenMenus(updatedMenus);
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
            {"   "}
            <img
              src={logo}
              alt="Descripción"
              style={{
                width: "50%",
                height: "50%",
              }}
            />
          </Toolbar>
          <Divider />

          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={1}>
              {data!.Nombre}
            </Grid>
            <Grid item xs={1}>
              {data!.Puesto}
            </Grid>
            <Grid item xs={1}>
              {data!.CorreoElectronico}
            </Grid>
            <Grid item xs={1}>
              {data!.Telefono}
            </Grid>
          </Grid>

          <Divider></Divider>
          {/* <List component="nav">
            <ListItemButton onClick={() => navigate("/home/Federales")}>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary="Investigación" />
            </ListItemButton>

            <Divider sx={{ my: 1 }} />
          </List> */}
          <List component="nav">
            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes a Auditorias"
              }
            >
              <ListItemButton onClick={() => handleClick(0)}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Auditorías" />
                {openMenus[0] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </Tooltip>
            <Collapse in={openMenus[0]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/home/Federales")}
                >
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText primary="Federales" />
                </ListItemButton>

                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/home/Estatales")}
                >
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText primary="Estatales" />
                </ListItemButton>
              </List>
            </Collapse>

            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes a Auditorias"
              }
            >
              <ListItemButton onClick={() => handleClick(1)}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Oficios Presupuesto" />
                {openMenus[1] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </Tooltip>
            <Collapse in={openMenus[1]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/home/Federales")}
                >
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText primary="Generados" />
                </ListItemButton>

                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/home/Estatales")}
                >
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText primary="Recibidos" />
                </ListItemButton>
              </List>
            </Collapse>
            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes a Auditorias"
              }
            >
              <ListItemButton onClick={() => navigate("/home")}>
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
              <ListItemButton onClick={() => navigate("/home")}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Proyectos de Inversión" />
              </ListItemButton>
            </Tooltip>
            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes a Auditorias"
              }
            >
              <ListItemButton onClick={() => handleClick(2)}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Paquete Fiscal" />
                {openMenus[2] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </Tooltip>
            <Collapse in={openMenus[2]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/home/Federales")}
                >
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ley de Ingresos" />
                </ListItemButton>

                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/home/Estatales")}
                >
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ley de Egresos" />
                </ListItemButton>
              </List>
            </Collapse>

            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes al INAP"
              }
            >
              <ListItemButton onClick={() => navigate("/home/inap")}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="INAP" />
              </ListItemButton>
            </Tooltip>
            <Tooltip
              title={
                "Control y Administración de los Oficios Correspondientes a Auditorias"
              }
            >
              <ListItemButton onClick={() => navigate("/home/siregob")}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="SIREGOB" />
              </ListItemButton>
            </Tooltip>
            <Divider></Divider>
            <ListItemButton onClick={() => closeSssion()}>
              <ListItemIcon>
                <CancelIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sessión" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, width: "120%" }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </div>
  );
};

export default Main;
