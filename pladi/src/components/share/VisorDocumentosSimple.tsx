import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthService } from "../../services/AuthService";
import { base64ToArrayBuffer } from "../../utils/Files";
import ModalForm from "./ModalForm";
import Progress from "./Progress";

const VisorDocumentosSimple = ({
  handleFunction,
  ruta,
  NombreFile,
}: {
  handleFunction: Function;
  ruta: string;
  NombreFile: string;
}) => {
  const [openSlider, setOpenSlider] = useState(true);
  const [verarchivo, setverarchivo] = useState(false);
  const [URLruta, setURLRuta] = useState<string>("");

  const handleVer = () => {
    setOpenSlider(true);
    let data = {
      NUMOPERACION: 5,
      P_ROUTE: ruta,
      P_NOMBRE: NombreFile,
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

  useEffect(() => {
    handleVer();
  }, []);

  return (
    <div>
      <ModalForm title={"Visor de Documentos"} handleClose={handleFunction}>
        <Progress open={openSlider}></Progress>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ height: "100vh" }}
          >
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

export default VisorDocumentosSimple;
