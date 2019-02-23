class ShinEventDispatcher{
    constructor(){
        //store struct{ eventType:functionProxy}
        this.funPool=new Map();
    }
    
    /**
     *
     *
     * @param {ShinEvent} event
     * @memberof ShinEventDispatcher
     */
    dispatchEvent(event){
        
        
        let eventType=event.eventType;
        let functions=this.funPool.get(eventType);
        //evert proxy execute its function
        if(!functions) return;
        functions.forEach(proxy => {
            proxy.execute(event);
        });

    }
    /**
     *
     *
     * @param {string} eventType
     * @param {Function} fun
     * @param {any} target
     * @memberof ShinEventDispatcher
     */
    addEventListener(eventType, fun, target,bulling=false) {
        //if i this eventType's function which belogns to target has alrealy listened
        //then stop listening ;
        if(this.hasListened(eventType,fun,target)){
            return;
        } 
        let functions = this.funPool.get(eventType);
        if (!functions) {
            functions = [];
            this.funPool.set(eventType,functions);
            //create a proxy to manage target and its function;
        }
        let fp = new functionProxy(eventType, fun, target);
        functions.push(fp);
        //console.log(this.funPool.get(eventType));
    }
    /**
     *
     *
     * @param {string} eventType
     * @param {Function} fun
     * @param {any} target
     * @returns functionProxy
     * @memberof ShinEventDispatcher
     */
    hasListened(eventType, fun, target){
        let functions = this.funPool.get(eventType);
        if(!functions) return null;
        let gettarget=null;
        functions.forEach(proxy=>{
            //console.log(proxy.checkHas(fun,target))
            if(proxy.checkHas(fun,target))
            {
                gettarget= proxy;
                return;
            }
        })
        return gettarget;
    }

    /**
     *
     *
     * @param {string} eventType
     * @param {Function} fun
     * @param {any} target
     * @returns
     * @memberof ShinEventDispatcher
     */
    removeEventListener(eventType, fun, target){
        let functions = this.funPool.get(eventType);
        let proxy=this.hasListened(eventType,fun,target);
        if(proxy)
        {
            let index=functions.findIndex((value,index,arr)=>{
                return value=proxy;
            });
            if(index===-1) return; 
            functions.splice(index,1);
        }
    }
}
/**
 *
 *
 * @class functionProxy
 */
class functionProxy{
    /**
    *Creates an instance of functionProxy.
    * @param {*} eventType
    * @param {*} fun
    * @param {*} target
    * @memberof functionProxy
    */

    constructor(eventType,fun,target){
        this.eventType=eventType;
        this.fun=fun;
        this.target=target;
       //store struct { [Function]:[Object] }
        this.checkMap=new Map();
        this.checkMap.set(fun,target);
    }
    /**
     *
     *
     * @param {*} event
     */
    execute(event){
        this.fun.apply(this.target,[event])
    }
    /**
     *
     *
     * @param {*} fun
     * @param {*} target
     * @returns
     * @memberof functionProxy
     */
    checkHas(fun,target)
    {
       
        if(fun===this.fun && target===this.target) return true;
        return false;
        
    }

}
module.exports=ShinEventDispatcher;