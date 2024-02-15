import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DownloadingIcon from "@mui/icons-material/Downloading";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Grid, IconButton, ToggleButton, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthService } from "../../services/AuthService";
import { getItem } from "../../services/localStorage";
import { base64ToArrayBuffer } from "../../utils/Files";
import { Toast } from "../../utils/Toast";
import { ButtonsDetail } from "./ButtonsDetail";
import { TooltipPersonalizado } from "./CustomizedTooltips";
import MUIXDataGrid from "./MUIXDataGrid";
import ModalForm from "./ModalForm";
import Progress from "./Progress";

const VisorDocumentos = ({
  handleFunction,
  idowner,
}: {
  handleFunction: Function;
  idowner: string;
}) => {
  const [openSlider, setOpenSlider] = useState(true);
  const [verarchivo, setverarchivo] = useState(false);
  const [data, setData] = useState([]);
  const [URLruta, setURLRuta] = useState<string>("");
  const user = JSON.parse(String(getItem("User"))) as any;

  const consulta = () => {
    console.log("Visor de Documentos");
    console.log(idowner);
    setOpenSlider(true);
    let data = {
      TIPO: 3,
      P_IDOWNER: idowner,
    };

    AuthService.adminfiles(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setData(res.RESPONSE);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const ProcesaSPeis = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenSlider(true);
    let count = 0;
    let encontrados: any[] = [];
    let counfiles = event?.target?.files?.length;
    let peticiones: any[] = [];

    //Recorremos los registros de la busqueda
    for (let i = 0; i < Number(counfiles); i++) {
      let file = event?.target?.files?.[i] || "";
      let namefile = event?.target?.files?.[i].name || "";
      encontrados.push({ Archivo: file, NOMBRE: namefile });
    }

    encontrados.map((item: any) => {
      const formData = new FormData();
      formData.append("P_IDOWNER", idowner);
      formData.append("P_CreadoPor", user.Id);
      formData.append("file", item.Archivo, item.NOMBRE);
      formData.append("nombreArchivo", item.NOMBRE);
      let p = axios.post(
        process.env.REACT_APP_APPLICATION_BASE_URL + "saveFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      peticiones.push(p);
    });

    axios.all(peticiones).then((resposeArr) => {
      resposeArr.map((item) => {
        if (item.data.SUCCESS) {
          count++;
        } else {
          count--;
        }
      });

      if (count == 0 || count == -1) {
        Swal.fire("¡Error!", "No se Realizo la Operación", "error");
        setOpenSlider(false);
      } else {
        Swal.fire({
          icon: "success",
          title: "Información",
          text: "Archivos Subidos " + count,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            setOpenSlider(false);
            consulta();
          }
        });
      }
    });
  };

  const handleDescargarFile = (v: any) => {
    setOpenSlider(true);
    let data = {
      NUMOPERACION: 5,
      P_ROUTE: v.row.Ruta,
      P_NOMBRE: v.row.NombreFile,
    };

    AuthService.getFile(data).then((res) => {
      if (res.SUCCESS) {
        var bufferArray = base64ToArrayBuffer(String(res.RESPONSE.FILE));
        var blobStore = new Blob([bufferArray], { type: res.RESPONSE.TIPO });
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = data;
        link.download = v.row.NombreFile;
        link.click();
        window.URL.revokeObjectURL(data);
        link.remove();
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const handleCloseModal = () => {
    setverarchivo(false);
  };

  const handleVer = (v: any) => {
    console.log(v);
    setOpenSlider(true);
    let data = {
      NUMOPERACION: 5,
      P_ROUTE: v.row.Ruta,
      P_NOMBRE: v.row.NombreFile,
    };

    AuthService.getFile(data).then((res) => {
      if (res.SUCCESS) {
        var bufferArray = base64ToArrayBuffer(String(res.RESPONSE.FILE));
        var blobStore = new Blob([bufferArray], { type: "application/pdf" });
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = data;
        setURLRuta(link.href);
        setOpenSlider(false);
        setverarchivo(true);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const handleAccion = (v: any) => {
    Swal.fire({
      icon: "info",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 3,
          CHID: v.data.row.id,
          CHUSER: user.Id,
          P_ROUTE: v.data.row.Route,
        };

        AuthService.getFile(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });
            consulta();
          } else {
            Swal.fire("¡Error!", res.STRMESSAGE, "error");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
    },

    {
      field: "NombreFile",
      description: "Nombre",
      headerName: "Nombre",
      width: 250,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Eliminar"}
              handleFunction={handleAccion}
              show={true}
              icon={<DeleteForeverIcon color="error" />}
              row={v}
            ></ButtonsDetail>
            {v.row.NombreFile &&
            v.row.NombreFile.toLowerCase().endsWith(".pdf") ? (
              <ButtonsDetail
                title={"Ver"}
                handleFunction={handleVer}
                show={true}
                icon={<RemoveRedEyeIcon />}
                row={v}
              ></ButtonsDetail>
            ) : (
              ""
            )}

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

  useEffect(() => {
    consulta();
  }, []);

  return (
    <div>
      <ModalForm title={"Visor de Documentos"} handleClose={handleFunction}>
        <Progress open={openSlider}></Progress>

        {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h4">{obj.row.NombreFile}</Typography>
        </Box> */}

        <>
          <TooltipPersonalizado
            title={
              <React.Fragment>
                <Typography color="inherit">Cargar Documentos</Typography>
                {"Permite la carga de Documentos de Forma Masiva "}
              </React.Fragment>
            }
          >
            <ToggleButton value="check">
              <IconButton
                color="primary"
                aria-label="upload documento"
                component="label"
                size="small"
              >
                <input
                  multiple
                  hidden
                  accept=".*"
                  type="file"
                  value=""
                  onChange={(v) => ProcesaSPeis(v)}
                />
                <FileUploadIcon />
              </IconButton>
            </ToggleButton>
          </TooltipPersonalizado>
        </>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <MUIXDataGrid columns={columns} rows={data} />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} style={{ height: "100vh" }}>
            {verarchivo ? (
              <iframe width="100%" height="100%" src={URLruta} />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </ModalForm>
    </div>
  );
};

export default VisorDocumentos;
