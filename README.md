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


```javascript
// errors.js
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
// index.js
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
// index.js
const defError = require('def-error');

Promise.reject(new (defError('CustomError'))())
.catch(defError('CustomError'), error => {
    // catching my custom error
})
```
*Done.*

Moreover the error created here with defError will be available in another module using the defError package.

## API

#### Define an error
```javascript
const defError = require('def-error');

const MyCustomError = defError('MyCustomError');

throw new MyCustomError();
```

##### Adding custom message
```javascript
throw new MyCustomError('My custom message');
```

#### Adding custom properties to error
You can add custom properties to the Error object by two ways.

**Adding properties when defining**
```javascript
const MyCustomError = defError('MyCustomError', {
    foo: 'bar'
});
```

When you add properties when defining, the properties will be in every instance of the Error created.
```javascript
let err = new MyCustomError();
console.log(err.foo) // bar
```

it will be overwritten if you do it again in the second way, which is when calling the constructor :

**Adding properting when calling constructor**
```javascript
let err = new MyCustomError({
    foo: 'bar2'
});
console.log(err.foo) // bar2
```
Or if you want to define a message followed by props
```javascript
let err = new MyCustomError('my custom error message', {
    foo: 'bar2'
});
console.log(err.foo) // bar2
```

#### Retrieve an error
Retrieving an error is pretty easy, it's the same way as defining an error. If the Error already exist - indexed by name - it will be returned, else it will be created.

```javascript
const defError = require('def-error');

const MyCustomError = defError('MyCustomError');
```

#### Error store
All errors are stored in an Object, if you call defError() it will create the Error in the store if the error does not exist, otherwise it will return a the Error class created.
Sometimes you might want to create an Error with the same name, but with a different signature. In that case, you can create your Error in a new store.
You can do this by two means :
```javascript

```


## Use case
