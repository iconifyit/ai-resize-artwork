


var $HOME = new File('~/').fsName + '/';
var $UUID = Utils.uuid().split('-').shift();

// TODO: The purpose of this class is to provide a bootstrap class for creating
// TODO: Illustrator JSX scripts.

// 1. Set up environment
// 2. Set global vars
// 3. Load dependencies
// 4.

var Module = function(config) {

    Utils.extend(this.prototype, new Observable());
    Utils.extend(this.prototype, new Configurable(config));

    this.prototype.UUID   = $UUD;
    this.prototype.config = {};

    Utils.extend(this.prototype.config, config, true);

    Utils['logger'] = new Logger(config.name, Utils.folder(config.LOG_FOLDER));

    var Instance = function() {
        alert('Hello, ' + this.config.name);
    }

    return {
        run: function() {
            return new Instance();
        }
    }
};

MyModule = new Module({name: "Scott"}).run();

// ex: MyModule = new Module({name: Foo, LOG_FOLDER: 'var/log/'});
var Configurable = function(config) {
    this.prototype.config = Utils.extend({}, config, true);
    return this.prototype;
};
//
// /**
//  * Implements an Observer pattern for the app.
//  * @constructor
//  */
// var Observable = function() {
//
//     this.prototype = {
//         observers: []
//     }
//
//     this.remove = function(eventName, eventHandler) {
//
//     }
//
//     this.removeAll = function(eventName) {
//
//     };
//
//     this.watch = function(eventName, eventHandler) {
//         if (typeof(this.prototype.observers[eventName]) == 'undefined') {
//             this.prototype.observers[eventName] = [];
//         }
//         this.prototype.observers[eventName].push(eventHandler);
//     };
//
//     this.hasEvent   = function() {}
//     this.hasHandler = function() {}
//     this.notify     = function() {}
//     this.notifyAll  = function() {}
// };

/**
 * ObserverList
 * @constructor
 */
function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.add = function( obj ) {
    return this.observerList.push( obj );
};

ObserverList.prototype.count = function() {
    return this.observerList.length;
};

ObserverList.prototype.get = function( index ) {
    if( index > -1 && index < this.observerList.length ) {
        return this.observerList[ index ];
    }
};

ObserverList.prototype.indexOf = function( obj, startIndex ) {
    var i = startIndex;

    while( i < this.observerList.length ){
        if( this.observerList[i] === obj ){
            return i;
        }
        i++;
    }

    return -1;
};

ObserverList.prototype.removeAt = function( index ){
    this.observerList.splice( index, 1 );
};

/**
 * Subject
 * @constructor
 */
function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.addObserver = function( observer ) {
    this.observers.add( observer );
};

Subject.prototype.removeObserver = function( observer ) {
    this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};

Subject.prototype.notify = function( context ) {
    var observerCount = this.observers.count();
    for(var i=0; i < observerCount; i++){
        this.observers.get(i).update( context );
    }
};

/**
 * Observer
 * @constructor
 */
function Observer(){
    this.update = function() {
        // ...
    };
}