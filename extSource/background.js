(async function (){
	const ext2Id = "gnkkmncidpgoilibajgodpljafkljnog";
	function sendMessageToKA(){
		return new Promise(resolve => {
			chrome.runtime.sendMessage(ext2Id,{msg:"kaAreYouThere"}).then(response => {
				debug && console.log("Response:"+response)
				resolve(true);
			}).catch(e => {resolve(false)})
		})
	}
	async function waitForKa(){
		let isKAinstalled = await sendMessageToKA();
		if (!isKAinstalled){
			return new Promise(resolve =>{
				let kaIntervalId = setInterval(async () => {
					let isKAinstalled = await sendMessageToKA();
					if (isKAinstalled){
						resolve(true);
						clearInterval(kaIntervalId)
					}
					else{
						console.error("You need to install MV3keepAlive first !!")
						console.error("once installed, reload your extension !!")
					}
				},5000)
			});
		}
		return true;
	}
	const debug = true;
	var counter = 1;
	var port = null;
	await waitForKa();
	// Start a long-running conversation:
	port = chrome.runtime.connect(ext2Id,{name:"MV3keepAlivePort"});
	debug && chrome.action.setBadgeText(
		{text: (counter-1).toString()} // object
	)   				
	setInterval(()=>{
		if (counter % 25 == 0){
			port = chrome.runtime.connect(ext2Id,{name:"MV3keepAlivePort"});
			debug && console.log("Reconnecting to port ",port)
		}
		debug && console.log(`After ${(++counter)*10}s`);
		debug && chrome.action.setBadgeText(
			{text: counter.toString()} // object
		)   
		port.postMessage({id:chrome.runtime.id,msg:"hello from extSource"});
	},10000)
	chrome.runtime.onConnectExternal.addListener((port) => {
		port.name=="MV3keepAlivePort" && port.onMessage.addListener((msg) => {});
	});
	return true;
})()