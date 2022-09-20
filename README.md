# MV3 keep alive extension

This extension can keep an other extension alive and will avoid the burden to make their service worker state persistent.

  

Source is provided if you want to use your own version.

  
# configuring your extension

Please paste the content of example/background.js file at the beginning of your own service worker script.

and add the following lines to your manifest.json file:

``` 
"externally_connectable": {
  "ids": ["gnkkmncidpgoilibajgodpljafkljnog"]
}, 
``` 
