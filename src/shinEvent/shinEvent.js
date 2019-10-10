class ShinEvent{
    /**
     *Creates an instance of ShinEvent.
     * @memberof ShinEvent
     */
    constructor(eventtype,bubblingType){
        this.currentTarget=null;
        this.data=this.content=null;
        this.eventType=eventtype || "shinevent"+Date.now();
        this.bubblingType=bubblingType=1;
    }

}
export default ShinEvent;
//module.exports=ShinEvent;