import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Grid, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Dayjs } from "dayjs";
import * as React from "react";
import { useState } from "react";
import CustomizedDate from "../../components/share/CustomizedDate";
import MsgAlert from "../../components/share/MsgAlert";
import { getItem } from "../../services/localStorage";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function InapModalSpei({
  handleClose,
  obj,
}: {
  handleClose: Function;
  obj: any;
}) {
  const [fstart, setfstart] = useState<Dayjs | null>();
  const [fpay, setfpay] = useState<Dayjs | null>();
  const [newDoc, setNewDoc] = useState(Object);
  const [namedoc, setnamedoc] = useState<string>("");
  const user = JSON.parse(String(getItem("User"))) as any;
  const handledatestar = (v: any) => {
    setfstart(v);
  };

  const handledatefpay = (v: any) => {
    setfpay(v);
  };

  const handleNewFile = (event: any) => {
    let file = event.target!.files[0]!;
    console.log(file);
    setNewDoc(file);
    setnamedoc(file.name);
  };

  const inserta = async () => {
    const formData = new FormData();
    formData.append("P_IdGral0103", obj);
    formData.append("file", newDoc);
    formData.append("nombreArchivo", namedoc);
    formData.append("P_Id", "");
    formData.append("TIPO", "1");
    formData.append("P_CreadoPor", user.Id);
    formData.append("P_FechaPresupuesto", String(fstart));
    formData.append("P_FechaPAgo", String(fpay));
    console.log(formData);
    const response = await axios.post(
      process.env.REACT_APP_APPLICATION_BASE_URL + "/inapGral010301All",
      formData
    );
    console.log(response);
    if (response.data.success) {
      MsgAlert("Información", "Registro Agregado con correctamente", "success");
      setfstart(null);
      setfpay(null);
      setNewDoc(null);
      setnamedoc("");
    } else {
      console.error("Error al migrar el archivo:", response.data.error);
      window.location.reload();
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        fullScreen
        onClose={() => handleClose()}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, textAlign: "center" }}
          id="customized-dialog-title"
        >
          <Typography variant="h4" gutterBottom>
            Registro de Información
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => handleClose()}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} md={2} lg={2}>
              <CustomizedDate
                value={fstart}
                label={"Fecha de Entrega Presupuesto"}
                onchange={handledatestar}
                disabled={false}
              />
            </Grid>

            <Grid item xs={12} sm={2} md={2} lg={2}>
              <CustomizedDate
                value={fpay}
                label={"Fecha de Pago"}
                onchange={handledatefpay}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={2} md={2} lg={2}>
              <Typography>Favor de Seleccionar el archivo:</Typography>
              <Button value="check">
                <IconButton
                  color="primary"
                  aria-label="upload documento"
                  component="label"
                  size="small"
                >
                  <input
                    hidden
                    accept=".pdf"
                    type="file"
                    value=""
                    onChange={(event) => {
                      handleNewFile(event);
                    }}
                  />
                  <FileUploadIcon />
                </IconButton>
              </Button>
            </Grid>
            <Grid item xs={12} sm={2} md={2} lg={2}>
              {namedoc != null ? (
                <>
                  <Typography>Archivo seleccionado:</Typography>
                  <Typography>{namedoc}</Typography>
                </>
              ) : (
                ""
              )}
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            marginTop={10}
          >
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="success"
                onClick={() => inserta()}
              >
                Guardar
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleClose()}
              >
                Salir
              </Button>
            </Stack>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
