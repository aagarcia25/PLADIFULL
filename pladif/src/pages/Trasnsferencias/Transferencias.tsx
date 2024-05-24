import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ButtonsDetail } from "../../share/ButtonsDetail";
import MUIXDataGrid from "../../share/MUIXDataGrid";
import MsgAlert from "../../share/MsgAlert";
import VisorDocumentosOficios from "../../share/VisorDocumentosOficios";
import Progress from "../../share/Progress";
import axios from "axios";
import Swal from "sweetalert2";

const Transferencias = ({
  tipo,
  Busqueda,
}: {
  tipo: string;
  Busqueda?: string;
}) => {
  const [idowner, setidowner] = useState<string>("");
  const [openModalFiles, setopenModalFiles] = useState(false);
  const [open, setopen] = useState(false);
  const [rows, setrows] = useState([]);

  const handleClose = () => {
    setopenModalFiles(false);
  };

  const handleVerSub = (v: any) => {
    const anioObtenido = v.row.Anio;
    setidowner("\\TRANFERENCIAS\\FOLIOS\\" + anioObtenido + "\\" + v.row.Folio);
    setopenModalFiles(true);
  };

  const handleVerSub2 = (v: any) => {
    const anioObtenido = v.row.Anio;
    setidowner(
      "\\TRANFERENCIAS\\RESPUESTA\\" + anioObtenido + "\\" + v.row.Respuesta
    );
    setopenModalFiles(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
    },

    {
      field: "Folio",
      disableExport: true,
      headerName: "Folio",
      description: "Folio",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <>
            {v.row.Folio}
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
      field: "Respuesta",
      disableExport: true,
      headerName: "Respuesta",
      description: "Respuesta",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <>
            {v.row.Respuesta ? (
              <>
                {v.row.Respuesta}
                <ButtonsDetail
                  title={"Ver Carpeta"}
                  handleFunction={handleVerSub2}
                  show={true}
                  icon={<DriveFolderUploadIcon />}
                  row={v}
                ></ButtonsDetail>
              </>
            ) : (
              ""
            )}
          </>
        );
      },
    },

    {
      field: "OficioDependencia",
      headerName: "Oficio de la Dependencia",
      description: "Oficio de la Dependencia",
      width: 250,
    },
    {
      field: "Secretaria",
      headerName: "Secretaría",
      description: "Secretaría",
      width: 300,
    },
    {
      field: "Dependencia",
      headerName: "Dependencia",
      description: "Dependencia",
      width: 300,
    },
    {
      field: "TipoGasto",
      headerName: " Tipo de Gasto",
      description: " Tipo de Gasto",
      width: 200,
    },
    {
      field: "Estatus",
      headerName: " Estatus",
      description: " Estatus",
      width: 150,
    },

    {
      field: "Responsable",
      headerName: "Responsable",
      description: "Responsable",
      width: 250,
    },
    {
      field: "TipoSolicitud",
      headerName: "Tipo de Solicitud",
      description: "Tipo de Solicitud",
      width: 150,
    },

    {
      field: "FechaOficio",
      headerName: "Fecha de Oficio",
      description: "Fecha de Oficio",
      width: 100,
    },

    {
      field: "FechaRecepcion",
      headerName: "Fecha de Recepcion",
      description: "Fecha de Recepcion",
      width: 100,
    },
    {
      field: "FechaElaboracion",
      headerName: "Fecha de Elaboracion",
      description: "Fecha de Elaboracion",
      width: 100,
    },
    {
      field: "FechaVencimiento",
      headerName: "Fecha de Vencimiento",
      description: "Fecha de Vencimiento",
      width: 100,
    },
    {
      field: "Monto",
      headerName: "Monto",
      description: "Monto",
      width: 200,
    },
    {
      field: "montoAmpliacion",
      headerName: "Monto Ampliación",
      description: "Monto Ampliación",
      width: 200,
    },
    {
      field: "Comentarios",
      headerName: "Comentarios",
      description: "Comentarios",
      width: 400,
    },
    {
      field: "FechaTurno",
      headerName: "Fecha en que se Turno",
      description: "Fecha en que se Turno",
      width: 100,
    },
    {
      field: "ObservacionesEstatus",
      headerName: "Observaciones del Estatus",
      description: "Observaciones del Estatus",
      width: 350,
    },
    {
      field: "AsignadoDependencia",
      headerName: "Asignado Dependencia",
      description: "Asignado Dependencia",
      width: 150,
    },
    {
      field: "TramitadoDAMOP",
      headerName: "Tramitado DAMOP",
      description: "Tramitado DAMOP",
      width: 100,
    },
    {
      field: "FechaCapturada",
      headerName: "Fecha Capturada",
      description: "Fecha Capturada",
      width: 100,
    },
    {
      field: "ObservacionesCapturada",
      headerName: "Observaciones Capturadas",
      description: "Observaciones Capturadas",
      width: 250,
    },
    {
      field: "FechaTurnada",
      headerName: "Fecha Turnada",
      description: "Fecha Turnada",
      width: 100,
    },
    {
      field: "ObservacionesTurnada",
      headerName: "Observaciones Turnada",
      description: "Observaciones Turnada",
      width: 250,
    },
    {
      field: "FechaStanBy",
      headerName: "Fecha stand by",
      description: "Fecha stand by",
      width: 100,
    },
    {
      field: "ObservacionesStandBy",
      headerName: "Observaciones Stan BY",
      description: "Observaciones Stan BY",
      width: 100,
    },
    {
      field: "FechaTerminada",
      headerName: "Fecha Terminada",
      description: "Fecha Terminada",
      width: 100,
    },
    {
      field: "ObservacionesTerminada",
      headerName: " Obs. Terminada",
      description: " Obs. Terminada",
      width: 350,
    },
    {
      field: "Anio",
      headerName: "Ejercicio",
      description: "Ejercicio",
      width: 100,
    },
  ];

  const ProcesaData = (tipo: number, id?: string) => {
    setopen(true);
    let data = {
      TIPO: tipo,
      P_Id: id,
      BUSQUEDA: Busqueda,
    };

    axios
      .post("http://10.200.4.176:3001/transferencias", data)
      .then((response) => {
        // Manejar la respuesta del servidor
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

  useEffect(() => {
    if (tipo == "CONS") {
      ProcesaData(4);
    } else if (tipo == "BUS" && Busqueda != "") {
      ProcesaData(5);
    }
  }, [Busqueda]);
  return (
    <div style={{ width: "100%" }}>
      <Progress open={open}></Progress>
      <MUIXDataGrid columns={columns} rows={rows} />

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

export default Transferencias;
