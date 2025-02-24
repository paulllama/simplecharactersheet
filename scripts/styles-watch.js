import fs from 'fs'
import compileSass from "./compile-sass.js"

fs.watch('./src/styles/', { recursive: true }, (eventName, fileName) => {
    compileSass('watch styles')
})