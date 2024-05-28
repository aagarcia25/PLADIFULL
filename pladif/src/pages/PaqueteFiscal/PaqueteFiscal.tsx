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
const PaqueteFiscal = ({
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

  const handleVerSub = (v: any, tipo: string) => {
    setidowner(v.row.Anio + "\\LEY_" + tipo);
    //  setidowner(v.row.Anio + "/LEY_" + tipo);
    setopenModalFiles(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
    },

    {
      field: "Anio",
      headerName: "Año",
      width: 150,
    },

    {
      field: "lingresos",
      disableExport: true,
      headerName: "Ley de Ingresos",
      description: "Ley de Ingresos",
      sortable: false,
      width: 120,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver Carpeta"}
              handleFunction={() => handleVerSub(v, "INGRESO")}
              show={true}
              icon={<FilePresentIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },
    {
      field: "leyegresos",
      disableExport: true,
      headerName: "Ley de Egresos",
      description: "Ley de Egresos",
      sortable: false,
      width: 120,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver Carpeta"}
              handleFunction={() => handleVerSub(v, "EGRESO")}
              show={true}
              icon={<FilePresentIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },
  ];

  const ProcesaData = (tipo: number, id?: string) => {
    //setopen(true);
    let data = {
      TIPO: tipo,
      P_Id: id,
    };

    axios
      .post(process.env.REACT_APP_APPLICATION_BASE_URL + "PF", data)
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

export default PaqueteFiscal;
