/**
 * Stores both raw and parsed simulations in a ./logs directory.
 */
const fs = require('fs');

// Check if the logs directory exists.
if (!fs.existsSync('./logs')) {
    fs.mkdir('./logs', err => {
        if (err) throw err;
        console.log('Created ./logs directory');
    });
}

/**
 * @module writeRaw
 * @param {Object} raw
 * 
 * Converts raw simulation experiment into a JSON and store it in the ./logs directory. 
 */
const writeRaw = (raw) => {
    let rawJSON = JSON.stringify(raw, null, 2);
    fs.writeFile('logs/raw_simulation.json', rawJSON, err => {
        if (err) throw err;
        console.log('Logged raw simulation');
    });
};

/**
 * @module writeParsed
 * @param {Object} parse 
 * 
 * Converts parsed simulation experiment into a JSON and store it in the ./logs directory.
 */
const writeParsed = (parse) => {
    let parseJSON = JSON.stringify(parse, null, 2);
    fs.writeFile('logs/parsed_simulation.json', parseJSON, err => {
        if (err) throw err;
        console.log('Logged parsed simulation');
    });
};

/**
 * @module readRaw
 * 
 * Reads the raw_simulation.json and converts into a JavaScript Object
 */
const readRaw = () => {
    let rawJSON = fs.readFileSync('logs/raw_simulation.json');
    return JSON.parse(rawJSON);
};

/**
 * @module readParsed
 * 
 * Reads the parsed_simulation.json and converts into a JavaScript Object
 */
const readParsed = () => {
    let parsedJSON = fs.readFileSync('logs/parsed_simulation.json');
    return JSON.parse(parsedJSON);
};


module.exports = {
    writeRaw,
    writeParsed,
    readRaw,
    readParsed
};