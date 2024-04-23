import { CircularProgress, Dialog, Grid, Typography } from "@mui/material";

const Progress = ({ open, mensaje }: { open: boolean; mensaje?: string }) => {
  return (
    <Dialog
      sx={{
        zIndex: 2000,
        backdropFilter: "blur(5px)",
      }}
      open={open}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: 2, // Add padding if needed
        }}
      >
        <Grid
          item
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          <CircularProgress
            size={100}
            sx={{
              color: "#15212f",
            }}
          />
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
          paddingTop={2}
        >
          <Typography variant="h4" className="Cargando">
            {mensaje ? mensaje : "Cargando .."}
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default Progress;
