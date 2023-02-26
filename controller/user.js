const userModel = require('../model/userModel')
const xlsx = require('xlsx')
const fs = require('fs');
function checkField(value, column) {
  if (column === 'age') {
    if (typeof value == 'number') {
      return value
    }

  } else if (column === 'date_of_birth') {
    if (!isNaN(Date.parse(value))) {
      return value
    }
  }
  else if (column === 'address') {
    if (value.toString().length >= 25) {
      return value
    }

  }
  else if (column === 'name') {
    return value

  } else {

    return value;
  }

}
const addUser1 = async (req, reply) => {
  try {
    let filePath = req.file.path
    const data = xlsx.readFile(filePath);
    const sheets = data.SheetNames
    const details = data.Sheets[sheets];

    const columns = [];
    for (let key in details) {
      columns.push(details[key].v);
    }
    const rows = [];
    for (let i = 2; i <= details['!ref'].split(':')[1].replace(/\D/g, ''); i++) {
      const row = {}
      for (let j = 0; j < columns.length; j++) {
        const key = columns[j + 1];
        const cell = details[String.fromCharCode(65 + j) + i];
        if (cell && cell.v) {
          row[key] = checkField(cell.v, key);
          if (row[key] == undefined) {
            return reply.status(406).send({ status: false, message: `There is an issue with  ${key} is ${cell.v} in the ${i}the row and ${j}the column` })
          }
        }

      }
      if (row.name && row.address && row.age && row.date_of_birth) {
        const createUser = await userModel.create(row)
      }
    }
    fs.unlink(filePath, function (err) {
      if (err) return console.log(err);
      console.log('file deleted successfully');
    });
    reply.status(200).send({
      status: true,
      message: "ok",
    })
  }
  catch (error) {
    reply.status(500).send({
      status: false,
      message: "Failed",
      error: error.message
    })
  }
}

module.exports = {
  addUser1
}