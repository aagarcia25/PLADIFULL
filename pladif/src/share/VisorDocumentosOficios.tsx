import DownloadingIcon from "@mui/icons-material/Downloading";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ButtonsDeleted from "./ButtonsDeleted";
import { ButtonsDetail } from "./ButtonsDetail";
import FormDialog from "./CFolder";
import ModalForm from "./ModalForm";
import ButtonsDeletedFolder from "./ButtonsDeletedFolder";
import MUIXDataGrid from "./MUIXDataGrid";
import Progress from "./Progress";
import MsgAlert from "./MsgAlert";
import { base64ToArrayBuffer } from "../utils/Files";
const VisorDocumentosOficios = ({
  handleFunction,
  obj,
}: {
  handleFunction: Function;
  obj: any;
}) => {
  const [openSlider, setOpenSlider] = useState(false);
  const [opendialog, setopendialog] = useState(false);
  const [verarchivo, setverarchivo] = useState(false);
  // const permiso = JSON.parse(String(getItem("Tipo"))) as any;
  const [data, setData] = useState([]);
  const [URLruta, setURLRuta] = useState<string>("");
  const [breadcrumbs, setBreadcrumbs] = useState([obj]);
  const [explorerRoute, setexplorerRoute] = useState<string>("");

  const consulta = () => {
    if (explorerRoute !== "") {
      setOpenSlider(true);
      let data = {
        P_ROUTE: explorerRoute,
      };

      axios
        .post("http://10.200.4.176:3001/getListFiles", data)
        .then((response) => {
          console.log(response.data);

          // Manejar la respuesta del servidor
          if (response.status == 200) {
            setData(response.data.RESPONSE);
            setOpenSlider(false);
          } else {
            setOpenSlider(false);
            Swal.fire({
              title: "Acceso",
              text: "Error",
              icon: "error",
            });
          }
        })
        .catch((error) => {
          MsgAlert("Error", error, "error");
          setOpenSlider(false);
        });
    }
  };

  const handleDescargarFile = (v: any) => {
    setOpenSlider(true);
    let data = {
      NUMOPERACION: 5,
      P_ROUTE: explorerRoute,
      P_NOMBRE: v.row.name,
    };

    axios
      .post("http://10.200.4.176:3001/getFile", data)
      .then((response) => {
        console.log(response.data);

        // Manejar la respuesta del servidor
        if (response.status == 200) {
          setOpenSlider(false);

          var bufferArray = base64ToArrayBuffer(
            String(response.data.RESPONSE.FILE)
          );
          var blobStore = new Blob([bufferArray], {
            type: response.data.RESPONSE.TIPO,
          });
          var data = window.URL.createObjectURL(blobStore);
          var link = document.createElement("a");
          document.body.appendChild(link);
          link.href = data;
          link.download = v.row.name;
          link.click();
          window.URL.revokeObjectURL(data);
          link.remove();
        } else {
          setOpenSlider(false);
          Swal.fire({
            title: "Acceso",
            text: "Error",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        MsgAlert("Error", error, "error");
        setOpenSlider(false);
      });
  };

  const createFolder = (v: any) => {
    console.log(v);

    if (v !== undefined && v != "") {
      const formData = new FormData();
      formData.append("NUMOPERACION", "9");
      formData.append("FOLIO", explorerRoute);
      formData.append("P_ROUTE", explorerRoute + "/" + v);

      axios
        .post("http://10.200.4.176:3001/" + "createfolder", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          if (response.data.SUCCESS) {
            console.log(response.data);
            consulta();
            setopendialog(false);
          } else {
            setopendialog(false);
            // Manejar caso de error si es necesario
            console.error("Error en la petición:", response.data);
          }
        })
        .catch((error) => {
          // Manejar errores de red u otros
          console.error("Error en la petición:", error);
          setopendialog(false);
        });
    } else {
      setopendialog(false);
    }
  };

  const handleVer = (v: any) => {
    console.log(v);
    setOpenSlider(true);
    let data = {
      NUMOPERACION: 5,
      P_ROUTE: explorerRoute,
      P_NOMBRE: v.row.name,
    };

    axios
      .post("http://10.200.4.176:3001/getFile", data)
      .then((response) => {
        console.log(response.data);
        // Manejar la respuesta del servidor
        if (response.status == 200) {
          setOpenSlider(false);
          var bufferArray = base64ToArrayBuffer(
            String(response.data.RESPONSE.FILE)
          );
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
          Swal.fire({
            title: "Acceso",
            text: "Error",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        MsgAlert("Error", error, "error");
        setOpenSlider(false);
      });
  };

  const handleAccion = (v: any) => {
    console.log(v);

    Swal.fire({
      icon: "info",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (v.tipo == 2) {
          let data = {
            NUMOPERACION: 5,
            P_ROUTE: explorerRoute,
            P_NOMBRE: v.data.row.name,
          };
          // AuthService.deletedFile(data).then((res) => {
          //   if (res.SUCCESS) {
          //     Toast.fire({
          //       icon: "success",
          //       title: "¡Registro Eliminado!",
          //     });
          //     consulta();
          //   } else {
          //     Swal.fire("¡Error!", res.STRMESSAGE, "error");
          //   }
          // });
        } else {
          let data = {
            P_ROUTE: explorerRoute,
          };
          // AuthService.deletedFolder(data).then((res) => {
          //   if (res.SUCCESS) {
          //     Toast.fire({
          //       icon: "success",
          //       title: "¡Registro Eliminado!",
          //     });
          //     consulta();
          //   } else {
          //     Swal.fire("¡Error!", res.STRMESSAGE, "error");
          //   }
          // });
        }
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
      width: 250,
      renderCell: (v) => {
        return (
          <>
            {!v.row.isDirectory ? (
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

                <ButtonsDeleted
                  handleAccion={handleAccion}
                  row={v}
                  show={true}
                ></ButtonsDeleted>
              </>
            ) : (
              <>
                <ButtonsDetail
                  title={"Ver Carpeta"}
                  handleFunction={handleVerSub}
                  show={true}
                  icon={<DriveFolderUploadIcon />}
                  row={v}
                ></ButtonsDetail>
                <ButtonsDeletedFolder
                  handleAccion={handleAccion}
                  row={v}
                  show={true}
                ></ButtonsDeletedFolder>
              </>
            )}
          </>
        );
      },
    },
  ];

  const handleVerSub = (v: any) => {
    console.log(v);
    const existeOficio = breadcrumbs.some((breadcrumb) => {
      // Verificar si el nombre del breadcrumb es "Oficio"
      return breadcrumb === "/" + v.row.name;
    });

    if (existeOficio) {
      console.log("YA Existe el Elemento");
    } else {
      const nuevoElemento = "/" + v.row.name;
      setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, nuevoElemento]);
    }
  };

  useEffect(() => {
    setexplorerRoute(breadcrumbs.join(""));
  }, [breadcrumbs]);

  useEffect(() => {
    setOpenSlider(true);
    consulta();
  }, [explorerRoute]);

  return (
    <div>
      <ModalForm title={"Documentos"} handleClose={handleFunction}>
        <Progress open={openSlider}></Progress>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {breadcrumbs}
        </Box>

        <Grid container>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <MUIXDataGrid columns={columns} rows={data} />
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8}>
            {verarchivo && URLruta !== "" ? (
              <iframe width="100%" height="100%" src={URLruta} />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </ModalForm>

      {opendialog ? <FormDialog handleClose={createFolder}></FormDialog> : ""}
    </div>
  );
};

export default VisorDocumentosOficios;
