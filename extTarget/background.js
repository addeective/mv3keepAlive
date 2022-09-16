console.log ("ExtTarget starting...")
// For long-lived connections:
chrome.runtime.onConnectExternal.addListener(function(port) {
  var ext1Id = port.sender.id;
  var port2 = chrome.runtime.connect(ext1Id);
  port.onMessage.addListener(function(msg) {
    // See other examples for sample onMessage handlers.
    console.log("Receiving message ",msg)
    port2.postMessage("hello from extTarget");
  });
});

chrome.runtime.onMessageExternal.addListener((msg,from,reply)=>{
  console.log("Receving msg:",msg)
  chrome.runtime.sendMessage(from.id,"hello from extTarget");
  reply("received")
});