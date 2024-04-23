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
const MPD = ({ tipo, Busqueda }: { tipo: string; Busqueda?: string }) => {
  const [idowner, setidowner] = useState<string>("");
  const [openModalFiles, setopenModalFiles] = useState(false);
  const [open, setopen] = useState(false);
  const [rows, setrows] = useState([]);

  const handleClose = () => {
    setopenModalFiles(false);
  };

  const handleVerSub = (v: any, tipo: string) => {
    setidowner(v.row.Dependencia);
    //  setidowner(v.row.Anio + "/LEY_" + tipo);
    setopenModalFiles(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
    },

    {
      field: "Dependencia",
      headerName: "Área",
      width: 350,
    },

    {
      field: "Documentos",
      disableExport: true,
      headerName: "Documentos",
      description: "Documentos",
      sortable: false,
      width: 120,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver Carpeta"}
              handleFunction={() => handleVerSub(v, "MPD")}
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
    // setopen(true);
    let data = {
      TIPO: tipo,
      P_Id: id,
    };
    axios
      .post("http://10.200.4.176:3001/MPD", data)
      .then((response) => {
        console.log(response.data);

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

    /*
    AuthService.MPD(data).then((res) => {
      if (res.NUMCODE == 200) {
        if (tipo == 4) {
          setrows(res.RESPONSE);
          setopen(false);
        } else if (tipo == 5) {
          setrows(res.RESPONSE);
          setopen(false);
        }
      } else {
        MsgAlert("Error", res.STRMESSAGE, "error");
      }
    });*/
  };

  useEffect(() => {
    console.log(tipo);
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

export default MPD;
