const db = require("../../config/db.js");

module.exports={

    verify:(req,res)=>{
          return res.status(200).send({
         message: "Servicios Activos"
          });
    }
    
}