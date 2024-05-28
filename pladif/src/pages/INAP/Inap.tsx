import FilePresentIcon from "@mui/icons-material/FilePresent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Progress from "../../share/Progress";
import VisorDocumentosOficios from "../../share/VisorDocumentosOficios";
import { inapgral, inapgral01 } from "../../interfaces/IShare";
import { formatFecha } from "../../utils/FormatDate";
import InapModal from "./InapModal";
import InapModalConvenio from "./InapModalConvenio";
import MsgAlert from "../../share/MsgAlert";
const Inap = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [id, setid] = useState<string>("");
  const [idowner, setidowner] = useState<string>("");
  const [open, setopen] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [openModalConvenio, setopenModalConvenio] = useState(false);
  const [openModalFiles, setopenModalFiles] = useState(false);
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});
  const [openRows02, setOpenRows02] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [row, setRow] = useState({});
  const [data, setData] = useState([]);
  const [tipoCarga, settipoCarga] = useState<number>(0);
  const [ruta, setruta] = useState<string>("");
  const [nombrefile, setnombrefile] = useState<string>("");
  const [dataConvenio, setdataConvenio] = useState([]);
  const toggleRow = (rowId: string) => {
    setOpenRows((prevOpenRows: Record<string, boolean>) => {
      const isOpen = prevOpenRows[rowId] || false;
      return { ...prevOpenRows, [rowId]: !isOpen };
    });
  };

  const handleClose = () => {
    ProcesaData(4);
    setopenModalFiles(false);
    setopenModal(false);
    setopenModalConvenio(false);
  };

  const handleFileChange = async (event: any) => {
    try {
      setopen(true);
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        // Aquí puedes realizar acciones con el archivo seleccionado
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("P_TIPO", tipoCarga.toString());
        formData.append("P_ID", id);
        // formData.append("P_CreadoPor", user.Id);
        const response = await axios.post(
          process.env.REACT_APP_APPLICATION_BASE_URL + "migradata",
          formData
        );
        if (response.data.success) {
          setopen(false);
          window.location.reload();
        } else {
          setopen(false);
          console.error("Error al migrar el archivo:", response.data.error);
          window.location.reload();
        }
      }

      // Manejar la respuesta según tus necesidades
    } catch (error) {
      setopen(false);
      console.error("Error en la solicitud:");
    }
  };

  const ProcesaData01 = (tipo: number, idGral: string) => {
    let data = {
      TIPO: tipo,
      P_IdGral: idGral,
    };

    axios
      .post(process.env.REACT_APP_APPLICATION_BASE_URL + "inapGral01All", data)
      .then((response) => {
        // Manejar la respuesta del servidor
        if (response.status == 200) {
          setdataConvenio(response.data.datos);
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

  const ProcesaData = (tipo: number, id?: string) => {
    let data = {
      TIPO: tipo,
      P_Id: id,
      P_CreadoPor: "",
      P_FechaConveniogrlinicio: "",
      P_FechaConveniogrlfin: "",
      P_RouteConvenio: "",
    };

    axios
      .post(process.env.REACT_APP_APPLICATION_BASE_URL + "inapGralAll", data)
      .then((response) => {
        // Manejar la respuesta del servidor
        if (response.status == 200) {
          setData(response.data.datos);
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

  const renderConvenioEspecifico = (dataCE: any, row: any) => {
    return (
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          Convenio Específico
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow key={Math.random()}>
              <TableCell></TableCell>
              <TableCell>Fecha Convenio Específico</TableCell>
              <TableCell>Nombre Convenio Específico</TableCell>
              <TableCell>Objetivo del Convenio Específico</TableCell>
              <TableCell>Monto Convenio Específico</TableCell>
              <TableCell>Fecha Finiquito</TableCell>
              <TableCell>Documentos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataCE.map((item: inapgral01) => (
              <>
                <TableRow
                  key={item.Id}
                  style={{
                    background:
                      searchTerm !== ""
                        ? item.FechaConvenioinicio.includes(searchTerm) ||
                          item.FechaConveniofin.includes(searchTerm) ||
                          item.NombreConvenio.includes(searchTerm) ||
                          item.Objetivo.includes(searchTerm) ||
                          item.Monto.includes(searchTerm) ||
                          item.FechaFiniquito.includes(searchTerm)
                          ? "yellow"
                          : "transparent"
                        : "",
                  }}
                >
                  <TableCell component="th" scope="row">
                    <ButtonGroup variant="text">
                      <Button
                        style={{ color: "black" }}
                        onClick={() => {
                          openmodalFiles(item.Id + "/Entregables");
                        }}
                      >
                        <Tooltip title={"Entregables"}>
                          <PostAddIcon />
                        </Tooltip>
                      </Button>

                      <Button
                        style={{ color: "black" }}
                        onClick={() => {
                          openmodalFiles(item.Id + "/Actas");
                        }}
                      >
                        <Tooltip title={"Actas"}>
                          <ReceiptLongIcon />
                        </Tooltip>
                      </Button>

                      <Button
                        style={{ color: "black" }}
                        onClick={() => {
                          openmodalFiles(item.Id + "/Facturas");
                        }}
                      >
                        <Tooltip title={"Facturas"}>
                          <PriceCheckIcon />
                        </Tooltip>
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {formatFecha(item.FechaConvenioinicio) +
                      "-" +
                      formatFecha(item.FechaConveniofin)}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {item.NombreConvenio}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {item.Objetivo}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {item.Monto}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {formatFecha(item.FechaFiniquito)}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    onClick={() => openmodalFiles(item.Id)}
                  >
                    <FilePresentIcon sx={{ color: "black" }} />
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  };

  const openmodalFiles = (data: any) => {
    setidowner(data);
    setopenModalFiles(true);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    const searchTimeout = setTimeout(() => {}, 2000); // Ajusta el tiempo de espera según tus necesidades
  };

  useEffect(() => {
    ProcesaData(4);
  }, []);

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Progress open={open}></Progress>
      <Grid container justifyContent="flex-start" alignItems="flex-start">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ToggleButtonGroup value="check" aria-label="text alignment">
            <Box border={1} sx={{ display: "flex", alignItems: "flex-end" }}>
              <ManageSearchIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                id="input-with-sx"
                label="Buscar"
                variant="standard"
                onChange={handleSearchChange}
              />
            </Box>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "700px", overflow: "auto" }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow
              key={Math.random()}
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f8f9fa",
                zIndex: 100,
              }}
            >
              <TableCell></TableCell>
              <TableCell>Clave</TableCell>
              <TableCell>Fecha Convenio</TableCell>
              <TableCell>Convenio</TableCell>
              <TableCell>Documentos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: inapgral) => (
              <>
                <TableRow
                  key={row.Id}
                  sx={{ "& > *": { borderBottom: "unset" } }}
                  style={{
                    background:
                      searchTerm !== ""
                        ? row.FechaConveniogrlinicio.includes(searchTerm) ||
                          row.FechaConveniogrlfin.includes(searchTerm) ||
                          row.NombreConvenio.includes(searchTerm)
                          ? "yellow"
                          : "transparent"
                        : "",
                  }}
                >
                  <TableCell component="th" scope="row">
                    <ButtonGroup variant="text">
                      <Button
                        style={{ color: "black" }}
                        onClick={() => {
                          ProcesaData01(5, row.Id);
                          toggleRow(row.Id);
                        }}
                      >
                        <Tooltip title={"Ver Detalle"}>
                          {openRows[row.Id] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </Tooltip>
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {row.Clave}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {formatFecha(row.FechaConveniogrlinicio) +
                      "-" +
                      formatFecha(row.FechaConveniogrlfin)}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {row.NombreConvenio}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    onClick={() => openmodalFiles(row.Id)}
                  >
                    <FilePresentIcon sx={{ color: "black" }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={openRows[row.Id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      {renderConvenioEspecifico(dataConvenio, row)}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openModal ? <InapModal handleClose={handleClose}></InapModal> : ""}
      {openModalConvenio ? (
        <InapModalConvenio
          handleClose={handleClose}
          obj={row}
        ></InapModalConvenio>
      ) : (
        ""
      )}

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

export default Inap;
