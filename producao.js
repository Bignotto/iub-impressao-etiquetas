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

const OP = process.argv[2]; //"241953""241954""241955""241956""241957""241958""241959""241960""241961""241962""241963""241964""241965""241966""241967""241968""241969""241970""241971""241972""241973""241974""241975""241976""241977""241978""241979""241980""241981""241982""241983"

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
    for (i = 0; i < element.Quantidade; i++) {
      dataToWrite = templateFile
        .replace(/Data1/g, element.Data1)
        .replace(
          /NumSerie/g,
          `${element.NumSerie}${String(i + 1).padStart(4, "0")}`
        )
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
      // console.log(`${element.NumSerie}${String(i + 1).padStart(4, "0")}`);
    }
  });
  fs.writeFileSync(`${OP}.txt`, finalData, {
    encoding: "utf8",
  });
  console.log(`${OP}.txt`);
}

async function etiqueta() {
  const templateFile = getTemplateFile();
  const dataOp = await getDataFromDatabase();
  replaceDataOnTemplate(templateFile, dataOp);
}

etiqueta();
