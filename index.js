var queues = {};
var waiting = {};

function notify(type) {
  var clients = waiting[type]
    , queue = queues[type]
    , client
    , job;
    
  if (queue && clients) {
    while (queue.length > 0 && clients.length > 0) {
      client = clients.splice(0, 1)[0];
      job = queue.splice(0, 1)[0];
      (function(client, job) {
        process.nextTick(function() {
          client(job, function(err) {
            if (err) { push(type, job); }
          });
        });
      })(client, job);
    }
  }
}

function push(type, jobData, callback) {
  if (! queues[type]) { queues[type] = []; }
  queues[type].push(jobData);
  notify(type);
  if (callback) {
    process.nextTick(callback);
  }
}

function pop(type, callback) {
  if (! waiting[type]) { waiting[type] = []; }
  waiting[type].push(callback);
  notify(type);
}

module.exports = {
    push: push
  , pop: pop
};