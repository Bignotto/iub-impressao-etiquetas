const fs = require("fs");
const path = require("path");
const database = require("./database/database");
const sql = require("mssql");

/*
 * Template zebra ✓
 * Dados da rota ✓
 * Substituir info no template ✓
 * Gravar arquivo ✓
 */

async function getDataFromDatabase() {
  try {
    const db = await database.getConnection();
    const sqlFile = fs.readFileSync(
      path.join(__dirname, "queries", "rota.sql"),
      "utf8"
    );

    let result = await db
      .request()
      .input("input_parameter", sql.VarChar, "4890")
      .query(sqlFile);

    await database.closeConnection();
    console.log(`${result.recordset.length} registros`);
    return result.recordset;
  } catch (error) {
    console.log(
      "DEU ERRO ------------------------------------------------------"
    );
    console.log(error);
    await database.closeConnection();
  }
}

function getTemplateFile() {
  const template = fs.readFileSync(
    path.join(__dirname, "template.zpl"),
    "utf8"
  );
  return template;
}

function replaceDataOnTemplate(templateFile, dataRota) {
  let dataToWrite = "";
  let finalData = "";

  dataRota.forEach((element) => {
    dataToWrite = templateFile
      .replace(/COD_ITEM/g, element.COD_ITEM)
      .replace(/Estado/g, element.Estado)
      .replace(/Cidade/g, element.Cidade)
      .replace(/OrdCar/g, element.OrdCar)
      .replace(/CodBig/g, element.CodBig)
      .replace(/NumRota/g, element.NumRota)
      .replace(/NUM_PED/g, element.NUM_PED)
      .replace(/Code_PN/g, element.Code_PN)
      .replace(/Nome_PN/g, element.Nome_PN)
      .replace(/Catalogo/g, element.Catalogo)
      .replace(/Desc_Item/g, element.Desc_Item)
      .replace(/NUMPKL/g, element.NUMPKL)
      .replace(/PQ1/g, `PQ${element.Quantidade * 2}`);

    finalData = finalData + dataToWrite;
  });
  fs.writeFileSync("Output.txt", finalData);
}

async function etiqueta() {
  const templateFile = getTemplateFile();
  const dataRota = await getDataFromDatabase();
  replaceDataOnTemplate(templateFile, dataRota);
}

etiqueta();
