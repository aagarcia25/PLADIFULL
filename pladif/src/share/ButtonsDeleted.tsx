import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, Tooltip } from "@mui/material";

const ButtonsDeleted = ({
  handleAccion,
  row,
  show,
}: {
  handleAccion: Function;
  row: any;
  show: boolean;
}) => {
  return (
    <div>
      {show ? (
        <Tooltip title={"Eliminar Registro"}>
          <IconButton
            color="inherit"
            onClick={() => handleAccion({ data: row, tipo: 2 })}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </div>
  );
};

export default ButtonsDeleted;
