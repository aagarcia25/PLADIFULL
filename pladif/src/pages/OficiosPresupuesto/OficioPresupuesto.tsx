import FilePresentIcon from "@mui/icons-material/FilePresent";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ButtonsDetail } from "../../share/ButtonsDetail";
import MUIXDataGrid from "../../share/MUIXDataGrid";
import MsgAlert from "../../share/MsgAlert";
import Progress from "../../share/Progress";
import VisorDocumentosOficios from "../../share/VisorDocumentosOficios";
const OficioPresupuesto = ({
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
    setidowner("\\OP\\" + v.row.Anio + "\\SOL\\" + v.row.Folio);
    setopenModalFiles(true);
  };

  const handleVerSubrespuesta = (v: any) => {
    setidowner("\\OP\\" + v.row.Anio + "\\RESP\\" + v.row.OficioRespuesta);
    setopenModalFiles(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
    },

    {
      field: "lingresos",
      disableExport: true,
      headerName: "Documentos",
      description: "Documentos",
      sortable: false,
      width: 120,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver Oficio"}
              handleFunction={() => handleVerSub(v)}
              show={true}
              icon={<FilePresentIcon />}
              row={v}
            ></ButtonsDetail>

            {v.row.OficioRespuesta ? (
              <ButtonsDetail
                title={"Ver Oficio de Respuesta"}
                handleFunction={() => handleVerSubrespuesta(v)}
                show={true}
                icon={<FilePresentIcon />}
                row={v}
              ></ButtonsDetail>
            ) : (
              ""
            )}
          </>
        );
      },
    },
    { field: "Anio", headerName: "Ejercicio", width: 100 },
    // { field: "Folio", headerName: "Folio", width: 120 },
    { field: "OficioRespuesta", headerName: "Oficio de Respuesta", width: 200 },
    {
      field: "OficioDependencia",
      headerName: "Oficio de la Dependencia",
      width: 200,
    },
    { field: "Secretaria", headerName: "Secretaria", width: 350 },
    { field: "Dependencia", headerName: "Dependencia", width: 350 },
    { field: "TipoGasto", headerName: "Tipo de Gasto", width: 350 },
    { field: "Estatus", headerName: "Estatus", width: 150 },
    { field: "Responsable", headerName: "Responsable", width: 250 },
    {
      field: "ClaveTipoSolicitud",
      headerName: "Clave Tipo de Solicitud",
      width: 200,
    },
    { field: "TipoSolicitud", headerName: "Tipo de Solicitud", width: 200 },
    { field: "FechaOficio", headerName: "Fecha del Oficio", width: 150 },
    { field: "FechaRecepcion", headerName: "Fecha de Recepcion", width: 150 },
    // {
    //   field: "FechaElaboracion",
    //   headerName: "Fecha de Elaboracion",
    //   width: 180,
    // },
    // {
    //   field: "FechaVencimiento",
    //   headerName: "Fecha de Vencimiento",
    //   width: 180,
    // },
    {
      field: "Monto",
      headerName: "Monto",
      width: 120,
    },
    // {
    //   field: "MontoAmpliacion",
    //   headerName: "Monto de Ampliacion",
    //   width: 180,
    // },
    { field: "Comentarios", headerName: "Comentarios", width: 500 },
    // { field: "FechaTurno", headerName: "Fecha en que se Turno", width: 200 },
    // {
    //   field: "ObservacionesEstatus",
    //   headerName: "Observaciones del Estatus",
    //   width: 200,
    // },
    // { field: "FechaTurnada", headerName: "Fecha Turnada", width: 150 },
    { field: "FechaTerminada", headerName: "Fecha Terminada", width: 150 },
  ];

  const ProcesaData = (tipo: number, id?: string) => {
    // setopen(true);
    let data = {
      TIPO: tipo,
      P_Id: id,
      BUSQUEDA: Busqueda,
    };

    axios
      .post(process.env.REACT_APP_APPLICATION_BASE_URL + "presupuesto", data)
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
        // Manejar el error
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
    <div>
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

export default OficioPresupuesto;
