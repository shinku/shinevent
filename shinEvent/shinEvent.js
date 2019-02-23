class ShinEvent{
    /**
     *Creates an instance of ShinEvent.
     * @memberof ShinEvent
     */
    constructor(eventtype,bubblingType){
        this.content=null;
        this.eventType=eventtype || "shinevent"+Date.now();
        this.bubblingType=bubblingType=1;
    }

}
module.exports=ShinEvent;