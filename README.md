# MV3 keep alive extension

This extension will keep your Manifest V3 extension alive and avoid the burden to evolve your service worker to state persistent.

# configuring your extension

Please paste the content of example/background.js file at the beginning of your own service worker script.

We have posted our own version of the MV3 keep alive extension on the Chrome Web Store under the extension id dnpicagigpocioedhbidlikohomefllp.

Add the following lines to your manifest.json file:

```

"externally_connectable": {
  "ids": ["dnpicagigpocioedhbidlikohomefllp"]
},

```

Remark: source is provided in mv3keepalive/ so you can post your own version. Should you do that, you will have to replace the "ids" section content with your own keepalive extension id.
