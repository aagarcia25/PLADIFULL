export type inapgral = {
  Id: string;
  Clave: string;
  Deleted: number;
  UltimaActualizacion: string;
  FechaCreacion: string;
  ModificadoPor: string;
  CreadoPor: string;
  FechaConveniogrlinicio: string;
  FechaConveniogrlfin: string;
  RouteConvenio: string;
  NombreFile: string;
  NombreConvenio: string;
};

export type inapgral01 = {
  Id: string;
  IdGral: string;
  Deleted: number;
  UltimaActualizacion: string;
  FechaCreacion: string;
  ModificadoPor: string;
  CreadoPor: string;
  Clave: number;
  FechaConvenioinicio: string;
  FechaConveniofin: string;
  RouteConvenio: any;
  NombreFile: any;
  NombreConvenio: string;
  Objetivo: string;
  Monto: string;
  FechaFiniquito: string;
  RouteFiniquito: any;
  NombreFileFiniquito: any;
};

export type entregables = {
  Id: string;
  inap0101_Id: string;
  inap0101_IdGral01: string;
  inap0101_Clave: number;
  inap0101_Deleted: number;
  inap0101_UltimaActualizacion: string;
  inap0101_FechaCreacion: string;
  inap0101_ModificadoPor: string;
  inap0101_CreadoPor: string;
  inap0101_FechaEntregable: string;
  inap0101_Nombre: string;
  inap0101_RouteConvenio: any;
  inap0101_NombreFile: string;
  inap0102_Id: string;
  inap0102_IdGral01: string;
  inap0102_Deleted: number;
  inap0102_UltimaActualizacion: string;
  inap0102_FechaCreacion: string;
  inap0102_ModificadoPor: string;
  inap0102_CreadoPor: string;
  inap0102_FechaActa: string;
  inap0102_NombreActa: string;
  inap0102_RouteConvenio: any;
  inap0102_NombreFile: string;
  inap0103_Id: string;
  inap0103_IdGral01: string;
  inap0103_Deleted: number;
  inap0103_UltimaActualizacion: string;
  inap0103_FechaCreacion: string;
  inap0103_ModificadoPor: string;
  inap0103_CreadoPor: string;
  inap0103_FechaFactura: string;
  inap0103_Factura: string;
  inap0103_RouteFactura: string;
  inap0103_NombreFile: string;
  inap0103_Monto: number;
};

export type facturas = {
  Id: string;
  inap0103_IdGral01: string;
  inap0103_Deleted: number;
  inap0103_UltimaActualizacion: string;
  inap0103_FechaCreacion: string;
  inap0103_ModificadoPor: string;
  inap0103_CreadoPor: string;
  inap0103_FechaFactura: string;
  inap0103_Factura: string;
  inap0103_Monto: number;
};

export type actas = {
  Id: string;
  inap0102_IdGral01: string;
  inap0102_Deleted: number;
  inap0102_UltimaActualizacion: string;
  inap0102_FechaCreacion: string;
  inap0102_ModificadoPor: string;
  inap0102_CreadoPor: string;
  inap0102_FechaActa: string;
  inap0102_NombreActa: string;
};

export type pagos = {
  Id: string;
  IdGral0103: string;
  Deleted: number;
  UltimaActualizacion: string;
  FechaCreacion: string;
  ModificadoPor: string;
  CreadoPor: string;
  FechaPresupuesto: string;
  FechaPAgo: string;
  RouteSpei: string;
  NombreFile: string;
};
