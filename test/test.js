'use strict';
global.Promise = require('bluebird');
const assert = require('assert');

const testShared = require('./test-shared.js');

let defError = require('../');

new Promise((resolve, reject) => {
    reject(new (defError('TestError2', { extend: class T extends Error { constructor(){ super(); this.t = 't' }} }))('Oh my printer is on fire !') );
})
.catch(error => {
    console.error(error, error.name);
    assert(error.name === 'TestError2');
    throw error;
})
.catch(defError('TestError'), error => {
    // should not be called
    console.error('Test failed :(', error);
    process.exit(1);
})
.catch(defError('TestError2'), error => {
    console.log('First test successful  \\0/!');
    console.log('Moving to test 2...');
    return testShared(error);
})
.catch(error => {
    console.error('Test failed :(', error);
    process.exit(1);
});
