# def-error
Define errors classes accessible across node processes, on the fly. Catchable with bluebird.

## Why ?
Creating a custom in Javascript is a bit of an hassle even though throwing custom prototypes errors is really useful specially with Promises (even more with bluebird Promises).
This package allows to create Errors on the fly and intercepting them easily throughout a node process.

#### Defining and intercepting errors the classic ES2015 way
**defining**

```Javascript
class CustomError extends Error {
    constructor(){
        super();
    }
}
```

Then if you want to use the same error you need to export it and import it.
So you will ceate a file let say errors.js and export all your errors this way :

*errors.js :*
```javascript
class CustomError extends Error {
    constructor(){
        super();
    }
}

exports.CustomError = CustomError;
```

If you wanted to add more properties to your error, it would be even more of an hassle.

**intercepting (with bluebird Promise)**
```javascript
const CustomError = require('./errors').CustomError;
global.Promise = require('bluebird');

Promise.reject(new CustomError())
.catch(CustomError, error => {
    // catching my custom error
})
```

And then, you want to define a new error which can be use anywhere, well, you will have to go back in your errors file and define your error etc.

#### Defining and intercepting errors with def-error package

*Your main script :*
```javascript
const defError = require('def-error');

Promise.reject(new (defError('CustomError')))
.catch(defError('CustomError'), error => {
    // catching my custom error
})
```
*Done.*

Moreover the error created here with defError will be available in another module using the defError package.
