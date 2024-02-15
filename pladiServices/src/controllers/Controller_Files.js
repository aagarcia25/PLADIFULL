const utils = require("../utils/responseBuilder.js");
const fs = require("fs").promises;
const path = require("path");
const dayjs = require("dayjs");

const ruta = process.env.APP_ROUTE_FILE;
const xlsx = require("xlsx");
const createFolderIfNotExists = async (folderPath) => {
  try {
    await fs.access(folderPath);
  } catch (error) {
    await fs.mkdir(folderPath, { recursive: true });
  }
};

const saveFile = async (req, res) => {
  try {
    await createFolderIfNotExists(ruta);

    if (!req.file) {
      throw new Error("No se proporcionó ningún archivo en la solicitud.");
    }

    const contenido = req.file.buffer;
    const nombreArchivo = req.body.nombreArchivo;

    if (!nombreArchivo) {
      throw new Error(
        "El nombre del archivo no está especificado en la solicitud."
      );
    }

    const rutaArchivo = path.join(rutaCarpeta, nombreArchivo);
    await fs.writeFile(rutaArchivo, contenido);

    const result = await utils.executeQuery("CALL sp_files(?,?,?,?,?,?)", [
      1,
      req.body.P_IDOWNER || null,
      req.body.P_CreadoPor || null,
      nombreArchivo || null,
      rutaArchivo || null,
      null,
    ]);

    if (result.length > 2) {
      const responseData = utils.buildResponse(
        result[0],
        true,
        result[1][0].Respuesta,
        result[1][0].Mensaje
      );

      res.status(200).json(responseData);
    } else {
      const responseData = utils.buildResponse(
        [],
        true,
        result[0][0].Respuesta,
        result[0][0].Mensaje
      );
      res.status(200).json(responseData);
    }
  } catch (error) {
    const responseData = utils.buildResponse(null, false, 500, error.message);
    res.status(500).json(responseData);
  }
};

const getFile = async (req, res) => {
  try {
    if (!req.body.P_ROUTE) {
      throw new Error("No se proporcionó la ruta del archivo");
    }

    if (!req.body.P_NOMBRE) {
      throw new Error("No se proporcionó el nombre del archivo");
    }

    const filePath = path.join(req.body.P_ROUTE);

    const fileContent = await fs.readFile(filePath, { encoding: "base64" });

    const responseData = utils.buildResponse(
      { FILE: fileContent, TIPO: ".pdf" },
      true,
      200,
      "Exito"
    );
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = utils.buildResponse(null, false, 500, error.message);
    res.status(500).json(responseData);
  }
};

const migrafile = async (req, res) => {
  try {
    if (!req.body.P_TIPO) {
      throw new Error("No se proporcionó el Tipo");
    }

    if (!req.file) {
      throw new Error("No se proporcionó ningún archivo en la solicitud.");
    }
    const codigo = req.body.P_TIPO;
    const contenido = req.file.buffer;
    const workbook = xlsx.read(contenido, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    // Convertir el contenido de la hoja de cálculo a un objeto JavaScript

    const jsonData = xlsx.utils.sheet_to_json(sheet, {
      dateNF: "YYYY-MM-DD", // Formato de fecha (puedes ajustar según el formato de tu archivo)
      raw: false, // Establecer en true si quieres que las fechas se mantengan como números
      cellDates: true, // Habilitar para convertir automáticamente las fechas en objetos Date
    });

    jsonData.forEach(async (row, index) => {
      console.log(`Fila ${index + 1}:`, row);
      // Aquí puedes realizar acciones con cada fila del archivo Excel
      if (codigo == 0) {
        const result = await utils.executeQuery(
          "CALL sp_inapgral_CRUD(?,?,?,?,?,?)",
          [
            1,
            null,
            req.body.P_CreadoPor || null,
            row.FECHA_INICIO || null,
            row.FECHA_INICIO || null,
            row.CONVENIO || null,
          ]
        );
      } else if (codigo == 1) {
        try {
          const result = await utils.executeQuery(
            "CALL sp_inapgral_01_CRUD(?,?,?,?,?,?,?,?,?,?)",
            [
              1,
              null,
              req.body.P_ID,
              req.body.P_CreadoPor,
              dayjs(row.FECHA_INICIAL, "MM/DD/YY").format("YYYY-MM-DD"),
              dayjs(row.FECHA_FIN, "MM/DD/YY").format("YYYY-MM-DD"),
              row.NOMBRE,
              row.OBJETIVO,
              row.MONTO,
              dayjs(row.FECHA_FINIQUITO, "MM/DD/YY").format("YYYY-MM-DD"),
            ]
          );
          console.log(result);
        } catch (error) {
          console.log(error.message);
        }
      }
    });

    const responseData = utils.buildResponse(
      "Migracion Completa",
      true,
      200,
      "Exito"
    );
    res.status(200).json(responseData);
  } catch (error) {
    const responseData = utils.buildResponse(null, false, 500, error.message);
    res.status(500).json(responseData);
  }
};

module.exports = { saveFile, getFile, migrafile };
