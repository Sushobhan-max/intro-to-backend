const express = require('express')
const app = express()
const port = 3000
const fs = require('node:fs');
const path = require('path');




fs.readdir("./files", (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('====================================');
  console.log(files); //logs an array of filenames
  console.log('====================================');
  files.forEach((file) => {
    const oldPath = path.join("./files", file);
    const newPath = path.join("./organized/jpg", file);
    const newPathpsd = path.join("./organized/psd", file);

    console.log('====================================');
    console.log('oldpath', oldPath);
    console.log('====================================');

    console.log(path.extname(file));

    if (path.extname(file) === '.jpg') {
      fs.mkdirSync('./organized/jpg', { recursive: true });
      fs.renameSync(oldPath, newPath);
    }
    else if (path.extname(file) === '.psd') {
      fs.mkdirSync('./organized/psd', { recursive: true });
      fs.renameSync(oldPath, newPathpsd);
    }
  });

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
