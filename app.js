const gltfIE = require('gltf-import-export');
const fs = require('fs');
const path = require('path');

const carsFolder = './cars/';
const exportsFolder = './exports/';

// Check if cars folder exist, and create if if not.
if (!fs.existsSync(carsFolder)){
  fs.mkdirSync(carsFolder);
  console.log('Cars folder created. Put your .gltf in it.')
}

// Creates Exports folders
if (!fs.existsSync(exportsFolder)){
  fs.mkdirSync(exportsFolder);
}

// Creates Exports folders
if (!fs.existsSync(exportsFolder)){
  fs.mkdirSync(exportsFolder);
}

// Empty export directory
fs.readdir(exportsFolder, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(exportsFolder, file), err => {
      if (err) throw err;
    });
  }
});

// Create glb file for each glt
let cars = [];

fs.readdir(carsFolder, (err, files) => {
  files.forEach(file => {
    if(file != '.DS_Store')  {
      gltfIE.ConvertGltfToGLB(carsFolder + file + '/' + file + '.gltf', exportsFolder + file + '.glb');
      cars.push({
        name: createName(file),
        model: file + '.glb',
        evo: parseInt(file.split('_')[1].replace('evo', '')),
        colors: file.split('_').slice(2)
      })
    }
  });

  // Create JSON list
  console.log(cars);
  let data = JSON.stringify(cars, null, 2);
  fs.writeFileSync('cars.json', data);

});


function createName(file){
  let name = file
  let t = 0;
  name = name.replace(/_/g, match => ++t === 2 ? ' - ' : match)
  name = name.replaceAll('_', ' ');
  name = name.charAt(0).toUpperCase() + name.replaceAll('_', ' ').slice(1);
  name = name.replace('evo', 'evo '.toUpperCase());
  return name
}
