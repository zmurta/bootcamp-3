'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);

var listingData = fs.readFileSync('listings.json', 'utf8');
listingData = JSON.parse(listingData);

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
for(var i = 0; i < listingData.entries.length; i++) {
  if(listingData.entries[i].coordinates !== undefined) {
    var temp = new Listing({
      code : listingData.entries[i].code,
      name : listingData.entries[i].name,
      coordinates : {
        latitude : listingData.entries[i].coordinates.latitude,
        longitude : listingData.entries[i].coordinates.longitude
      },
      address : listingData.entries[i].address
    });
  }
  else {
    var temp = new Listing({
      code : listingData.entries[i].code,
      name : listingData.entries[i].name
    });
  }

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */

  temp.save( (err) => {
    if(err) throw err;
    console.log("Saved!");
  });
}