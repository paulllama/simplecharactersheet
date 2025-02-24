import fs from 'fs'
import * as sass from 'sass'

const STYLES_SOURCE_PATH = './src/styles/index.scss'
const STYLES_BUILD_PATH = './src/styles.css'

const compileSass = (processName) => {
    const logPrefix = processName ? `[${processName}]\t` : ''
    const { css } = sass.compile(STYLES_SOURCE_PATH)
    fs.writeFileSync(STYLES_BUILD_PATH, css)
    
    console.log(`${logPrefix}Styles compiled to ${STYLES_BUILD_PATH}`)
}

export default compileSass