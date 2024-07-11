import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ButtonsDetail } from "../../share/ButtonsDetail";
import MUIXDataGrid from "../../share/MUIXDataGrid";
import ModalForm from "../../share/ModalForm";
import MsgAlert from "../../share/MsgAlert";
import Progress from "../../share/Progress";
import { base64ToArrayBuffer } from "../../utils/Files";
import Tooltip from "@mui/material/Tooltip";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
const Corriente = ({ tipo, Busqueda }: { tipo: string; Busqueda?: string }) => {
  const [openModalFiles, setopenModalFiles] = useState(false);
  const [open, setopen] = useState(false);
  const [rows, setrows] = useState([]);
  const [URLruta, setURLRuta] = useState<string>("");

  const handleClose = () => {
    setopenModalFiles(false);
  };

  const handleVer = (v: any) => {
    let data = {
      NUMOPERACION: 5,
      P_ROUTE: v.row.Archivo.replace("\\\\", "\\"),
    };
    console.log("v: ",v);
    
    console.log("data:", data);
    
    axios
      .post(process.env.REACT_APP_APPLICATION_BASE_URL + "getFileByRoute", data)
      .then((response) => {
        // Manejar la respuesta del servidor
        if (response.status == 200) {
          var bufferArray = base64ToArrayBuffer(
            String(response.data.RESPONSE.FILE)
          );
          var blobStore = new Blob([bufferArray], { type: "application/pdf" });
          var data = window.URL.createObjectURL(blobStore);
          var link = document.createElement("a");
          document.body.appendChild(link);
          link.href = data;
          setURLRuta(link.href);
          setopenModalFiles(true);
        } else {
          setopenModalFiles(false);
          Swal.fire({
            title: "Acceso",
            text: "Error",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        MsgAlert("Error", error, "error");
        setopenModalFiles(false);
      });
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 80,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver Carpeta"}
              handleFunction={handleVer}
              show={true}
              icon={<DriveFolderUploadIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },
    {
      field: "SP",
      headerName: "Solicitud de Pago",
      description: "Solicitud de Pago",
      width: 110,
    },
    {
      field: "Texto",
      headerName: "Descripción",
      description: "Descripción",
      width: 1000,
    },
  ];

  const ProcesaData = (tipo: number, id?: string, anio?: string) => {
    setopen(true);
    let data = {
      TIPO: tipo,
      P_Id: id,
      BUSQUEDA: Busqueda,
      ANIO: anio,
    };
console.log("data2: ",data);

    axios
      .post(process.env.REACT_APP_APPLICATION_BASE_URL + "gastocorriente", data)
      .then((response) => {
        if (response.status == 200) {
          setrows(response.data.datos);
          setopen(false);
        } else {
          setopen(false);
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
        setopen(false);
      });
  };

  const [Año, setAño] = useState("");
  const [mes, setMes] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAño(
      String(event.target.value)
      //   .replace("", "Sin texto") || "Sin texto"
      // .replaceAll('"', "")
      // .replaceAll("'", "")
      // .replaceAll("\n", "")
    );

    // ProcesaData(4, "", event.target.value);
  };

  const añoCompleto = (event: SelectChangeEvent) => {
    setMes(
      String(event.target.value)
      //   .replace("", "Sin texto") || "Sin texto"
      // .replaceAll('"', "")
      // .replaceAll("'", "")
      // .replaceAll("\n", "")
    );

    console.log(Año + String(event.target.value));
    let año_completo = Año + "-" + String(event.target.value);
    console.log(año_completo);
    ProcesaData(4, "", año_completo);
  };

  useEffect(() => {
    if (tipo == "CONS") {
      //ProcesaData(4);
    } else if (tipo == "BUS" && Busqueda != "") {
      ProcesaData(5);
    }
  }, [Busqueda]);
  return (
    <div>
      <Progress open={open}></Progress>

      <Grid item container mb={2}>
        <Grid xl={6}>
          <FormControl sx={{ width: "90%" }}>
            <InputLabel id="demo-simple-select-label">AÑO</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Año}
              label="Año"
              onChange={handleChange}
            >
              {/* <MenuItem value={2016}>2016</MenuItem>
              <MenuItem value={2017}>2017</MenuItem>
              <MenuItem value={2018}>2018</MenuItem> */}
              <MenuItem value={2019}>2019</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid xl={6}>
          
          <Tooltip title="Seleccione un año para elegir el mes">
            <FormControl disabled={!Año} sx={{ width: "90%" }}>
              <InputLabel id="demo-simple-select-label">Mes</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mes}
                label="Mes"
                onChange={añoCompleto}
              >
                <MenuItem value="01">Enero</MenuItem>
                <MenuItem value="02">Febrero</MenuItem>
                <MenuItem value="03">Marzo</MenuItem>
                <MenuItem value="04">Abril</MenuItem>
                <MenuItem value="05">Mayo</MenuItem>
                <MenuItem value="06">Junio</MenuItem>
                <MenuItem value="07">Julio</MenuItem>
                <MenuItem value="08">Agosto</MenuItem>
                <MenuItem value="09">Septiembre</MenuItem>
                <MenuItem value="10">Octubre</MenuItem>
                <MenuItem value="11">Noviembre</MenuItem>
                <MenuItem value="12">Diciembre</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>
      </Grid>

      <MUIXDataGrid columns={columns} rows={rows} />

      {openModalFiles ? (
        <ModalForm title={"Documentos"} handleClose={handleClose}>
          <div style={{ height: "500px" }}>
            <iframe width="100%" height="100%" src={URLruta} />
          </div>
        </ModalForm>
      ) : (
        ""
      )}
    </div>
  );
};

export default Corriente;
