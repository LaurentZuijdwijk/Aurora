/**
 * Actorpool is mainly a work in progress. This will have multiple options like 
 * fork/join etc.
 *
 */
var ActorPool = {
	i : 0,
	getId : function(){
		ActorPool.i++;
		return ActorPool.i;
	}
	
}




/**
 * Create a new actor. 
 *
 */
var Actor = function(){};

Actor.prototype.init = function(){
 		//TODO: check if the browser supports web workers.
		//if not, fallback to normal operation.
		console.log('WebWorkers supprted: ' + !!window.Worker);
 		
 		this.worker = new Worker('./_actor.js');
  		this.worker.onmessage = this._onmessage;
 			 
 		this.worker.id = ActorPool.getId();	
 		this.worker.postMessage({id:this.worker.id});
};
Actor.prototype._onmessage = function(e){
 		console.log(e.data);
 	},
Actor.prototype.worker = '';

/**
 * Set the receive function to parse messages and do calculations based on these messages.
 *
 */
Actor.prototype.receive = function(fn){
 		var fun  = fn.toString();
		this.worker.postMessage({fn:'var fn =function (){return '+fun+'}'});
};
Actor.prototype.send = function(data){
		this.queue.push(data);
		this.msgId ++;
		this.worker.postMessage({msg:data, msgId:this.msgId});
};

// Add custom queue, to be able to create work stealing actors & fork/join
Actor.prototype.queue : [];
Actor.prototype.msgId : 0;

