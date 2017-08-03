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
 * @module raw
 * @param {Object} raw
 * 
 * Converts raw simulation experiment into a JSON and store it in the ./logs directory. 
 */
const raw = (raw) => {
    let rawJSON = JSON.stringify(raw, null, 2);
    fs.writeFile('logs/raw_simulation.json', rawJSON, err => {
        if (err) throw err;
        console.log('Logged raw simulation');
    });
};

/**
 * @module parsed
 * @param {Object} parse 
 * 
 * Converts parsed simulation experiment into a JSON and store it in the ./logs directory.
 */
const parsed = (parse) => {
    let parseJSON = JSON.stringify(parse, null, 2);
    fs.writeFile('logs/parsed_simulation.json', parseJSON, err => {
        if (err) throw err;
        console.log('Logged parsed simulation');
    });
};


module.exports = {
    raw,
    parsed
};