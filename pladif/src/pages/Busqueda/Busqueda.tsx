import DownloadingIcon from "@mui/icons-material/Downloading";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ButtonsDetail } from "../../share/ButtonsDetail";
import MUIXDataGridSimple from "../../share/MUIXDataGridSimple";
import MsgAlert from "../../share/MsgAlert";
import Progress from "../../share/Progress";
import VisorDocumentosOficios from "../../share/VisorDocumentosOficios";
import Auditoria from "../Auditorias/Auditoria";
import OficioONU from "../OficiosONU/OficioONU";
import OficioPresupuesto from "../OficiosPresupuesto/OficioPresupuesto";
import PPI from "../ProyectoInversion/PPI";
import SIREGOB from "../SIREGOB/SIREGOB";
import Transferencias from "../Trasnsferencias/Transferencias";
const Busqueda = () => {
  const [idowner, setidowner] = useState<string>("");
  const [openModalFiles, setopenModalFiles] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [busqueda, setBusqueda] = useState<string>("");
  const [explorerRoute, setexplorerRoute] = useState<string>("");
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  const handleClose = () => {
    setopenModalFiles(false);
  };
  const handleVerSub = (v: any) => {
    setidowner(v.row.idorigen);
    setopenModalFiles(true);
  };

  const ProcesaData01 = () => {
    let data = {
      TIPO: 5,
      BUSQUEDA: searchTerm,
    };

    axios
      .post(process.env.REACT_APP_APPLICATION_BASE_URL + "inapGralAll", data)
      .then((response) => {
        // Manejar la respuesta del servidor
        if (response.status == 200) {
          setData(response.data.datos);
        } else {
          Swal.fire({
            title: "Acceso",
            text: "Error",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        MsgAlert("Error", error, "error");
        console.error(error);
      });
  };

  const handleDescargarFile = (v: any) => {
    setOpenSlider(true);
    let data = {
      NUMOPERACION: 5,
      P_ROUTE: explorerRoute,
      P_NOMBRE: v.row.name,
    };
  };

  const handleVer = (v: any) => {
    setOpenSlider(true);
    let data = {
      NUMOPERACION: 5,
      P_ROUTE: v.row.path,
      P_TIPO: v.row.type,
    };
  };

  const columnsinap: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 10,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 50,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver Carpeta"}
              handleFunction={handleVerSub}
              show={true}
              icon={<DriveFolderUploadIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },
    {
      field: "clavegeneral",
      headerName: "Clave General",
      width: 100,
    },
    {
      field: "FechaConveniogrlinicio",
      headerName: "Fecha Convenio Inicio",
      width: 150,
    },
    {
      field: "FechaConveniogrlfin",
      headerName: "Fecha Convenio Fin",
      width: 150,
    },
    {
      field: "nombregeneral",
      headerName: "Convenio",
      width: 250,
    },
    {
      field: "Clave",
      headerName: "Clave",
      width: 10,
    },
    {
      field: "FechaConvenioinicio",
      headerName: "Convenio específico inicio",
      width: 150,
    },
    {
      field: "FechaConveniofin",
      headerName: "Convenio específico Fin",
      width: 150,
    },
    {
      field: "NombreConvenio",
      headerName: "Nombre Convenio",
      width: 300,
    },
    {
      field: "Objetivo",
      headerName: "Objetivo",
      width: 550,
    },
    {
      field: "Monto",
      headerName: "Monto",
      width: 150,
    },
    {
      field: "FechaFiniquito",
      headerName: "Fecha Finiquito",
      width: 150,
    },
  ];
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 10,
    },

    {
      field: "name",
      headerName: "Nombre",
      width: 250,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver"}
              handleFunction={handleVer}
              show={true}
              icon={<RemoveRedEyeIcon />}
              row={v}
            ></ButtonsDetail>
            <ButtonsDetail
              title={"Descargar"}
              handleFunction={handleDescargarFile}
              show={true}
              icon={<DownloadingIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },
  ];

  const consulta = () => {
    if (searchTerm !== "") {
      setBusqueda(searchTerm);
      setReload((prevState) => !prevState);
      ProcesaData01();
    }
  };

  useEffect(() => {}, [reload]); // Observa cambios en searchTerm

  return (
    <div>
      <Progress open={openSlider}></Progress>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Box border={1} sx={{ display: "flex", alignItems: "flex-end" }}>
            <ManageSearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Buscar"
              variant="standard"
              value={searchTerm}
              onChange={(v) => {
                setSearchTerm(v.target.value);
              }}
              fullWidth
            />
          </Box>
          <Button
            onClick={() => {
              consulta();
            }}
            sx={{ marginTop: 2, marginBottom: 2 }}
            variant="contained"
            color="success"
          >
            Buscar
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid border={1} item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Auditorías
          </Typography>
          <Auditoria tipo={"BUS"} Busqueda={busqueda}></Auditoria>
        </Grid>
        <Grid border={1} item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Oficios Presupuesto
          </Typography>
          <OficioPresupuesto
            tipo={"BUS"}
            Busqueda={busqueda}
          ></OficioPresupuesto>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid border={1} item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Proyectos de Inversión
          </Typography>
          <PPI tipo={"BUS"} Busqueda={busqueda}></PPI>
        </Grid>
        <Grid border={1} item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Oficios ONU
          </Typography>
          <OficioONU tipo={"BUS"} Busqueda={busqueda}></OficioONU>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid border={1} item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            INAP
          </Typography>
          <MUIXDataGridSimple columns={columnsinap} rows={data} />
        </Grid>
        <Grid border={1} item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            SIREGOB
          </Typography>
          <SIREGOB tipo={"BUS"} Busqueda={busqueda}></SIREGOB>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid border={1} item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Transferencias Y Recalendarizaciones
          </Typography>
          <Transferencias tipo={"BUS"} Busqueda={busqueda}></Transferencias>
        </Grid>
        <Grid border={1} item xs={6} sm={6} md={6} lg={6}></Grid>
      </Grid>

      {openModalFiles ? (
        <VisorDocumentosOficios
          handleFunction={handleClose}
          obj={idowner}
        ></VisorDocumentosOficios>
      ) : (
        ""
      )}
    </div>
  );
};

export default Busqueda;
