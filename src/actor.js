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
var ActorConfig = {
	workerPath : '_actor.js'
};




/**
 * Create a new actor. 
 *
 */
var Actor = function(){};

Actor.prototype = {
	start : function(){
 		//TODO: check if the browser supports web workers.
		//if not, fallback to normal operation.
		console.log('WebWorkers supprted: ' + !!window.Worker);
		try{ 
			this.worker = new Worker(ActorConfig.workerPath);
		}
		catch(e){console.error(e);}
 		this.worker.onmessage = this._onmessage;
  		this.worker.id = ActorPool.getId();	
  		this.worker.postMessage({id:this.worker.id});
},
 	_onmessage : function(e){
 		console.log('msg received')
 		console.log(e.data);
 	},
	worker : '',

/**
 * Set the receive function to parse messages and do calculations based on these messages.
 *
 */
	receive : function(fn){
 		var fun  = fn.toString();
		this.worker.postMessage({fn:'var fn =function (){return '+fun+'}'});
	},
	send : function(data){
		this.queue.push(data);
		this.msgId++;
		this.worker.postMessage({msg:data, msgId:this.msgId});
	}
}

// Add custom queue, to be able to create work stealing actors & fork/join
Actor.prototype.queue = [];
Actor.prototype.msgId = 0;

