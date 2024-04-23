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
const OficioONU = ({ tipo, Busqueda }: { tipo: string; Busqueda?: string }) => {
  const [idowner, setidowner] = useState<string>("");
  const [openModalFiles, setopenModalFiles] = useState(false);
  const [open, setopen] = useState(false);
  const [rows, setrows] = useState([]);

  const handleClose = () => {
    setopenModalFiles(false);
  };

  const handleVerSub = (v: any) => {
    console.log(v);
    setidowner("\\ONU\\" + v.row.Id);
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
              title={"Ver Documentos"}
              handleFunction={() => handleVerSub(v)}
              show={true}
              icon={<FilePresentIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },

    { field: "FechaConvenio", headerName: "Fecha Convenio", width: 120 },
    { field: "NombreConvenio", headerName: "Nombre del Convenio", width: 200 },
    {
      field: "ObjetivoConvenio",
      headerName: "Objetivo Convenio",
      width: 400,
    },
    { field: "MontoConvenio", headerName: "Monto Convenio", width: 350 },
  ];

  const ProcesaData = (tipo: number, id?: string) => {
    // setopen(true);
    let data = {
      TIPO: tipo,
      P_Id: id,
      BUSQUEDA: Busqueda,
    };

    axios
      .post("http://10.200.4.176:3001/onu", data)
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
      });
  };

  useEffect(() => {
    console.log(tipo);
    console.log(Busqueda);
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

export default OficioONU;
