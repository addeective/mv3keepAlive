(async function (){
  const debug = true;
	const extKeepAliveId = "bpinoclmlcmbcfnhokfbmlpkcdhllgll";
  let resetPortModulo = 0;
  // For long-lived connections:
  var counter = 0;
  chrome.runtime.onConnectExternal.addListener((port) => {
    //var ext1Id = port.sender.id;
    var port2 = chrome.runtime.connect(extKeepAliveId,{name:"MV3keepAlivePort"});
    debug && chrome.action.setBadgeText(
      {text: counter.toString()} // object
    )   
    port.onMessage.addListener((msg) => {
      if (++counter % resetPortModulo == 0){
        port2 = chrome.runtime.connect(extKeepAliveId,{name:"MV3keepAlivePort"});
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
  let isKAinstalled = await chrome.runtime.sendMessage(extKeepAliveId,{msg:"kaAreYouThere"}).then(response => {
    debug && console.log("Response:"+response)
    resetPortModulo = response.resetPortModulo;
    return true;
  }).catch(e => {return false})
  if (!isKAinstalled){
    console.error("You need to install MV3keepAlive first !!")
    console.error("once installed, reload your extension !!")
  }
})()