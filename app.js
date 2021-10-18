const gltfIE = require("gltf-import-export");
const fs = require("fs");
const path = require("path");

const carsFolder = "./cars/";
const exportsFolder = "./exports/";

const glbsDirectory = exportsFolder + "glbs/";
const pngsDirectory = exportsFolder + "pngs/";

// Check if cars folder exist, and create if if not.
if (!fs.existsSync(carsFolder)) {
  fs.mkdirSync(carsFolder);
  console.log("Cars folder created. Put your .gltf in it.");
}

fs.rmdirSync(exportsFolder, { recursive: true });

// Creates Exports folders
if (!fs.existsSync(exportsFolder)) {
  fs.mkdirSync(exportsFolder);
}

// Creates Exports folders
if (!fs.existsSync(exportsFolder)) {
  fs.mkdirSync(exportsFolder);
}

// Create glb and png directory
fs.mkdirSync(glbsDirectory);
fs.mkdirSync(pngsDirectory);

let cars = [];

fs.readdir(carsFolder, (err, files) => {
  let count = 0;

  files.forEach((file) => {
    if (file != ".DS_Store") {
      // if(count >= 10) return;
      count++;

      //Create folder

      const random = Math.random() * 100;
      letRandomHorn = 1;

      if (random > 5) letRandomHorn = 2;
      if (random > 10) letRandomHorn = 3;
      if (random > 15) letRandomHorn = 4;
      if (random > 40) letRandomHorn = 5;

      const newFile = file + " Horn" + letRandomHorn;

      // Copy file
      gltfIE.ConvertGltfToGLB(
        carsFolder + file + "/" + file + ".gltf",
        glbsDirectory + newFile + ".glb"
      );

      // Copy Png
      fs.copyFile(
        carsFolder + file + "/" + file + ".png",
        pngsDirectory + newFile + ".png",
        (err) => {
          if (err) throw err;
        }
      );

      // Create Json
      cars.push({
        name: file,
        file: "/exports/glbs/" + file + ".glb",
        preview: "/exports/pngs/" + file + ".png",
      });
    }
  });

  console.log(count + " cars converted and exported in the exports folder");

  // Create JSON list
  let data = JSON.stringify(cars, null, 2);
  fs.writeFileSync("cars.json", data);
});
