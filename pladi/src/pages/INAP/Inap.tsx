import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import MsgAlert from "../../components/share/MsgAlert";
import Progress from "../../components/share/Progress";
import VisorDocumentos from "../../components/share/VisorDocumentos";
import {
  actas,
  entregables,
  facturas,
  inapgral,
  inapgral01,
  pagos,
} from "../../interfaces/IShare";
import { AuthService } from "../../services/AuthService";
import { getItem } from "../../services/localStorage";
import { formatFecha } from "../../utils/FormatDate";
import { Toast } from "../../utils/Toast";
import InapModal from "./InapModal";
import InapModalActas from "./InapModalActas";
import InapModalConvenio from "./InapModalConvenio";
import InapModalEntregables from "./InapModalEntregables";
import InapModalFacturas from "./InapModalFacturas";
import axios from "axios";
import InapModalSpei from "./InapModalSpei";
import VisorDocumentosSimple from "../../components/share/VisorDocumentosSimple";
const Inap = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const user = JSON.parse(String(getItem("User"))) as any;
  const [id, setid] = useState<string>("");
  const [idowner, setidowner] = useState<string>("");
  const [open, setopen] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [openModalConvenio, setopenModalConvenio] = useState(false);
  const [openModalEntregables, setopenModalEntregables] = useState(false);
  const [openModalActas, setopenModalActas] = useState(false);
  const [openModalFacturas, setopenModalFacturas] = useState(false);
  const [openModalSpei, setopenModalSpei] = useState(false);
  const [openModalFiles, setopenModalFiles] = useState(false);
  const [openModalFilessimple, setopenModalFilessimple] = useState(false);
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});
  const [openRows01, setOpenRows01] = useState<{ [key: string]: boolean }>({});
  const [openRows02, setOpenRows02] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [row, setRow] = useState({});
  const [data, setData] = useState([]);

  const [ruta, setruta] = useState<string>("");
  const [nombrefile, setnombrefile] = useState<string>("");
  const [dataConvenio, setdataConvenio] = useState([]);
  const [dataEn, setdataEn] = useState([]);
  const [dataAc, setdataAc] = useState([]);
  const [dataFac, setdataFac] = useState([]);
  const [dataPD, setDataPD] = useState([]);
  const [tipoCarga, settipoCarga] = useState<number>(0);

  const toggleRow = (rowId: string) => {
    setOpenRows((prevOpenRows: Record<string, boolean>) => {
      const isOpen = prevOpenRows[rowId] || false;
      return { ...prevOpenRows, [rowId]: !isOpen };
    });
  };

  const toggleRow01 = (rowId: string) => {
    setOpenRows01((prevOpenRows: Record<string, boolean>) => {
      const isOpen = prevOpenRows[rowId] || false;
      return { ...prevOpenRows, [rowId]: !isOpen };
    });
  };

  const toggleRow02 = (rowId: string) => {
    setOpenRows02((prevOpenRows: Record<string, boolean>) => {
      const isOpen = prevOpenRows[rowId] || false;
      return { ...prevOpenRows, [rowId]: !isOpen };
    });
  };

  const refrecatabla = () => {
    setOpenRows((prevOpenRows: Record<string, boolean>) => {
      const isOpen = Object.values(prevOpenRows).some((value) => value);
      const updatedRows: Record<string, boolean> = {};

      for (const key in prevOpenRows) {
        updatedRows[key] = !isOpen;
      }

      return updatedRows;
    });

    setOpenRows01((prevOpenRows: Record<string, boolean>) => {
      const isOpen = Object.values(prevOpenRows).some((value) => value);
      const updatedRows: Record<string, boolean> = {};

      for (const key in prevOpenRows) {
        updatedRows[key] = !isOpen;
      }

      return updatedRows;
    });

    setOpenRows02((prevOpenRows: Record<string, boolean>) => {
      const isOpen = Object.values(prevOpenRows).some((value) => value);
      const updatedRows: Record<string, boolean> = {};

      for (const key in prevOpenRows) {
        updatedRows[key] = !isOpen;
      }

      return updatedRows;
    });

    // refrecatabla1();
  };

  const refrecatabla1 = () => {
    setOpenRows((prevOpenRows: Record<string, boolean>) => {
      const areAllOpen = Object.values(prevOpenRows).every((value) => value);
      const updatedRows: Record<string, boolean> = {};

      for (const key in prevOpenRows) {
        updatedRows[key] = !areAllOpen;
      }

      return updatedRows;
    });

    setOpenRows01((prevOpenRows: Record<string, boolean>) => {
      const areAllOpen = Object.values(prevOpenRows).every((value) => value);
      const updatedRows: Record<string, boolean> = {};

      for (const key in prevOpenRows) {
        updatedRows[key] = !areAllOpen;
      }

      return updatedRows;
    });

    setOpenRows02((prevOpenRows: Record<string, boolean>) => {
      const areAllOpen = Object.values(prevOpenRows).every((value) => value);
      const updatedRows: Record<string, boolean> = {};

      for (const key in prevOpenRows) {
        updatedRows[key] = !areAllOpen;
      }

      return updatedRows;
    });
  };

  const handleFileChange = async (event: any) => {
    try {
      setopen(true);
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        // Aquí puedes realizar acciones con el archivo seleccionado
        console.log("Archivo seleccionado:", selectedFile.name);
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("P_TIPO", tipoCarga.toString());
        formData.append("P_ID", id);
        formData.append("P_CreadoPor", user.Id);
        const response = await axios.post(
          process.env.REACT_APP_APPLICATION_BASE_URL + "/migradata",
          formData
        );
        console.log("respuesta de archivo");
        console.log(response);
        if (response.data.success) {
          setopen(false);
          console.log("Archivo migrado con éxito");
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

  const handleButtonClick = (tipo: number, obj: string) => {
    settipoCarga(tipo);
    setid(obj);
    // Verificar que fileInputRef.current no sea nulo antes de usarlo
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const ProcesaData01 = (tipo: number, idGral: string) => {
    let data = {
      TIPO: tipo,
      P_IdGral: idGral,
    };

    AuthService.inapGral01All(data).then((res) => {
      if (res.NUMCODE == 200) {
        if (tipo == 5) {
          setdataConvenio(res.RESPONSE);
        } else if (tipo == 7) {
          setDataPD(res.RESPONSE);
        } else if (tipo == 8) {
          setdataEn(res.RESPONSE);
        } else if (tipo == 9) {
          setdataAc(res.RESPONSE);
        } else if (tipo == 10) {
          setdataFac(res.RESPONSE);
        }
      } else {
        MsgAlert("Error", res.STRMESSAGE, "error");
      }
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

    AuthService.inapGralAll(data).then((res) => {
      if (res.NUMCODE == 200) {
        if (tipo == 4) {
          setData(res.RESPONSE);
        }
      } else {
        MsgAlert("Error", res.STRMESSAGE, "error");
      }
    });
  };

  const renderPagos = (dataPD: any, row: any) => {
    return (
      <Box sx={{ margin: 1 }}>
        <>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  Detalle de Pago
                </TableCell>
              </TableRow>
              <TableRow key={Math.random()}>
                <TableCell>
                  <Button
                    style={{ color: "black" }}
                    onClick={() => {
                      setRow(row);
                      setopenModalSpei(true);
                    }}
                  >
                    <Tooltip title={"Agregar Registro"}>
                      <AddCircleOutlineIcon color="success" />
                    </Tooltip>
                  </Button>
                </TableCell>
                <TableCell>Fecha Entrega Presupuesto</TableCell>
                <TableCell>Fecha de Pago</TableCell>
                <TableCell>Nombre SPEI</TableCell>
                <TableCell>PDF SPEI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataPD.map((item: pagos) => (
                <>
                  {item.Id != null ? (
                    <TableRow key={item.Id}>
                      <TableCell component="th" scope="row">
                        <ButtonGroup variant="text">
                          <Button
                            style={{ color: "black" }}
                            onClick={() => {
                              alert("Agregar");
                            }}
                          >
                            <Tooltip title={"Editar Registro"}>
                              <EditIcon color="info" />
                            </Tooltip>
                          </Button>
                          <Button
                            style={{ color: "black" }}
                            onClick={() => {
                              alert("Agregar");
                            }}
                          >
                            <Tooltip title={"Eliminar Registro"}>
                              <DeleteForeverIcon color="error" />
                            </Tooltip>
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        {formatFecha(item.FechaPresupuesto)}
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        {formatFecha(item.FechaPAgo)}
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        {item.NombreFile}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                        onClick={() => {
                          setruta(item.RouteSpei);
                          setnombrefile(item.NombreFile);
                          setopenModalFilessimple(true);
                        }}
                      >
                        <Tooltip title={"Ver Archivo"}>
                          <VisibilityIcon sx={{ color: "black" }} />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </>
      </Box>
    );
  };

  const renderActas = (dataEN: any, data: any) => {
    return (
      <>
        <Box sx={{ margin: 1 }}>
          <>
            <Typography variant="h6" gutterBottom component="div">
              Actas
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow key={Math.random()}>
                  <TableCell>
                    <Button
                      style={{ color: "black" }}
                      onClick={() => {
                        setopenModalActas(true);
                        setRow(data);
                      }}
                    >
                      <Tooltip title={"Agregar Registro"}>
                        <AddCircleOutlineIcon color="success" />
                      </Tooltip>
                    </Button>
                  </TableCell>
                  <TableCell>Fecha acta de entrega</TableCell>
                  <TableCell>Acta</TableCell>
                  <TableCell>PDF Acta de entrega</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataEN.map((item: actas) => (
                  <>
                    {item.Id != null ? (
                      <TableRow key={item.Id}>
                        <TableCell component="th" scope="row">
                          <ButtonGroup variant="text">
                            <Button
                              style={{ color: "black" }}
                              onClick={() => {
                                alert("Agregar");
                              }}
                            >
                              <Tooltip title={"Editar Registro"}>
                                <EditIcon color="info" />
                              </Tooltip>
                            </Button>
                            <Button
                              style={{ color: "black" }}
                              onClick={() => {
                                alert("Agregar");
                              }}
                            >
                              <Tooltip title={"Eliminar Registro"}>
                                <DeleteForeverIcon color="error" />
                              </Tooltip>
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {formatFecha(item.inap0102_FechaActa)}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {item.inap0102_NombreActa}
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
                    ) : (
                      ""
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </>
        </Box>
      </>
    );
  };

  const renderFacturas = (dataEN: any, data: any) => {
    return (
      <>
        <Box sx={{ margin: 1 }}>
          <>
            <Typography variant="h6" gutterBottom component="div">
              Facturas
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow key={Math.random()}>
                  <TableCell>
                    <Button
                      style={{ color: "black" }}
                      onClick={() => {
                        setopenModalFacturas(true);
                        setRow(data);
                      }}
                    >
                      <Tooltip title={"Agregar Registro"}>
                        <AddCircleOutlineIcon color="success" />
                      </Tooltip>
                    </Button>
                  </TableCell>
                  <TableCell>Fecha de factura </TableCell>
                  <TableCell>Factura </TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Documentos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataEN.map((item: facturas) => (
                  <>
                    {item.Id != null ? (
                      <>
                        <TableRow key={item.Id}>
                          <TableCell component="th" scope="row">
                            <ButtonGroup variant="text">
                              <Button
                                style={{ color: "black" }}
                                onClick={() => {
                                  ProcesaData01(7, item.Id);
                                  toggleRow02(item.Id);
                                }}
                              >
                                <Tooltip title={"Agregar Registro"}>
                                  {openRows02[item.Id] ? (
                                    <KeyboardArrowUpIcon />
                                  ) : (
                                    <KeyboardArrowDownIcon />
                                  )}
                                </Tooltip>
                              </Button>

                              <Button
                                style={{ color: "black" }}
                                onClick={() => {
                                  alert("Agregar");
                                }}
                              >
                                <Tooltip title={"Editar Registro"}>
                                  <EditIcon color="info" />
                                </Tooltip>
                              </Button>
                              <Button
                                style={{ color: "black" }}
                                onClick={() => {
                                  alert("Agregar");
                                }}
                              >
                                <Tooltip title={"Eliminar Registro"}>
                                  <DeleteForeverIcon color="error" />
                                </Tooltip>
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                          <TableCell component="th" scope="row" align="left">
                            {formatFecha(item.inap0103_FechaFactura)}
                          </TableCell>
                          <TableCell component="th" scope="row" align="left">
                            {item.inap0103_Factura}
                          </TableCell>

                          <TableCell component="th" scope="row" align="left">
                            {item.inap0103_Monto}
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
                        <TableRow>
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={6}
                          >
                            <Collapse
                              in={openRows02[item.Id]}
                              timeout="auto"
                              unmountOnExit
                            >
                              {renderPagos(dataPD, item.Id)}
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </>
        </Box>
      </>
    );
  };

  const renderEntregable = (dataEN: any, data: any) => {
    return (
      <>
        <Box sx={{ margin: 1 }}>
          <>
            <Typography variant="h6" gutterBottom component="div">
              Entregables
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow key={Math.random()}>
                  <TableCell>
                    <ButtonGroup>
                      <Button
                        style={{ color: "black" }}
                        onClick={() => {
                          setRow(data);
                          setopenModalEntregables(true);
                        }}
                      >
                        <Tooltip title={"Agregar Registro"}>
                          <AddCircleOutlineIcon color="success" />
                        </Tooltip>
                      </Button>

                      <Button
                        style={{ color: "black" }}
                        onClick={() => handleButtonClick(1, data.Id)}
                      >
                        <Tooltip title={"Subir Plantilla"}>
                          <CloudUploadIcon color="info" />
                        </Tooltip>
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell>Clave</TableCell>
                  <TableCell>Entregable</TableCell>
                  <TableCell>PDF Entregable</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataEN.map((item: entregables) => (
                  <>
                    {item.Id != null ? (
                      <TableRow key={item.Id}>
                        <TableCell component="th" scope="row">
                          <ButtonGroup variant="text">
                            <Button
                              style={{ color: "black" }}
                              onClick={() => {
                                alert("Agregar");
                              }}
                            >
                              <Tooltip title={"Editar Registro"}>
                                <EditIcon color="info" />
                              </Tooltip>
                            </Button>
                            <Button
                              style={{ color: "black" }}
                              onClick={() => {
                                handleBorrar(3, item.Id);
                              }}
                            >
                              <Tooltip title={"Eliminar Registro"}>
                                <DeleteForeverIcon color="error" />
                              </Tooltip>
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.inap0101_Clave}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {item.inap0101_Nombre}
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
                    ) : (
                      ""
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </>
        </Box>
      </>
    );
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
              <TableCell>
                <ButtonGroup>
                  <Button
                    style={{ color: "black" }}
                    onClick={() => {
                      setopenModalConvenio(true);
                      setRow(row);
                    }}
                  >
                    <Tooltip title={"Agregar Registro"}>
                      <AddCircleOutlineIcon color="success" />
                    </Tooltip>
                  </Button>
                  <Button
                    style={{ color: "black" }}
                    onClick={() => handleButtonClick(1, row.Id)}
                  >
                    <Tooltip title={"Subir Plantilla"}>
                      <CloudUploadIcon color="info" />
                    </Tooltip>
                  </Button>
                </ButtonGroup>
              </TableCell>
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
                <TableRow key={item.Id}>
                  <TableCell component="th" scope="row">
                    <ButtonGroup variant="text">
                      <Button
                        style={{ color: "black" }}
                        onClick={() => {
                          ProcesaData01(8, item.Id);
                          ProcesaData01(9, item.Id);
                          ProcesaData01(10, item.Id);
                          toggleRow01(item.Id);
                        }}
                      >
                        <Tooltip title={"Ver Detalle"}>
                          {openRows01[item.Id] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </Tooltip>
                      </Button>

                      <Button
                        style={{ color: "black" }}
                        onClick={() => {
                          alert("Agregar");
                        }}
                      >
                        <Tooltip title={"Editar Registro"}>
                          <EditIcon color="info" />
                        </Tooltip>
                      </Button>
                      <Button
                        style={{ color: "black" }}
                        onClick={() => {
                          handleBorrar(2, item.Id);
                        }}
                      >
                        <Tooltip title={"Eliminar Registro"}>
                          <DeleteForeverIcon color="error" />
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
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={openRows01[item.Id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      {renderEntregable(dataEn, item)}
                      {renderActas(dataAc, item)}
                      {renderFacturas(dataFac, item)}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  };

  const handleBorrar = (tipo: number, v: any) => {
    Swal.fire({
      icon: "question",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(v);

        let data = {
          TIPO: 3,
          P_Id: v,
          CHUSER: String(user.Id),
        };

        if (tipo == 1) {
          AuthService.inapGralAll(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registro Eliminado!",
              });
              ProcesaData(4);
            } else {
              Swal.fire("¡Error!", res.STRMESSAGE, "error");
            }
          });
        } else if (tipo == 2) {
          AuthService.inapGral01All(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registro Eliminado!",
              });
              ProcesaData(4);
            } else {
              Swal.fire("¡Error!", res.STRMESSAGE, "error");
            }
          });
        } else if (tipo == 3) {
          AuthService.inapGral0101All(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registro Eliminado!",
              });
              ProcesaData(4);
            } else {
              Swal.fire("¡Error!", res.STRMESSAGE, "error");
            }
          });
        }
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const openmodal = () => {
    setopenModal(true);
  };

  const openmodalFiles = (data: any) => {
    setidowner(data);
    setopenModalFiles(true);
  };

  const handleClosefile = () => {
    setopenModalFilessimple(false);
  };
  const handleClose = () => {
    ProcesaData(4);
    setopenModalFiles(false);
    setopenModal(false);
    setopenModalConvenio(false);
    setopenModalEntregables(false);
    setopenModalActas(false);
    setopenModalFacturas(false);
    setopenModalSpei(false);

    // refrecatabla();
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    //clearTimeout(searchTimeout);
    const searchTimeout = setTimeout(() => {
      // Lógica para realizar la búsqueda
      console.log("Búsqueda realizada:", value);
    }, 2000); // Ajusta el tiempo de espera según tus necesidades
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
            <Tooltip title={"Agregar Registro"}>
              <ToggleButton
                style={{ color: "black" }}
                value="left"
                aria-label="left aligned"
                onClick={() => {
                  openmodal();
                }}
              >
                <AddCircleOutlineIcon color="success" />
              </ToggleButton>
            </Tooltip>

            <Tooltip title={"Exportar a Excel"}>
              <ToggleButton
                style={{ color: "black" }}
                value="left"
                aria-label="left aligned"
              >
                <FileDownloadIcon />
              </ToggleButton>
            </Tooltip>

            <Tooltip title={"Migrar a Excel"}>
              <ToggleButton
                style={{ color: "black" }}
                value="left"
                aria-label="left aligned"
                onClick={() => handleButtonClick(0, "1")}
              >
                <CloudUploadIcon color="info" />
              </ToggleButton>
            </Tooltip>

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

                      <Button
                        style={{ color: "black" }}
                        onClick={() => {
                          alert("Agregar");
                        }}
                      >
                        <Tooltip title={"Editar Registro"}>
                          <EditIcon color="info" />
                        </Tooltip>
                      </Button>
                      <Button
                        style={{ color: "black" }}
                        onClick={() => {
                          handleBorrar(1, row.Id);
                        }}
                      >
                        <Tooltip title={"Eliminar Registro"}>
                          <DeleteForeverIcon color="error" />
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
      {openModalEntregables ? (
        <InapModalEntregables
          handleClose={handleClose}
          obj={row}
        ></InapModalEntregables>
      ) : (
        ""
      )}
      {openModalActas ? (
        <InapModalActas handleClose={handleClose} obj={row}></InapModalActas>
      ) : (
        ""
      )}
      {openModalFacturas ? (
        <InapModalFacturas
          handleClose={handleClose}
          obj={row}
        ></InapModalFacturas>
      ) : (
        ""
      )}
      {openModalSpei ? (
        <InapModalSpei handleClose={handleClose} obj={row}></InapModalSpei>
      ) : (
        ""
      )}
      {openModalFiles ? (
        <VisorDocumentos
          handleFunction={handleClose}
          idowner={idowner}
        ></VisorDocumentos>
      ) : (
        ""
      )}
      {openModalFilessimple ? (
        <VisorDocumentosSimple
          handleFunction={handleClosefile}
          ruta={ruta}
          NombreFile={nombrefile}
        ></VisorDocumentosSimple>
      ) : (
        ""
      )}
    </div>
  );
};

export default Inap;
