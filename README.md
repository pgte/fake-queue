# fake-queue

In-memory queue for Node.js.

Used initially for simulating a queueing system for testing [banzai].

# Installation

    $ cd <PROJECT ROOT>
    $ npm install fake-queue

# Usage

## Job producer:

    var queue  = require('fake-queue')();

    var job = {
        to: 'pedro.teixeira@gmail.com'
      , subject: 'Oh hay!'
      , body: 'Hello world!'
    };

    queue.push('email', job);


## Job consumer:

    var queue = require('fake-queue)();

    queue.pop('email', function(job, done) {
      // actually send the email (not done here);

      // call done, with no error, or done(err) if there is an error
      done();
    });

[banzai]: https://github.com/pgte/banzai
