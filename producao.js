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

const OP = "241390";

async function getDataFromDatabase() {
  try {
    const db = await database.getConnection();
    const sqlFile = fs.readFileSync(
      path.join(__dirname, "queries", "op.sql"),
      "utf8"
    );

    let result = await db
      .request()
      .input("input_parameter", sql.VarChar, OP)
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
    path.join(__dirname, "template_producao.prn"),
    "utf8"
  );
  return template;
}

function replaceDataOnTemplate(templateFile, dataOp) {
  let dataToWrite = "";
  let finalData = "";

  dataOp.forEach((element) => {
    dataToWrite = templateFile
      .replace(/Data1/g, element.Data1)
      .replace(/NumSerie/g, element.NumSerie)
      .replace(/LM/g, element.LM)
      .replace(/Ref/g, element.Ref)
      .replace(/Tam/g, element.Tam)
      .replace(/Cor/g, element.Cor)
      .replace(/Forro/g, element.Forro)
      .replace(/Adn/g, element.Adn)
      .replace(/Alc/g, element.Alc)
      .replace(/Telefone/g, element.Telefone)
      .replace(/Cidade/g, element.Cidade)
      .replace(/CodBig/g, element.CodBig)
      .replace(/Descricao/g, element.Descricao)
      .replace(/OP/g, element.OP);
    // .replace(/PQ1/g, `PQ${element.Quantidade * 2}`);

    finalData = finalData + dataToWrite;
  });
  fs.writeFileSync(`${OP}.txt`, finalData, {
    encoding: "utf8",
  });
}

async function etiqueta() {
  const templateFile = getTemplateFile();
  const dataOp = await getDataFromDatabase();
  replaceDataOnTemplate(templateFile, dataOp);
}

etiqueta();
