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
  let count = 0;
  files.forEach(file => {
    if(file != '.DS_Store')  {
      count++;
      gltfIE.ConvertGltfToGLB(carsFolder + file + '/' + file + '.gltf', exportsFolder + file + '.glb');
      cars.push({
        model: createModel(file),
        evo: parseInt(file.split('_')[1].replace('evo', '')),
        name: createName(file),
        fullName: createFullName(file),
        colors: file.split('_').slice(2),
        file: file + '.glb'
      })
    }
  });

  console.log(count + ' cars converted and exported in the exports folder');

  // Create JSON list
  let data = JSON.stringify(cars, null, 2);
  fs.writeFileSync('cars.json', data);

  console.log('cars.json created');

});

function createModel(file){
  let chunks = file.split('_').slice(0, 1);
  let name = chunks.join(' ');
  let t = 0;

  name = name.replace(/_/g, match => ++t === 2 ? ' - ' : match)
  name = name.charAt(0).toUpperCase() + name.replace(/_/g, ' ').slice(1);

  return name
}

function createName(file){
  let chunks = file.split('_').slice(0, 2);
  let name = chunks.join(' ');
  let t = 0;

  name = name.replace(/_/g, match => ++t === 2 ? ' - ' : match)
  name = name.replace(/_/g, ' ');
  name = name.charAt(0).toUpperCase() + name.replace(/_/g, ' ').slice(1);
  name = name.replace('evo', 'evo '.toUpperCase());

  return name
}

function createFullName(file){
  let name = file
  let t = 0;

  name = name.replace(/_/g, match => ++t === 2 ? ' - ' : match)
  name = name.replace(/_/g, ' ');
  name = name.charAt(0).toUpperCase() + name.replace(/_/g, ' ').slice(1);
  name = name.replace('evo', 'evo '.toUpperCase());

  return name
}
