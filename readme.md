Batch transform GLTF in GTB Using node.js
Used for the project Alpha League Racing : https://alphaleague.racing

# About
- Browse all .gltf in the cars folder and covert them in a .glb in a exports folder.
- Generates a JSON file describing the cars (cars.json)

# Setup
## Install node.js
[node.js](https://nodejs.org/)

## Install node & download deps
`npm i`

## Run script
`node app.js`

# Naming the files
- Each gltf file should be placed in a folder of the same name
- _ should be used to split words
- should exactly match the patern 'carname_evo1_color1_color2'
- lowercase only
- colors should be written in english
- if a color is using 2 letters, use '-' instead of _ to split them. ex : 'light-green_dark-red'
