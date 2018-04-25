var Observable = function() {

    var self = new Object();

    // Cache of all topics
    self.topics = {};

    // Iterates through all subscribers of a topic and invokes their callback,
    // passing optional arguments.
    self.publish = function( topic, args ) {
        if ( self.topics[ topic ] ) {
            var thisTopic = self.topics[ topic ],
                thisArgs = args || [];

            thisTopic.sort(function(a, b) {
                if (! a.priority) a.priority = 10;
                if (! b.priority) b.priority = 10;
                return a.priority - b.priority;
            });

            for ( var i = 0, j = thisTopic.length; i < j; i++ ) {
                thisTopic[i].apply( self, thisArgs );
            }
        }
    };

    // Returns a handle needed for unsubscribing
    self.subscribe = function( topic, callback, priority ) {

        if (! priority) {
            priority = 10;
        }

        if ( ! self.topics[ topic ] ) {
            self.topics[ topic ] = [];
        }

        callback.priority = priority;
        callback.uuid     = Utils.uuid();

        self.topics[ topic ].push( callback );

        return {
            topic    : topic,
            callback : callback
        };
    };

    // Removes the subscriber from the particular topic its handle was assigned to
    self.unsubscribe = function( handle ) {
        var topic = handle.topic;

        if ( self.topics[ topic ] ) {
            var thisTopic = self.topics[ topic ];

            for ( var i = 0, j = thisTopic.length; i < j; i++ ) {
                if ( thisTopic[i].uuid === handle.callback.uuid ) {
                    thisTopic.splice( i, 1 );
                }
            }
        }
    };

    return self;
};