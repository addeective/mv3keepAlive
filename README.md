# MV3 keep alive extension

This extension will keep your Manifest V3 extension alive and avoid the burden to evolve your service worker to state persistent.

# configuring your extension

Please paste the content of example/background.js file at the beginning of your own service worker script.

and add the following lines to your manifest.json file:

```

"externally_connectable": {
  "ids": ["gnkkmncidpgoilibajgodpljafkljnog"]
},

```

Remark: source is provided in mv3keepalive/ if you want to use your own version. In this case, you will have to replace the "ids" with your new keepalive extension id.