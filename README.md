# shinevent

custom event class

you can use it by installing with command
```
npm install --save shinevent
```
##Sample

```
const {ShinEvent,ShinEventDispatcher} = require('../shinEvent')
//define a new class which extends from ShinEventDispatcher
class testTarget extends ShinEventDispatcher{
    constructor(){
        super();
    }
    init (){
        this.dispatchEvent(new ShinEvent('init'));
    }
}
//create a new testTarget as target
let target=new testTarget();
//define call back function at object 'this'
this.handleInit=function(e){
    console.log('i am shinevent');
}
//add listener  and set the special function
//if you duplicate whe same code , only one function could be executed 
//such as if you coded  like that words as below
//  target.addEventListener('init',this.handleInit,this)
//  target.addEventListener('init',this.handleInit,this)
//  this.handleInit will execute only one time
target.addEventListener('init',this.handleInit,this)
target.init();
//you will get print of "i am shinevent"
//remove listener
target.removeEventListener('init',this.handleInit,this);

target.init();
//you will get nothing
```

ShinEventDispatcher has three functions

1:dispatchEvent
```
@param {ShinEvent} event
```

2:addEventListener
```
 * @param {string} eventType
 * @param {Function} fun
 * @param {any} target
```

3:removeEventListener
```
 * @param {string} eventType
 * @param {Function} fun
 * @param {any} target
```
