//const commType = "longLived";
const commType = "sendMessage";
const MSG_INTERVAL = 5000;

console.log ("ExtSource starting...")
chrome.commands.onCommand.addListener(function(command) {
    const ext2Id = "gobmlnnbmjemmpbgkkppcfcimkeicfnm";
    if (command == "send") {
        var counter = 0;
        // Start a long-running conversation:
        if (commType == "longLived"){
            var port = chrome.runtime.connect(ext2Id,{
                //includeTlsChannelId: true,
            });
            setInterval(()=>{
                console.log(`After ${(++counter)*5}s`);
                port.postMessage({id:chrome.runtime.id,msg:"hello from extSource"});
            },MSG_INTERVAL)
        }
        else {
           setInterval(()=>{
               console.log(`After ${(++counter)*5}s`);
               chrome.runtime.sendMessage(ext2Id,"hello from extSource")
            },MSG_INTERVAL)
        }
     }
});

// For long-lived connections:
chrome.runtime.onConnectExternal.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      // See other examples for sample onMessage handlers.
    });
  });

// For short-lived messages
chrome.runtime.onMessageExternal.addListener((msg,from,reply)=>{
    console.log("Receving msg:",msg)
    reply("received")
});