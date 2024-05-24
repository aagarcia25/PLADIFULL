const express = require("express");
const fs2 = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");

const ruta = "C:\\PLADI";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
const port = 3001;

const buildResponse = (response, success, numCode, strMessage) => ({
  RESPONSE: response,
  SUCCESS: success,
  NUMCODE: numCode,
  STRMESSAGE: strMessage,
});

const db = new sqlite3.Database("database/database.db");
app.use(bodyParser.json());
app.use(cors());

const schema = fs.readFileSync("database/schema.sql", "utf8");

db.exec(schema, function (err) {
  if (err) {
    console.error("Error al ejecutar el esquema SQL:", err.message);
    return;
  }
  console.log("Esquema SQL ejecutado con éxito");

  db.serialize(() => {
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
      if (err) {
        console.error("Error al consultar la tabla sqlite_master:", err);
        return;
      }
      console.log(
        "Tablas en la base de datos:",
        rows.map((row) => row.name)
      );
    });
  });

  db.serialize(() => {
    db.all("SELECT * FROM usuarios", (err, rows) => {
      if (err) {
        console.error("Error al consultar la tabla usuarios:", err);
        return;
      }
      console.log("Información de la tabla usuarios:");
      rows.forEach((row) => {
        console.log(row);
      });
    });
  });
});

app.post("/login", (req, res) => {
  const { username, pass } = req.body;

  if (!username || !pass) {
    return res.status(400).json({ error: "Missing username or password" });
  }

  const sql = `SELECT *
     FROM usuarios
     WHERE NombreUsuario = ? AND Contrasena = ? AND Deleted = 0`;
  db.get(sql, [username, pass], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (row) {
      res.status(200).json({ message: "Login successful", user: row });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

app.post("/siregob", (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};

  if (TIPO == 4) {
    sql = ` SELECT
        Id,
        Deleted,
        UltimaActualizacion,
        FechaCreacion,
        ModificadoPor,
        CreadoPor,
        idContrato,
        NombreContrato,
        FechaContrato,
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
        strftime('%d/%m/%Y', FechaContrato) AS FechaContrato,
        pdfContrato,
        ObjetivoContrato,
        MontoContrato,
        PropuestaTecnica,
        PropuestaEconomica
      FROM 
        siregob_01
      WHERE
        UPPER(NombreContrato) LIKE '%' || UPPER($parametro_busqueda) || '%'
        OR UPPER(strftime('%d/%m/%Y', FechaContrato)) LIKE '%' || UPPER($parametro_busqueda) || '%'
        OR UPPER(pdfContrato) LIKE '%' || UPPER($parametro_busqueda) || '%'
        OR UPPER(ObjetivoContrato) LIKE '%' || UPPER($parametro_busqueda) || '%'
        OR UPPER(MontoContrato) LIKE '%' || UPPER($parametro_busqueda) || '%'
      ORDER BY 
        strftime('%Y', FechaContrato) DESC`;

    // Define el parámetro de búsqueda
    params.$parametro_busqueda = BUSQUEDA;
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  });
});

app.post("/AUDITORIA", (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};

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
       strftime('%d/%m/%Y', FechaOficio) AS FechaOficio,
       strftime('%d/%m/%Y', FechaRecepcion) AS FechaRecepcion,
       strftime('%d/%m/%Y', FechaElaboracion) AS FechaElaboracion,
       strftime('%d/%m/%Y', FechaVencimiento) AS FechaVencimiento,
       printf('%.2f', Monto) AS Monto,
       Comentarios,
       strftime('%d/%m/%Y', FechaTurno) AS FechaTurno,
       ObservacionesEstatus,
       NumOficioContestacion,
       strftime('%d/%m/%Y', FechaTurnada) AS FechaTurnada,
       strftime('%d/%m/%Y', FechaTerminada) AS FechaTerminada,
       ObsTerminada,
       AutNoAut
     FROM auditoria;
   `;
  } else if (TIPO == 5 && BUSQUEDA !== "") {
    sql = `SELECT
      id,
      Folio,
      OficioDependencia,
      Secretaria,
      Dependencia,
      TipoGasto,
      Responsable,
      TipoSolicitud,
      strftime('%d/%m/%Y', FechaOficio) AS FechaOficio,
      strftime('%d/%m/%Y', FechaRecepcion) AS FechaRecepcion,
      strftime('%d/%m/%Y', FechaElaboracion) AS FechaElaboracion,
      strftime('%d/%m/%Y', FechaVencimiento) AS FechaVencimiento,
      FORMAT(Monto, 2) AS Monto,
      Comentarios,
      strftime('%d/%m/%Y', FechaTurno) AS FechaTurno,
      ObservacionesEstatus,
      NumOficioContestacion,
      strftime('%d/%m/%Y', FechaTurnada) AS FechaTurnada,
      strftime('%d/%m/%Y', FechaTerminada) AS FechaTerminada,
      ObsTerminada,
      AutNoAut
  FROM
      auditoria
  WHERE
      UPPER(Folio) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(OficioDependencia) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(Secretaria) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(Dependencia) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(TipoGasto) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(Responsable) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(TipoSolicitud) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(strftime('%d/%m/%Y', FechaOficio)) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(strftime('%d/%m/%Y', FechaRecepcion)) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(strftime('%d/%m/%Y', FechaElaboracion)) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(strftime('%d/%m/%Y', FechaVencimiento)) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(FORMAT(Monto, 2)) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(Comentarios) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(strftime('%d/%m/%Y', FechaTurno)) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(ObservacionesEstatus) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(NumOficioContestacion) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(strftime('%d/%m/%Y', FechaTurnada)) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(strftime('%d/%m/%Y', FechaTerminada)) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(ObsTerminada) LIKE '%' || UPPER($parametro_busqueda) || '%'
      OR UPPER(AutNoAut) LIKE '%' || UPPER($parametro_busqueda) || '%'`;
    // Define el parámetro de búsqueda
    params.$parametro_busqueda = BUSQUEDA;
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  });
});

app.post("/presupuesto", (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};

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
     strftime('%d/%m/%Y', FechaOficio) AS FechaOficio,
     strftime('%d/%m/%Y', FechaRecepcion) AS FechaRecepcion,
     strftime('%d/%m/%Y', FechaElaboracion) AS FechaElaboracion,
     strftime('%d/%m/%Y', FechaVencimiento) AS FechaVencimiento,
     Monto,
     MontoAmpliacion,
     Comentarios,
     strftime('%d/%m/%Y', FechaTurno) AS FechaTurno,
     ObservacionesEstatus,
     strftime('%d/%m/%Y', FechaTurnada) AS FechaTurnada,
     strftime('%d/%m/%Y', FechaTerminada) AS FechaTerminada,
     Anio
     FROM presupuestos
   `;
  } else if (TIPO == 5 && BUSQUEDA !== "") {
    sql = `SELECT
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
      strftime('%d/%m/%Y', FechaOficio) AS FechaOficio,
      strftime('%d/%m/%Y', FechaRecepcion) AS FechaRecepcion,
      strftime('%d/%m/%Y', FechaElaboracion) AS FechaElaboracion,
      strftime('%d/%m/%Y', FechaVencimiento) AS FechaVencimiento,
      Monto,
      MontoAmpliacion,
      Comentarios,
      strftime('%d/%m/%Y', FechaTurno) AS FechaTurno,
      ObservacionesEstatus,
      strftime('%d/%m/%Y', FechaTurnada) AS FechaTurnada,
      strftime('%d/%m/%Y', FechaTerminada) AS FechaTerminada,
      Anio
  FROM
      presupuestos
  WHERE
      UPPER(CONCAT_WS('|', Folio, OficioRespuesta, OficioDependencia, Secretaria, Dependencia, TipoGasto, Estatus, Responsable, ClaveTipoSolicitud, TipoSolicitud, strftime('%d/%m/%Y', FechaOficio), strftime('%d/%m/%Y', FechaRecepcion), strftime('%d/%m/%Y', FechaElaboracion), strftime('%d/%m/%Y', FechaVencimiento), Monto, MontoAmpliacion, Comentarios, strftime('%d/%m/%Y', FechaTurno), ObservacionesEstatus, strftime('%d/%m/%Y', FechaTurnada), strftime('%d/%m/%Y', FechaTerminada), Anio)) LIKE UPPER('%' || $parametro_busqueda || '%');`;

    params.$parametro_busqueda = BUSQUEDA;
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  });
});

app.post("/transferencias", (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};

  if (TIPO == 4) {
    sql = `
     SELECT 
	          id,
	          Anio,
	          Folio,
	          Respuesta,
	          OficioDependencia,
	          Secretaria,
	          Dependencia,
	          TipoGasto,
	          Estatus,
	          Responsable,
	          TipoSolicitud,
	          FechaOficio,
	          FechaRecepcion,
	          FechaElaboracion,
	          FechaVencimiento,
	          Monto,
	          montoAmpliacion,
	          Comentarios,
	          FechaTurno,
	          ObservacionesEstatus,
	          AsignadoDependencia,
	          TramitadoDAMOP,
	          FechaCapturada,
	          ObservacionesCapturada,
	          FechaTurnada,
	          ObservacionesTurnada,
	          FechaStanBy,
	          ObservacionesStandBy,
	          FechaTerminada,
	          ObservacionesTerminada
      FROM transferencias
;
   `;
  } else if (TIPO == 5 && BUSQUEDA !== "") {
    sql = `
    
     
           SELECT 
                id,
                Anio,
                Folio,
                Respuesta,
                OficioDependencia,
                Secretaria,
                Dependencia,
                TipoGasto,
                Estatus,
                Responsable,
                TipoSolicitud,
                FechaOficio,
                FechaRecepcion,
                FechaElaboracion,
                FechaVencimiento,
                Monto,
                montoAmpliacion,
                Comentarios,
                FechaTurno,
                ObservacionesEstatus,
                AsignadoDependencia,
                TramitadoDAMOP,
                FechaCapturada,
                ObservacionesCapturada,
                FechaTurnada,
                ObservacionesTurnada,
                FechaStanBy,
                ObservacionesStandBy,
                FechaTerminada,
                ObservacionesTerminada
        FROM transferencias
        WHERE
        UPPER(CONCAT_WS('|', Folio, Respuesta, OficioDependencia, Secretaria, Dependencia, TipoGasto, Estatus, Responsable, TipoSolicitud, FechaOficio, FechaRecepcion, FechaElaboracion, FechaVencimiento, Monto, montoAmpliacion, Comentarios, FechaTurno, ObservacionesEstatus, FechaTurnada, FechaTerminada, Anio)) LIKE UPPER('%' || $parametro_busqueda || '%');

      `;

    params.$parametro_busqueda = BUSQUEDA;
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  });
});

app.post("/PPI", (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};
  if (TIPO == 4) {
    sql = `
     SELECT
     Id,
     Deleted,
     UltimaActualizacion,
     FechaCreacion,
     ModificadoPor,
     CreadoPor,
     Anio,
     Noficio,
     strftime('%d/%m/%Y', Fecha) AS Fecha,
     TipoOficio,
     Dependencia,
     Descripcion,
     Importe
     FROM ppi
   `;
  } else if (TIPO == 5 && BUSQUEDA !== "") {
    sql = `SELECT 
      Id,
      Deleted,
      UltimaActualizacion,
      FechaCreacion,
      ModificadoPor,
      CreadoPor,
      Anio,
      Noficio,
      strftime('%d/%m/%Y', Fecha) AS Fecha,
      TipoOficio,
      Dependencia,
      Descripcion,
      Importe
  FROM 
      ppi
  WHERE
      UPPER(Anio) LIKE UPPER('%' || $parametro_busqueda || '%')
      OR UPPER(Noficio) LIKE UPPER('%' || $parametro_busqueda || '%')
      OR UPPER(strftime('%d/%m/%Y', Fecha)) LIKE UPPER('%' || $parametro_busqueda || '%')
      OR UPPER(TipoOficio) LIKE UPPER('%' || $parametro_busqueda || '%')
      OR UPPER(Dependencia) LIKE UPPER('%' || $parametro_busqueda || '%')
      OR UPPER(Descripcion) LIKE UPPER('%' || $parametro_busqueda || '%')
      OR UPPER(Importe) LIKE UPPER('%' || $parametro_busqueda || '%');`;
    params.$parametro_busqueda = BUSQUEDA;
  }
  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  });
});

app.post("/MPD", (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};
  if (TIPO == 4) {
    sql = `
      SELECT * FROM manualoperacion
   `;
  } else if (TIPO == 5 && BUSQUEDA !== "") {
    sql = `
      SELECT * FROM manualoperacion
   `;
    params.$parametro_busqueda = BUSQUEDA;
  }
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  });
});

app.post("/PF", (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};

  if (TIPO == 4) {
    sql = `
      SELECT * FROM pf
   `;
  } else if (TIPO == 5 && BUSQUEDA !== "") {
    sql = `
      SELECT * FROM pf
   `;
    params.$parametro_busqueda = BUSQUEDA;
  }
  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  });
});

app.post("/gastocapital", (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};

  if (TIPO == 4) {
    sql = `
      SELECT * FROM polizas WHERE Texto LIKE '%GASTO CAPITAL%';
   `;
  } else if (TIPO == 5 && BUSQUEDA !== "") {
    sql = `
      SELECT * FROM pf
   `;
    params.$parametro_busqueda = BUSQUEDA;
  }
  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  });
});

app.post("/gastocorriente", (req, res) => {
  const { TIPO, BUSQUEDA } = req.body;
  let sql;
  let params = {};

  if (TIPO == 4) {
    sql = `
     SELECT * FROM polizas 
   `;
  } else if (TIPO == 5 && BUSQUEDA !== "") {
    sql = `
     SELECT * FROM polizas
   `;
    params.$parametro_busqueda = BUSQUEDA;
  }
  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  });
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
    console.log(filePath);
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

    const responseData = buildResponse(filesAndDirectories, true, 200, "Éxito");
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = buildResponse(null, false, 500, error.message);
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

    const responseData = buildResponse(
      { FILE: fileContent, TIPO: fileExtension },
      true,
      200,
      "Exito"
    );
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = buildResponse(null, false, 500, error.message);
    res.status(500).json(responseData);
  }
});

app.post("/inapGralAll", (req, res) => {
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
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  });
});

app.post("/inapGral01All", (req, res) => {
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
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  });
});

app.post("/onu", (req, res) => {
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
         UPPER(FechaConvenio) LIKE '%' || UPPER($parametro_busqueda) || '%'
         OR UPPER(NombreConvenio) LIKE '%' || UPPER($parametro_busqueda) || '%'
         OR UPPER(ObjetivoConvenio) LIKE '%' || UPPER($parametro_busqueda) || '%'
         OR UPPER(MontoConvenio) LIKE '%' || UPPER($parametro_busqueda) || '%'
       `;
    // Define el parámetro de búsqueda
    params.$parametro_busqueda = BUSQUEDA;
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: rows });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully", datos: [] });
    }
  });
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

    const responseData = buildResponse([], true, 200, "Exito");
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = buildResponse(null, false, 500, error.message);
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

    const responseData = buildResponse([], true, 200, "Exito");
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = buildResponse(null, false, 500, error.message);
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

    console.log("RUTA de rutaCARPETA");
    console.log(rutaCARPETA);
    await createFolderIfNotExists(rutaCARPETA);

    await fs2.writeFile(rutaArchivo, contenido);
    const responseData = buildResponse([], true, 200, "Exito");
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = buildResponse(null, false, 500, error.message);
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

    const responseData = buildResponse(
      { FILE: fileContent, TIPO: ".pdf" },
      true,
      200,
      "Exito"
    );
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = buildResponse(null, false, 500, error.message);
    res.status(500).json(responseData);
  }
});

app.listen(port, () => {
  console.log(`Servidor Iniciado http:localhost:${port}`);
});
