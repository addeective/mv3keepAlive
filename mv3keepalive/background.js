var debug = true;
var counter = 1;
var port = null;

console.log ("MV3keepAlive starting...")

chrome.runtime.onMessageExternal.addListener((msg,from,reply)=>{
  const  extToKeepAlive = from.id;
	debug && console.log("Receving msg:",msg)
  // Start a long-running conversation:
  port = chrome.runtime.connect(extToKeepAlive,{name:"MV3keepAlivePort"});
  port.onDisconnect.addListener(()=>{
    intervalId && (intervalId = clearInterval(intervalId));
  })
  debug && chrome.action.setBadgeText(
    {text: (counter-1).toString()} // object
  )   				
  var intervalId = setInterval(()=>{
    if (counter % 28 == 0){
      port = chrome.runtime.connect(extToKeepAlive,{name:"MV3keepAlivePort"});
      debug && console.log("Reconnecting to port ",port)
      port.onDisconnect.addListener(()=>{
        intervalId && (intervalId = clearInterval(intervalId));
      })
    }
    debug && console.log(`After ${(++counter)*10}s`);
    debug && chrome.action.setBadgeText(
      {text: counter.toString()} // object
    )   
    //intervalId && port.postMessage({id:chrome.runtime.id,msg:"hello from extSource"});
  },10000)
  /*chrome.runtime.onConnectExternal.addListener((port) => {
    port.name=="MV3keepAlivePort" && port.onMessage.addListener((msg) => {});
  });*/
  reply({msg:"yes I am here", resetPortModulo:25})
});