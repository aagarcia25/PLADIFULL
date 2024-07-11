const dotenv = require("dotenv");
const express = require("express");
const fs2 = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const xlsx = require("xlsx");
const ruta = "D:\\PLADI";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { parse, format } = require("date-fns");
dotenv.config();
const app = express();
const PORT = 3001;
const HOST = "0.0.0.0";
const uil = require("../Server/responseBuilder.js");
const db_connect = require("./db"); // Importa la configuración de la base de datos

app.use(bodyParser.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const { username, pass } = req.body;

  if (!username || !pass) {
    return res.status(400).json({ error: "Missing username or password" });
  }

  const sql = `SELECT *
               FROM usuarios
               WHERE NombreUsuario = ? AND Contrasena = ? AND Deleted = 0`;

  try {
    const result = await uil.executeQuery(sql, [username, pass]);

    if (result.length > 0) {
      res.status(200).json({ message: "Login successful", user: result[0] });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error executing query:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/siregob", async (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};

  try {
    if (TIPO == 4) {
      sql = `SELECT
                Id,
                Deleted,
                UltimaActualizacion,
                FechaCreacion,
                ModificadoPor,
                CreadoPor,
                idContrato,
                NombreContrato,
                DATE_FORMAT( FechaContrato, '%d/%m/%Y') AS FechaContrato,
                pdfContrato,
                ObjetivoContrato,
                MontoContrato,
                PropuestaTecnica,
                PropuestaEconomica
             FROM siregob_01`;
    } else if (TIPO == 5 && BUSQUEDA !== "") {
      sql = `SELECT 
                Id,
                Deleted,
                UltimaActualizacion,
                FechaCreacion,
                ModificadoPor,
                CreadoPor,
                idContrato,
                NombreContrato,
                 DATE_FORMAT( FechaContrato, '%d/%m/%Y') AS FechaContrato,
                pdfContrato,
                ObjetivoContrato,
                MontoContrato,
                PropuestaTecnica,
                PropuestaEconomica
             FROM siregob_01
             WHERE

                UPPER(NombreContrato) LIKE UPPER(CONCAT('%', ?, '%'))
                OR UPPER(FechaContrato) LIKE UPPER(CONCAT('%', ?, '%'))
                OR UPPER(pdfContrato) LIKE UPPER(CONCAT('%', ?, '%'))
                OR UPPER(ObjetivoContrato) LIKE UPPER(CONCAT('%', ?, '%'))
                OR UPPER(MontoContrato) LIKE UPPER(CONCAT('%', ?, '%'))
             ORDER BY 
                 FechaContrato DESC`;

      // Define los parámetros de búsqueda
      const parametro_busqueda = Array(5).fill(BUSQUEDA);
      params = parametro_busqueda;
    } else {
      return res.status(400).json({ error: "Invalid request parameters" });
    }

    const rows = await uil.executeQuery(sql, params);

    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  } catch (error) {
    console.error("Error retrieving data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/AUDITORIA", async (req, res) => {
  try {
    const { TIPO, BUSQUEDA } = req.body;
    let sql;
    let params = [];

    if (TIPO == 4) {
      sql = `
        SELECT
          id,
          Folio,
          OficioDependencia,
          Secretaria,
          Dependencia,
          TipoGasto,
          Responsable,
          TipoSolicitud,
          DATE_FORMAT(FechaOficio, '%d/%m/%Y') AS FechaOficio,
          DATE_FORMAT(FechaRecepcion, '%d/%m/%Y') AS FechaRecepcion,
          DATE_FORMAT(FechaElaboracion, '%d/%m/%Y') AS FechaElaboracion,
          DATE_FORMAT(FechaVencimiento, '%d/%m/%Y') AS FechaVencimiento,
          Monto,
          Comentarios,
          DATE_FORMAT(FechaTurno, '%d/%m/%Y') AS FechaTurno,
          ObservacionesEstatus,
          NumOficioContestacion,
          DATE_FORMAT(FechaTurnada, '%d/%m/%Y') AS FechaTurnada,
          DATE_FORMAT(FechaTerminada, '%d/%m/%Y') AS FechaTerminada,
          ObsTerminada,
          AutNoAut
        FROM auditoria;
      `;
    } else if (TIPO == 5 && BUSQUEDA !== "") {
      sql = `
        SELECT
          id,
          Folio,
          OficioDependencia,
          Secretaria,
          Dependencia,
          TipoGasto,
          Responsable,
          TipoSolicitud,
          DATE_FORMAT(FechaOficio, '%d/%m/%Y') AS FechaOficio,
          DATE_FORMAT(FechaRecepcion, '%d/%m/%Y') AS FechaRecepcion,
          DATE_FORMAT(FechaElaboracion, '%d/%m/%Y') AS FechaElaboracion,
          DATE_FORMAT(FechaVencimiento, '%d/%m/%Y') AS FechaVencimiento,
          Monto,
          Comentarios,
          DATE_FORMAT(FechaTurno, '%d/%m/%Y') AS FechaTurno,
          ObservacionesEstatus,
          NumOficioContestacion,
          DATE_FORMAT(FechaTurnada, '%d/%m/%Y') AS FechaTurnada,
          DATE_FORMAT(FechaTerminada, '%d/%m/%Y') AS FechaTerminada,
          ObsTerminada,
          AutNoAut
        FROM auditoria
        WHERE
          UPPER(Folio) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(OficioDependencia) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(Secretaria) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(Dependencia) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(TipoGasto) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(Responsable) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(TipoSolicitud) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(DATE_FORMAT(FechaOficio, '%d/%m/%Y')) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(DATE_FORMAT(FechaRecepcion, '%d/%m/%Y')) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(DATE_FORMAT(FechaElaboracion, '%d/%m/%Y')) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(DATE_FORMAT(FechaVencimiento, '%d/%m/%Y')) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(FORMAT(Monto, 2)) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(Comentarios) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(DATE_FORMAT(FechaTurno, '%d/%m/%Y')) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(ObservacionesEstatus) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(NumOficioContestacion) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(DATE_FORMAT(FechaTurnada, '%d/%m/%Y')) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(DATE_FORMAT(FechaTerminada, '%d/%m/%Y')) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(ObsTerminada) LIKE CONCAT('%', UPPER(?), '%')
          OR UPPER(AutNoAut) LIKE CONCAT('%', UPPER(?), '%');
      `;

      // Define los parámetros de búsqueda
      params = Array(20).fill(BUSQUEDA);
    }

    console.log(params);
    const rows = await uil.executeQuery(sql, params);

    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  } catch (error) {
    console.error("Error retrieving data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/presupuesto", async (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = [];

  if (TIPO == 4) {
    sql = `
      SELECT
        id,
        Folio,
        OficioRespuesta,
        OficioDependencia,
        Secretaria,
        Dependencia,
        TipoGasto,
        Estatus,
        Responsable,
        ClaveTipoSolicitud,
        TipoSolicitud,
        DATE_FORMAT(FechaOficio, '%d/%m/%Y') AS FechaOficio,
        DATE_FORMAT(FechaRecepcion, '%d/%m/%Y') AS FechaRecepcion,
        DATE_FORMAT(FechaElaboracion, '%d/%m/%Y') AS FechaElaboracion,
        DATE_FORMAT(FechaVencimiento, '%d/%m/%Y') AS FechaVencimiento,
        Monto,
        MontoAmpliacion,
        Comentarios,
        DATE_FORMAT(FechaTurno, '%d/%m/%Y') AS FechaTurno,
        ObservacionesEstatus,
        DATE_FORMAT(FechaTurnada, '%d/%m/%Y') AS FechaTurnada,
        DATE_FORMAT(FechaTerminada, '%d/%m/%Y') AS FechaTerminada,
        Anio
      FROM presupuestos;
    `;
  } else if (TIPO == 5 && BUSQUEDA !== "") {
    sql = `
      SELECT
        id,
        Folio,
        OficioRespuesta,
        OficioDependencia,
        Secretaria,
        Dependencia,
        TipoGasto,
        Estatus,
        Responsable,
        ClaveTipoSolicitud,
        TipoSolicitud,
        DATE_FORMAT(FechaOficio, '%d/%m/%Y') AS FechaOficio,
        DATE_FORMAT(FechaRecepcion, '%d/%m/%Y') AS FechaRecepcion,
        DATE_FORMAT(FechaElaboracion, '%d/%m/%Y') AS FechaElaboracion,
        DATE_FORMAT(FechaVencimiento, '%d/%m/%Y') AS FechaVencimiento,
        Monto,
        MontoAmpliacion,
        Comentarios,
        DATE_FORMAT(FechaTurno, '%d/%m/%Y') AS FechaTurno,
        ObservacionesEstatus,
        DATE_FORMAT(FechaTurnada, '%d/%m/%Y') AS FechaTurnada,
        DATE_FORMAT(FechaTerminada, '%d/%m/%Y') AS FechaTerminada,
        Anio
      FROM presupuestos
      WHERE
        UPPER(Folio) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(OficioRespuesta) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(OficioDependencia) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(Secretaria) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(Dependencia) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(TipoGasto) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(Estatus) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(Responsable) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(ClaveTipoSolicitud) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(TipoSolicitud) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(DATE_FORMAT(FechaOficio, '%d/%m/%Y')) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(DATE_FORMAT(FechaRecepcion, '%d/%m/%Y')) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(DATE_FORMAT(FechaElaboracion, '%d/%m/%Y')) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(DATE_FORMAT(FechaVencimiento, '%d/%m/%Y')) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(FORMAT(Monto, 2)) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(FORMAT(MontoAmpliacion, 2)) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(Comentarios) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(DATE_FORMAT(FechaTurno, '%d/%m/%Y')) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(ObservacionesEstatus) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(DATE_FORMAT(FechaTurnada, '%d/%m/%Y')) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(DATE_FORMAT(FechaTerminada, '%d/%m/%Y')) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(Anio) LIKE UPPER(CONCAT('%', ?, '%'));
    `;

    // Define los parámetros de búsqueda, 22 campos en total
    params = Array(22).fill(BUSQUEDA);
  }

  try {
    const rows = await uil.executeQuery(sql, params);

    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  } catch (error) {
    console.error("Error retrieving data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/transferencias", async (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = [];

  if (TIPO == 4) {
    sql = `
      SELECT 
        id,
        Anio,
        Folio,
        OficioDependencia,
        Secretaria,
        Dependencia,
        TipoGasto,
        Estatus,
        Responsable,
        TipoSolicitud,
        DATE_FORMAT(FechaOficio, '%d/%m/%Y') AS FechaOficio,
        DATE_FORMAT(FechaRecepcion, '%d/%m/%Y') AS FechaRecepcion,
        Monto,
        Comentarios,
        AsignadoDependencia,
        TramitadoDAMOP,
        DATE_FORMAT(FechaCapturada, '%d/%m/%Y') AS FechaCapturada,
        ObservacionesCapturada,
        ObservacionesTurnada,
        DATE_FORMAT(FechaStanBy, '%d/%m/%Y') AS FechaStanBy,
        ObservacionesStandBy,
        DATE_FORMAT(FechaTerminada, '%d/%m/%Y') AS FechaTerminada,
        ObservacionesTerminada
      FROM transferencias;
    `;
  } else if (TIPO == 5 && BUSQUEDA !== "") {
    sql = `
      SELECT 
        id,
        Anio,
        Folio,
        OficioDependencia,
        Secretaria,
        Dependencia,
        TipoGasto,
        Estatus,
        Responsable,
        TipoSolicitud,
        DATE_FORMAT(FechaOficio, '%d/%m/%Y') AS FechaOficio,
        DATE_FORMAT(FechaRecepcion, '%d/%m/%Y') AS FechaRecepcion,
        Monto,
        Comentarios,
        AsignadoDependencia,
        TramitadoDAMOP,
        DATE_FORMAT(FechaCapturada, '%d/%m/%Y') AS FechaCapturada,
        ObservacionesCapturada,
        ObservacionesTurnada,
        DATE_FORMAT(FechaStanBy, '%d/%m/%Y') AS FechaStanBy,
        ObservacionesStandBy,
        DATE_FORMAT(FechaTerminada, '%d/%m/%Y') AS FechaTerminada,
        ObservacionesTerminada
      FROM transferencias
      WHERE
        UPPER(Folio) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(OficioDependencia) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(Secretaria) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(Dependencia) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(TipoGasto) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(Estatus) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(Responsable) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(TipoSolicitud) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(DATE_FORMAT(FechaOficio, '%d/%m/%Y')) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(DATE_FORMAT(FechaRecepcion, '%d/%m/%Y')) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(FORMAT(Monto, 2)) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(Comentarios) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(DATE_FORMAT(FechaStanBy, '%d/%m/%Y')) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(DATE_FORMAT(FechaTerminada, '%d/%m/%Y')) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(Anio) LIKE UPPER(CONCAT('%', ?, '%'));
    `;

    // Define los parámetros de búsqueda, 16 campos en total
    params = Array(16).fill(BUSQUEDA);
  }

  try {
    console.log(sql);
    const rows = await uil.executeQuery(sql, params);

    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  } catch (error) {
    console.error("Error retrieving data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/PPI", async (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};
  if (TIPO == 4) {
    sql = `
     SELECT
     Id,
     Anio,
     Noficio,
     DATE_FORMAT( Fecha, '%d/%m/%Y') AS Fecha,
     TipoOficio,
     Dependencia,
     Descripcion,
     Importe
     FROM ppi
   `;
  } else if (TIPO == 5 && BUSQUEDA !== "") {
    sql = `SELECT 
      Id,
      Anio,
      Noficio,
    DATE_FORMAT( Fecha, '%d/%m/%Y') AS Fecha,
      TipoOficio,
      Dependencia,
      Descripcion,
      Importe
  FROM 
      ppi
  WHERE
      UPPER(Anio) LIKE UPPER(CONCAT('%', ?, '%'))
      OR UPPER(Noficio) LIKE UPPER(CONCAT('%', ?, '%'))
      OR UPPER(TipoOficio) LIKE UPPER(CONCAT('%', ?, '%'))
      OR UPPER(Dependencia) LIKE UPPER(CONCAT('%', ?, '%'))
      OR UPPER(Descripcion) LIKE UPPER(CONCAT('%', ?, '%'))
      OR UPPER(Importe) LIKE UPPER(CONCAT('%', ?, '%'))
`;
    // Define los parámetros de búsqueda
    const parametro_busqueda = Array(6).fill(BUSQUEDA);
    params = parametro_busqueda;
  }
  const rows = await uil.executeQuery(sql, params);
  if (rows.length > 0) {
    res
      .status(200)
      .json({ message: "Data retrieved successfully", datos: rows });
  } else {
    res.status(200).json({ message: "Data retrieved successfully", datos: [] });
  }
});

app.post("/MPD", async (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};
  if (TIPO == 4) {
    sql = `
      SELECT * FROM manualoperacion
   `;
  }
  const rows = await uil.executeQuery(sql, params);

  if (rows.length > 0) {
    res
      .status(200)
      .json({ message: "Data retrieved successfully", datos: rows });
  } else {
    res.status(200).json({ message: "Data retrieved successfully", datos: [] });
  }
});

app.post("/PF", async (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};

  if (TIPO == 4) {
    sql = `
      SELECT * FROM pf
   `;
  }
  const rows = await uil.executeQuery(sql, params);

  if (rows.length > 0) {
    res
      .status(200)
      .json({ message: "Data retrieved successfully", datos: rows });
  } else {
    res.status(200).json({ message: "Data retrieved successfully", datos: [] });
  }
});

app.post("/gastocorriente", async (req, res) => {
  const { TIPO, BUSQUEDA, ANIO } = req.body;
  let sql;
  let params = {};
  console.log("ANIO: ",ANIO);
  if (TIPO == 4) {
    sql = `
       SELECT * 
        FROM polizas
        WHERE AnioEspecifico LIKE ?
      `;
    params = Array(1).fill(ANIO);
    console.log("params: ",params);
  } else if (TIPO == 5 && BUSQUEDA !== "") {
    sql = `
     SELECT * FROM polizas
     WHERE
       and Texto <> ''
       and Archivo <> '' 
       and(
        UPPER(sp) LIKE UPPER(CONCAT('%', ?, '%'))
        OR UPPER(texto) LIKE UPPER(CONCAT('%', ?, '%'))
       )`;

    // Define los parámetros de búsqueda, 22 campos en total
    params = Array(2).fill(BUSQUEDA);
  }
  const rows = await uil.executeQuery(sql, params);

  if (rows.length > 0) {
    res
      .status(200)
      .json({ message: "Data retrieved successfully", datos: rows });
  } else {
    res.status(200).json({ message: "Data retrieved successfully", datos: [] });
  }
});

const createFolderIfNotExists = async (folderPath) => {
  try {
    await fs2.access(folderPath);
  } catch (error) {
    await fs2.mkdir(folderPath, { recursive: true });
  }
};

// Función para eliminar directorios de manera recursiva
const removeFolderRecursive = async (dir) => {
  const contents = await fs2.readdir(dir);

  for (const content of contents) {
    const contentPath = path.join(dir, content);
    const stat = await fs2.lstat(contentPath);

    if (stat.isDirectory()) {
      // Si es un directorio, llamar a la función recursivamente
      await removeFolderRecursive(contentPath);
    } else {
      // Si es un archivo, eliminarlo
      await fs2.unlink(contentPath);
    }
  }

  // Después de eliminar el contenido, eliminar el directorio en sí
  await fs2.rmdir(dir);
};

const ListadoGlobalFiles = async (folderPath) => {
  try {
    const archivosPDF = [];
    const content = await fs2.readdir(folderPath);
    for (const elemento of content) {
      const rutaElemento = path.join(folderPath, elemento);
      const stats = await fs2.stat(rutaElemento);
      if (stats.isDirectory()) {
        const archivosSubcarpeta = await ListadoGlobalFiles(rutaElemento);
        archivosPDF.push(...archivosSubcarpeta);
      } else if (stats.isFile() && elemento.toLowerCase().endsWith(".pdf")) {
        archivosPDF.push(rutaElemento);
      }
    }
    return archivosPDF;
  } catch (error) {
    throw new Error(
      "Error al obtener el listado global de archivos PDF: " + error.message
    );
  }
};

app.post("/getListFiles", async (req, res) => {
  try {
    if (!req.body.P_ROUTE) {
      throw new Error("No se proporcionó la ruta del archivo");
    }
    const filePath = path.join(ruta, req.body.P_ROUTE);
    await createFolderIfNotExists(filePath);
    const content = await fs2.readdir(filePath);

    const filesAndDirectories = await Promise.all(
      content.map(async (item) => {
        const itemPath = path.join(filePath, item);
        const stat = await fs2.stat(itemPath);
        return {
          id: uuidv4(),
          name: item,
          isFile: stat.isFile(),
          isDirectory: stat.isDirectory(),
        };
      })
    );
    filesAndDirectories.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );
    const responseData = uil.buildResponse(
      filesAndDirectories,
      true,
      200,
      "Éxito"
    );
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = uil.buildResponse(null, false, 500, error.message);
    res.status(500).json(responseData);
  }
});

app.post("/getFile", async (req, res) => {
  try {
    if (!req.body.P_ROUTE) {
      throw new Error("No se proporcionó la ruta del archivo");
    }

    if (!req.body.P_NOMBRE) {
      throw new Error("No se proporcionó el nombre del archivo");
    }
    const fileExtension = path.extname(req.body.P_NOMBRE);
    const filePath = `${ruta}/${req.body.P_ROUTE}/${req.body.P_NOMBRE}`;
    const fileContent = await fs2.readFile(filePath, { encoding: "base64" });

    const responseData = uil.buildResponse(
      { FILE: fileContent, TIPO: fileExtension },
      true,
      200,
      "Exito"
    );
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = uil.buildResponse(null, false, 500, error.message);
    res.status(500).json(responseData);
  }
});

app.post("/inapGralAll", async (req, res) => {
  const sql = `
   SELECT inap.Id,
       inap.Clave,
       inap.Deleted,
       inap.UltimaActualizacion,
       inap.FechaCreacion,
       inap.ModificadoPor,
       inap.CreadoPor,
       inap.FechaConveniogrlinicio,
       inap.FechaConveniogrlfin,
       inap.NombreConvenio
       FROM inap_gral inap
       WHERE  inap.Deleted=0
       order by inap.Clave
   `;
  const rows = await uil.executeQuery(sql, []);

  if (rows.length > 0) {
    res
      .status(200)
      .json({ message: "Data retrieved successfully", datos: rows });
  } else {
    res.status(200).json({ message: "Data retrieved successfully", datos: [] });
  }
});

app.post("/inapGral01All", async (req, res) => {
  const sql = `
   SELECT 
   inap01.Id,
	inap01.IdGral,
	inap01.Deleted,
	inap01.UltimaActualizacion,
	inap01.FechaCreacion,
	inap01.ModificadoPor,
	inap01.CreadoPor,
	inap01.Clave,
	inap01.FechaConvenioinicio,
	inap01.FechaConveniofin,
	inap01.NombreConvenio,
	inap01.Objetivo,
	inap01.Monto,
	inap01.FechaFiniquito
  FROM inap_gral_01 inap01
  WHERE inap01.Deleted =0
   `;
  const rows = await uil.executeQuery(sql, []);

  if (rows.length > 0) {
    res
      .status(200)
      .json({ message: "Data retrieved successfully", datos: rows });
  } else {
    res.status(200).json({ message: "Data retrieved successfully", datos: [] });
  }
});

app.post("/inap", async (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};
  sql = `
   SELECT inap1.id,
       inap1.Clave as clavegeneral,
       DATE_FORMAT( FechaConveniogrlfin, '%d/%m/%Y') AS FechaConveniogrlfin,
       inap1.NombreConvenio as nombregeneral,
       inap2.Clave,
       DATE_FORMAT( FechaConvenioinicio, '%d/%m/%Y') AS FechaConvenioinicio,
       DATE_FORMAT( FechaConveniofin, '%d/%m/%Y')AS FechaConveniofin,
       Objetivo,
       Monto,
       DATE_FORMAT( FechaFiniquito, '%d/%m/%Y') AS FechaFiniquito,
       inap2.NombreConvenio
       FROM pladi.inap_gral inap1
       INNER JOIN pladi.inap_gral_01 inap2 ON inap1.id = inap2.IdGral 
       WHERE
      UPPER(inap1.Clave) LIKE UPPER(CONCAT('%', ?, '%'))
      OR UPPER(inap1.NombreConvenio) LIKE UPPER(CONCAT('%', ?, '%'))
      OR UPPER(inap2.Clave) LIKE UPPER(CONCAT('%', ?, '%'))
      OR UPPER(Objetivo) LIKE UPPER(CONCAT('%', ?, '%'))
      OR UPPER(Monto) LIKE UPPER(CONCAT('%', ?, '%'))
      OR UPPER(inap2.NombreConvenio) LIKE UPPER(CONCAT('%', ?, '%'))
   `;

  // Define los parámetros de búsqueda
  const parametro_busqueda = Array(6).fill(BUSQUEDA);
  params = parametro_busqueda;

  const rows = await uil.executeQuery(sql, params);

  if (rows.length > 0) {
    res
      .status(200)
      .json({ message: "Data retrieved successfully", datos: rows });
  } else {
    res.status(200).json({ message: "Data retrieved successfully", datos: [] });
  }
});

app.post("/onu", async (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};

  if (TIPO == 4) {
    sql = ` SELECT
        Id,
        FechaConvenio,
        NombreConvenio,
        ObjetivoConvenio,
        MontoConvenio
       FROM onu`;
  } else if (TIPO == 5 && BUSQUEDA !== "") {
    sql = ` SELECT
        Id,
        FechaConvenio,
        NombreConvenio,
        ObjetivoConvenio,
        MontoConvenio
       FROM onu
         WHERE
         UPPER(FechaConvenio) LIKE UPPER(CONCAT('%', ?, '%'))
         OR UPPER(NombreConvenio) LIKE UPPER(CONCAT('%', ?, '%'))
         OR UPPER(ObjetivoConvenio) LIKE UPPER(CONCAT('%', ?, '%'))
         OR UPPER(MontoConvenio) LIKE UPPER(CONCAT('%', ?, '%'))
       `;
    // Define los parámetros de búsqueda
    const parametro_busqueda = Array(4).fill(BUSQUEDA);
    params = parametro_busqueda;
  }

  const rows = await uil.executeQuery(sql, params);

  if (rows.length > 0) {
    res
      .status(200)
      .json({ message: "Data retrieved successfully", datos: rows });
  } else {
    res.status(200).json({ message: "Data retrieved successfully", datos: [] });
  }
});

app.post("/deletedFile", async (req, res) => {
  try {
    if (!req.body.P_ROUTE) {
      throw new Error("No se proporcionó la ruta del archivo");
    }

    if (!req.body.P_NOMBRE) {
      throw new Error("No se proporcionó el nombre del archivo");
    }
    const filePath = `${ruta}/${req.body.P_ROUTE}/${req.body.P_NOMBRE}`;
    await fs2.unlink(filePath);

    const responseData = uil.buildResponse([], true, 200, "Exito");
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = uil.buildResponse(null, false, 500, error.message);
    res.status(500).json(responseData);
  }
});

app.post("/deletedFolder", async (req, res) => {
  try {
    if (!req.body.P_ROUTE) {
      throw new Error("No se proporcionó la ruta del archivo");
    }

    const filePath = `${ruta}/${req.body.P_ROUTE}`;
    const exists = await fs2.stat(filePath);
    if (exists.isDirectory()) {
      await removeFolderRecursive(filePath);
    } else {
      throw new Error("La ruta proporcionada no es un directorio.");
    }

    const responseData = uil.buildResponse([], true, 200, "Exito");
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = uil.buildResponse(null, false, 500, error.message);
    res.status(500).json(responseData);
  }
});

app.post("/saveFile", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No se proporcionó ningún archivo en la solicitud.");
    }

    const contenido = req.file.buffer;
    const nombreArchivo = req.body.nombreArchivo;
    const rutacarpeta = req.body.ruta;

    if (!nombreArchivo) {
      throw new Error(
        "El nombre del archivo no está especificado en la solicitud."
      );
    }
    const rutaCARPETA = `${ruta}/${rutacarpeta}`;
    const rutaArchivo = `${ruta}/${rutacarpeta}/${nombreArchivo}`;

    await createFolderIfNotExists(rutaCARPETA);

    await fs2.writeFile(rutaArchivo, contenido);
    const responseData = uil.buildResponse([], true, 200, "Exito");
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = uil.buildResponse(null, false, 500, error.message);
    res.status(500).json(responseData);
  }
});

app.post("/getFileByRoute", async (req, res) => {
  try {
    if (!req.body.P_ROUTE) {
      throw new Error("No se proporcionó la ruta del archivo");
    }
    const filePath = `${req.body.P_ROUTE}`;
    const fileContent = await fs2.readFile(filePath, { encoding: "base64" });
    console.log("filePath: ",filePath);
    console.log("fileContent: ",fileContent);
    const responseData = uil.buildResponse(
      { FILE: fileContent, TIPO: ".pdf" },
      true,
      200,
      "Exito"
    );
    console.log("responseData: ",responseData);
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = uil.buildResponse(null, false, 500, error.message);
    res.status(500).json(responseData);
  }
});

function insertDataIntoDatabaseTransferencias(data) {
  return new Promise((resolve, reject) => {
    const insertQuery = `
      INSERT INTO transferencias ( Anio, Folio, OficioDependencia, Secretaria, Dependencia, TipoGasto, Estatus, Responsable, TipoSolicitud, FechaOficio, FechaRecepcion, Monto, Comentarios, AsignadoDependencia, TramitadoDAMOP, FechaCapturada, ObservacionesCapturada, ObservacionesTurnada, FechaStanBy, ObservacionesStandBy, FechaTerminada, ObservacionesTerminada)
      VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const row of data) {
      const values = [
        row.ANIO,
        row.Folio,
        row.OficioDependencia,
        row.Secretaria,
        row.Dependencia,
        row.TipoGasto,
        row.Estatus,
        row.Responsable,
        row.TipoSolicitud,
        row.FechaOficio
          ? format(uil.excelDateToJSDate(row.FechaOficio), "yyyy-MM-dd")
          : null,
        row.FechaRecepcion
          ? format(uil.excelDateToJSDate(row.FechaRecepcion), "yyyy-MM-dd")
          : null,
        row.Monto,
        row.Comentarios,
        row.AsignadoDependencia,
        row.TramitadoDAMOP,
        row.FechaCapturada
          ? format(uil.excelDateToJSDate(row.FechaCapturada), "yyyy-MM-dd")
          : null,
        row.ObservacionesCapturada,
        row.ObservacionesTurnada,
        row.FechaStanBy
          ? format(uil.excelDateToJSDate(row.FechaStanBy), "yyyy-MM-dd")
          : null,
        row.ObservacionesStandBy,
        row.FechaTerminada
          ? format(uil.excelDateToJSDate(row.FechaTerminada), "yyyy-MM-dd")
          : null,
        row.ObservacionesTerminada,
      ];

      db_connect.query(insertQuery, values, (err) => {
        if (err) {
          return reject(err);
        }
      });
    }
    resolve();
  });
}

function insertDataIntoDatabasePolizas(data) {
  return new Promise((resolve, reject) => {
    const insertQuery = `
      INSERT INTO polizas2 ( SP, Archivo, Texto)
      VALUES ( ?, ?, ?)
    `;

    for (const row of data) {
      console.log(row);
      const values = [row.SP, row.Archivo, row.Texto];

      db_connect.query(insertQuery, values, (err) => {
        if (err) {
          return reject(err);
        }
      });
    }
    resolve();
  });
}

function insertDataIntoDatabaseppi(data) {
  return new Promise((resolve, reject) => {
    const insertQuery = `
      INSERT INTO ppi ( Anio, Noficio, Fecha, TipoOficio, Dependencia, Descripcion, Importe)
      VALUES ( ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const row of data) {
      const values = [
        row.Anio,
        row.Noficio,
        row.Fecha
          ? format(uil.excelDateToJSDate(row.Fecha), "yyyy-MM-dd")
          : null,
        row.TipoOficio,
        row.Dependencia,
        row.Descripcion,
        row.Importe,
      ];
      console.log(values);
      db_connect.query(insertQuery, values, (err) => {
        if (err) {
          return reject(err);
        }
      });
    }
    resolve();
  });
}

function insertDataIntoDatabaseAmpliaciones(data) {
  return new Promise((resolve, reject) => {
    const insertQuery = `
      INSERT INTO presupuestos ( 
      Anio,	Folio,	OficioRespuesta,	
      OficioDependencia,	Secretaria	,Dependencia,	TipoGasto,	
      Estatus	,Responsable	,TipoSolicitud	,FechaOficio	,FechaRecepcion,	
      Monto,	Comentarios	,FechaTerminada
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    for (const row of data) {
      //console.log(row);
      const values = [
        row.Anio,
        row.Folio,
        row.OficioRespuesta,
        row.OficioDependencia,
        row.Secretaria,
        row.Dependencia,
        row.TipoGasto,
        row.Estatus,
        row.Responsable,
        row.TipoSolicitud,
        row.FechaOficio
          ? format(uil.excelDateToJSDate(row.FechaOficio), "yyyy-MM-dd")
          : null,
        row.FechaRecepcion
          ? format(uil.excelDateToJSDate(row.FechaRecepcion), "yyyy-MM-dd")
          : null,
        row.Monto,
        row.Comentarios,
        row.FechaTerminada
          ? format(uil.excelDateToJSDate(row.FechaTerminada), "yyyy-MM-dd")
          : null,
      ];

      db_connect.query(insertQuery, values, (err) => {
        if (err) {
          return reject(err);
        }
      });
    }
    resolve();
  });
}

function insertDataIntoDatabaseAuditorias(data) {
  return new Promise((resolve, reject) => {
    const insertQuery = `
      INSERT INTO auditoria ( 
      Folio,	NumOficioContestacion	,OficioDependencia,	Secretaria,
      Dependencia	,TipoGasto,	Responsable	,TipoSolicitud	,FechaOficio,
      FechaRecepcion,	FechaElaboracion,	FechaVencimiento,	Monto	,
      Comentarios,	FechaTurno	,ObservacionesEstatus,	FechaTurnada,	FechaTerminada,	ObsTerminada
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    for (const row of data) {
      //console.log(row);
      const values = [
        row.Folio,
        row.NumOficioContestacion,
        row.OficioDependencia,
        row.Secretaria,
        row.Dependencia,
        row.TipoGasto,
        row.Responsable,
        row.TipoSolicitud,
        row.FechaOficio
          ? format(uil.excelDateToJSDate(row.FechaOficio), "yyyy-MM-dd")
          : null,
        row.FechaRecepcion
          ? format(uil.excelDateToJSDate(row.FechaRecepcion), "yyyy-MM-dd")
          : null,
        row.FechaElaboracion
          ? format(uil.excelDateToJSDate(row.FechaElaboracion), "yyyy-MM-dd")
          : null,
        row.FechaVencimiento
          ? format(uil.excelDateToJSDate(row.FechaVencimiento), "yyyy-MM-dd")
          : null,
        row.Monto,
        row.Comentarios,
        row.FechaTurno
          ? format(uil.excelDateToJSDate(row.FechaTurno), "yyyy-MM-dd")
          : null,

        row.ObservacionesEstatus,
        row.FechaTurnada
          ? format(uil.excelDateToJSDate(row.FechaTurnada), "yyyy-MM-dd")
          : null,
        row.FechaTerminada
          ? format(uil.excelDateToJSDate(row.FechaTerminada), "yyyy-MM-dd")
          : null,
        row.ObsTerminada,
      ];

      db_connect.query(insertQuery, values, (err) => {
        if (err) {
          return reject(err);
        }
      });
    }
    resolve();
  });
}

function insertDataIntoDatabaseTransferencia(data) {
  return new Promise((resolve, reject) => {
    const insertQuery = `
      INSERT INTO transferencias ( 
      Anio,	Folio,	OficioDependencia	,Secretaria,	Dependencia,	TipoGasto,	Estatus	,Responsable	,
      TipoSolicitud	,FechaOficio	,FechaRecepcion	,Monto	,Comentarios,	AsignadoDependencia,	TramitadoDAMOP,	FechaCapturada,
      	ObservacionesCapturada,	ObservacionesTurnada	,FechaStanBy	,ObservacionesStandBy,	FechaTerminada	,ObservacionesTerminada
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    for (const row of data) {
      //console.log(row);
      const values = [
        row.Anio,
        row.Folio,
        row.OficioDependencia,
        row.Secretaria,
        row.Dependencia,
        row.TipoGasto,
        row.Estatus,
        row.Responsable,
        row.TipoSolicitud,
        row.FechaOficio
          ? format(uil.excelDateToJSDate(row.FechaOficio), "yyyy-MM-dd")
          : null,
        row.FechaRecepcion
          ? format(uil.excelDateToJSDate(row.FechaRecepcion), "yyyy-MM-dd")
          : null,
        row.Monto,
        row.Comentarios,
        row.AsignadoDependencia,
        row.TramitadoDAMOP,
        row.FechaCapturada,
        row.ObservacionesCapturada,
        row.ObservacionesTurnada,
        row.FechaStanBy
          ? format(uil.excelDateToJSDate(row.FechaStanBy), "yyyy-MM-dd")
          : null,
        row.ObservacionesStandBy,
        row.FechaTerminada
          ? format(uil.excelDateToJSDate(row.FechaTerminada), "yyyy-MM-dd")
          : null,
        row.ObservacionesTerminada,
      ];

      db_connect.query(insertQuery, values, (err) => {
        if (err) {
          return reject(err);
        }
      });
    }
    resolve();
  });
}

// Ruta para manejar la subida del archivo Excel
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Obtener el buffer del archivo subido
    const buffer = req.file.buffer;
    if (!req.body.tipo) {
      return res.status(200).json({ message: "No se encontro el tipo" });
    }

    // Leer el contenido del buffer usando xlsx
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    if (req.body.tipo == "AMPLIACIONES") {
      await insertDataIntoDatabaseAmpliaciones(data);
    } else if (req.body.tipo == "AUDITORIA") {
      await insertDataIntoDatabaseAuditorias(data);
    } else if (req.body.tipo == "TRASNFERENCIAS") {
      await insertDataIntoDatabaseTransferencia(data);
    } else if (req.body.tipo == "PPI") {
      await insertDataIntoDatabaseppi(data);
    } else {
      return res
        .status(200)
        .json({ message: "No se encontro el tipo  " + req.body.tipo });
    }
    //await insertDataIntoDatabaseTransferencias(data);
    //await insertDataIntoDatabaseppi(data);
    //await insertDataIntoDatabasePolizas(data);
    res.status(200).json({ message: "MIGRACIÓN DE  " + req.body.tipo });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const server = app.listen(PORT, HOST, () => {
  const { address, port } = server.address();
  console.log(`Server running on http://${address}:${port}`);
});
