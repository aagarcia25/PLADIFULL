import { GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import MUIXDataGrid from "../../components/share/MUIXDataGrid";

const SIREGOB = () => {
  const [rows, setrows] = useState([]);

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
    },

    {
      field: "FechaCreacion",
      headerName: "Fecha Creación",
      description: "Fecha Creación",

      width: 150,
    },
    {
      field: "NAMEUSUARIO",
      headerName: "Usuario Generador",
      description: "Usuario Generador",
      width: 150,
    },
    {
      field: "NombreCuenta",
      headerName: "Nombre de la Cuenta",
      description: "Nombre de la Cuenta",
      width: 250,
    },
    {
      field: "NombreBanco",
      headerName: "Banco",
      description: "Banco",
      width: 150,
    },

    {
      field: "NumeroCuenta",
      headerName: "Cuenta",
      description: "Cuenta",
      width: 250,
    },
    {
      field: "ClabeBancaria",
      headerName: "Clabe",
      description: "Clabe",
      width: 250,
    },

    {
      field: "EstatusDescripcion",
      headerName: "Estatus",
      description: "Estatus",
      width: 250,
    },
  ];
  return (
    <div>
      <MUIXDataGrid columns={columns} rows={rows} />
    </div>
  );
};

export default SIREGOB;
