var queues = {};
var waiting = {};

function notify(type) {
  var clients = waiting[type]
    , queue = queues[type]
    , client
    , job;
  
  if (queue && clients) {
    while (queue.length > 0) {
      client = clients.shift();
      clients.push(client);
      job = queue.shift();
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
  process.nextTick(function() {
    notify(type);
  });
  if (callback) {
    process.nextTick(callback);
  }
}

function pop(type, callback) {
  if (! waiting[type]) { waiting[type] = []; }
  waiting[type].push(callback);
  process.nextTick(function() {
    notify(type);
  });
}

module.exports = function() {
  return {
      push: push
    , pop: pop
  };
};