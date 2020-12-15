const excelToJson = require('convert-excel-to-json');
const fs = require('fs')

async function handleFile(file) {
  try {
    const result = await excelToJson({
      source: fs.readFileSync(`${file.path}`), // fs.readFileSync return a Buffer
      header:{
        rows: 1
      },
      columnToKey: {
        A: '{{A1}}',
        B: '{{B1}}',
        C: '{{C1}}',
        D: '{{D1}}',
      }
    });

    await fs.unlinkSync(file.path);

    return fs.writeFileSync('file.json', JSON.stringify(result))
  } catch (error) {
    return error
  }
}

module.exports = handleFile
