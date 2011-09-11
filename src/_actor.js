/**
 *
 * Code for the Actor. No need to change this code in normal use.
 *
 */


/**
 * ID of this actor. 
 */
var id;

/**
 * The method used for receiving messages.
 */
var receive;


self.onmessage = function(event){
	if(event.data.fn)
	{
		eval(event.data.fn);
		receive = fn();
		self.postMessage('receive method: ' + receive.toString());
	}
	else if (event.data.id)
	{
		id = event.data.id;
		self.postMessage('id = ' + id);		
	}
	else if(event.data.msg)
	{
		self.postMessage({id:id, msg:receive(event.data.msg)});		
	}	
	else
	{
		self.postMessage('unknown message');		
	}	
}
