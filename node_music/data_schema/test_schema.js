    // const async = require('async');
    // var options = {discriminatorKey: 'kind',collection: 'event_test' };

    // var eventSchema = new mongoose.Schema({time: Date}, options);
    // var Event = mongoose.model('Event', eventSchema);

    // // ClickedLinkEvent 是一个有 URL 的特别 event
    // var ClickedLinkEvent = Event.discriminator('ClickedLink',
    //   new mongoose.Schema({url: String}, options));

    // // 但是 ClickedLinkEvent 可以有
    // var clickedEvent =
    //   new ClickedLinkEvent({time: Date.now(), url: 'google.com'});
   
    //   var event1 = new Event({time: Date.now()});
    //   var event2 = new ClickedLinkEvent({time: Date.now(), url: 'google.com'});
  
    //   var save = function (doc, callback) {
    //     doc.save(function (error, doc) {
    //       callback(error, doc);
    //     });
    //   };
  
    //   async.map([event1, event2], save, function (error,doc) {
    //       //console.log(doc);
    //     Event.count({}, function (error, count) {
    //         //console.log(count);
    //       //assert.equal(count, 2);
    //     });
    //   });