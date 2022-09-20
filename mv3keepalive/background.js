console.log ("MV3keepAlive starting...")
const debug = true;

// For long-lived connections:
var counter = 0;
chrome.runtime.onConnectExternal.addListener((port) => {
  var ext1Id = port.sender.id;
  var port2 = chrome.runtime.connect(ext1Id,{name:"MV3keepAlivePort"});
  debug && chrome.action.setBadgeText(
		{text: counter.toString()} // object
	)   
  port.onMessage.addListener((msg) => {
    if (++counter % 25 == 0){
      port2 = chrome.runtime.connect(ext1Id,{name:"MV3keepAlivePort"});
      debug && console.log("Reconnecting to port ",port2)
    }
    // See other examples for sample onMessage handlers.
    debug && console.log("Receiving message "+counter,msg)
    chrome.action.setBadgeText(
      {text: counter.toString()} // object
    )    
    port2.postMessage("hello from MV3keepAlive");
  });
});
chrome.runtime.onMessageExternal.addListener((msg,from,reply)=>{
  debug && console.log("Receving msg:",msg)
  reply("yes I am here")
});