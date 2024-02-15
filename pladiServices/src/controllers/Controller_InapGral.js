const utils = require("../utils/responseBuilder.js");
const path = require("path");
const ruta = process.env.APP_ROUTE_FILE;
const fs = require("fs").promises;
module.exports = {
  inapGralAll: async (req, res) => {
    try {
      const result = await utils.executeQuery(
        "CALL sp_inapgral_CRUD(?,?,?,?,?,?)",
        [
          req.body.TIPO,
          req.body.P_Id || null,
          req.body.P_CreadoPor || null,
          req.body.P_FechaConveniogrlinicio || null,
          req.body.P_FechaConveniogrlfin || null,
          req.body.P_NombreConvenio || null,
        ]
      );

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
  },
  inapGral01All: async (req, res) => {
    try {
      const result = await utils.executeQuery(
        "CALL sp_inapgral_01_CRUD(?,?,?,?,?,?,?,?,?,?)",
        [
          req.body.TIPO,
          req.body.P_Id,
          req.body.P_IdGral,
          req.body.P_CreadoPor,
          req.body.P_FechaConvenioinicio,
          req.body.P_FechaConveniofin,
          req.body.P_NombreConvenio,
          req.body.P_Objetivo,
          req.body.P_Monto,
          req.body.P_FechaFiniquito,
        ]
      );

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
  },
  inapGral0101All: async (req, res) => {
    try {
      const result = await utils.executeQuery(
        "CALL sp_inapgral_01_01_CRUD(?,?,?,?,?,?)",
        [
          req.body.TIPO,
          req.body.P_Id,
          req.body.P_IdGral01,
          req.body.P_CreadoPor,
          req.body.P_FechaEntregable,
          req.body.P_Nombre,
        ]
      );

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
  },
  inapGral0102All: async (req, res) => {
    try {
      const result = await utils.executeQuery(
        "CALL sp_inapgral_01_02_CRUD(?,?,?,?,?,?)",
        [
          req.body.TIPO,
          req.body.P_Id,
          req.body.P_IdGral01,
          req.body.P_CreadoPor,
          req.body.P_FechaActa,
          req.body.P_NombreActa,
        ]
      );

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
  },
  inapGral0103All: async (req, res) => {
    try {
      const result = await utils.executeQuery(
        "CALL sp_inapgral_01_03_CRUD(?,?,?,?,?,?,?)",
        [
          req.body.TIPO,
          req.body.P_Id,
          req.body.P_IdGral01,
          req.body.P_CreadoPor,
          req.body.P_FechaFactura,
          req.body.P_Factura,
          req.body.P_Monto,
        ]
      );

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
  },

  inapGral010301All: async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("No se proporcionó ningún archivo en la solicitud.");
      }

      const contenido = req.file.buffer;
      const nombreArchivo = req.body.nombreArchivo;

      const rutaArchivo = path.join(ruta, nombreArchivo);
      await fs.writeFile(rutaArchivo, contenido);

      const result = await utils.executeQuery(
        "CALL sp_inapgral_01_03_01_CRUD(?,?,?,?,?,?,?,?)",
        [
          req.body.TIPO,
          req.body.P_Id,
          req.body.P_IdGral0103 || null,
          req.body.P_CreadoPor || null,
          req.body.P_FechaPresupuesto,
          req.body.P_FechaPAgo,
          rutaArchivo,
          nombreArchivo,
        ]
      );
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
  },

  adminfiles: async (req, res) => {
    try {
      const result = await utils.executeQuery("CALL sp_files(?,?,?,?,?,?)", [
        req.body.TIPO,
        req.body.P_IDOWNER || null,
        req.body.P_CreadoPor || null,
        req.body.P_Nombre || null,
        req.body.P_Ruta || null,
        req.body.P_ID || null,
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
  },
};
