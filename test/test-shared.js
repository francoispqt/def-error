'use strict';

let defError = require('../');

module.exports = (error) => new Promise((resolve, reject) => {
    reject(error);
})
.catch(defError('TestError'), error => {
    // should not be caught
    console.error('Test 2 failed !');
    process.exit(1);
})
.catch(defError('TestError2'), error => {
    console.log(error);
    console.log('Test 2 successful.');
    console.log('All tests successful.');
    process.exit(0);
});
