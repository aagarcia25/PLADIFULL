import {
  DataGrid,
  GridColumnVisibilityModel,
  GridToolbar,
} from "@mui/x-data-grid";
import React from "react";

export default function MUIXDataGridSimple(props: any) {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      id: false,
    });

  return (
    <div style={{ height: "70vh", overflow: "auto" }}>
      <DataGrid
        {...props.rows}
        columns={props.columns}
        rows={props.rows}
        density="compact"
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        rowsPerPageOptions={[10, 25, 50, 100]}
        disableSelectionOnClick
        disableDensitySelector
        getRowId={(row) => (row.Id ? row.Id : row.id)}
        pageSize={10}
        getRowHeight={() => "auto"}
        sx={{
          fontFamily: "Poppins,sans-serif",
          fontWeight: "600",
          fontSize: "12px",
          "& .super-app.positive": {
            color: "#000000",
          },
        }}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            label: "Buscar",
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
            csvOptions: {
              fileName: props.modulo,
              utf8WithBom: true,
            },
          },
        }}
        localeText={{
          columnsPanelHideAllButton: "Ocultar todo",
          columnsPanelShowAllButton: "Mostrar todo",
          columnsPanelTextFieldPlaceholder: "",
          columnsPanelTextFieldLabel: "Buscar",
          noRowsLabel: "No se ha encontrado datos.",
          noResultsOverlayLabel: "No se ha encontrado ningún resultado",
          toolbarColumns: "Columnas",
          toolbarExport: "Exportar",
          toolbarColumnsLabel: "Seleccionar columnas",
          toolbarFilters: "Filtros",
          toolbarFiltersLabel: "Ver filtros",
          toolbarFiltersTooltipHide: "Quitar filtros",
          toolbarFiltersTooltipShow: "Ver filtros",
          toolbarQuickFilterPlaceholder: "Buscar",
          toolbarExportCSV: "Descargar como CSV",
          toolbarExportPrint: "Imprimir",
          checkboxSelectionSelectRow: "Filas seleccionadas",
          checkboxSelectionSelectAllRows: "Seleccionar todas las filas",
          errorOverlayDefaultLabel: "Ha ocurrido un error.",
          footerRowSelected: (count) =>
            count > 1
              ? `${count.toLocaleString()} filas seleccionadas`
              : `${count.toLocaleString()} fila seleccionada`,
          footerTotalRows: "Filas Totales:",
          columnMenuLabel: "Menú",
          columnMenuShowColumns: "Mostrar columnas",
          columnMenuFilter: "Filtro",
          columnMenuHideColumn: "Ocultar",
          columnMenuUnsort: "Desordenar",
          columnMenuSortAsc: "Ordenar ASC",
          columnMenuSortDesc: "Ordenar DESC",
          columnHeaderFiltersTooltipActive: (count) =>
            count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
          columnHeaderFiltersLabel: "Mostrar filtros",
          columnHeaderSortIconLabel: "Ordenar",
          filterPanelColumns: "Columnas",
          filterOperatorContains: "Contiene",
          filterOperatorEquals: "Igual",
          filterOperatorStartsWith: "Comienza Con",
          filterOperatorEndsWith: "Termina Con",
          filterOperatorIsEmpty: "Es Vacio",
          filterOperatorIsNotEmpty: "No Vacio",
          filterOperatorIsAnyOf: "Es Cualquiera de",
          filterPanelInputLabel: "Valor",
          filterPanelInputPlaceholder: "Valor Filtrado",
        }}
      />
    </div>
  );
}
