/**
 * Iterator class.
 * @type {{
 *    prototype: {
 *        items: Array,
 *        index: number,
 *        constructor: Iterator.constructor,
 *        first: Iterator.first,
 *        last: Iterator.last,
 *        hasNext: Iterator.hasNext,
 *        nextIndex: Iterator.nextIndex,
 *        next: Iterator.next, hasPrevious:
 *        Iterator.hasPrevious, previousIndex:
 *        Iterator.previousIndex,
 *        previous: Iterator.previous,
 *        current: Iterator.current,
 *        reset: Iterator.reset,
 *        each: Iterator.each,
 *        add: Iterator.add,
 *        insertAt: Iterator.insertAt,
 *        insertBefore: Iterator.insertBefore,
 *        insertAfter: Iterator.insertAfter,
 *        remove: Iterator.remove,
 *        removeAt: Iterator.removeAt,
 *        pop: Iterator.pop,
 *        shift: Iterator.shift,
 *        getItem: Iterator.getItem,
 *        getItems: Iterator.getItems,
 *        isInBounds: Iterator.isInBounds,
 *        checkBounds: Iterator.checkBounds,
 *        hasIndex: Iterator.hasIndex
 *     }
 * }}
 */
var Iterator = function(items) {

    /**
     * The object prototype. Properties and method shared by all instances of Iterator.
     */
    this.prototype = {

        /**
         * {array}  The iterable items.
         */
        items: [],

        /**
         * {number}
         */
        index: 0,

        /**
         *
         * @returns {*}
         */
        first: function() {
            this.reset();
            return this.next();
        },

        /**
         *
         * @returns {*}
         */
        last: function() {
            this.index = this.items.length-1;
            return this.items[this.index];
        },

        /**
         *
         * @returns {boolean}
         */
        hasNext: function() {
            return this.getIndex() < this.items.length;
        },

        /**
         *
         * @returns {number}
         */
        nextIndex: function() {
            return this.getIndex() + 1;
        },

        /**
         * Get the current index.
         * @returns {number}
         */
        getIndex: function() {
            return this.index;
        },

        /**
         *
         * @returns {*}
         */
        next: function() {
            return this.items[this.index++];
        },

        /**
         *
         * @returns {boolean}
         */
        hasPrevious: function() {
            try {
                var test = this.items[this.previousIndex()];
                return (typeof(test) !== "undefined");
            }
            catch(e) {
                return false;
            }
        },

        /**
         *
         * @returns {number}
         */
        previousIndex: function() {
            return this.getIndex() - 1;
        },

        /**
         *
         * @returns {*}
         */
        previous: function() {
            return this.items[this.index--];
        },

        /**
         *
         * @returns {*}
         */
        current: function() {
            return this.items[this.index];
        },

        /**
         *
         */
        reset: function() {
            this.index = 0;
            return this.getItems();
        },

        /**
         *
         * @param callback
         */
        each: function(callback) {
            try {
                this.reset();
                while (this.hasNext()) {
                    var i = this.getIndex();
                    callback.apply(this.next(), [i]);
                }
                return true;
            }
            catch(e) {
                $.writeln(e);
            }
        },

        /**
         *
         * @param item
         */
        add: function(item) {
            this.items.push(item);
        },

        /**
         *
         * @param item
         * @param idx
         * @returns {*}
         */
        insertAt: function(item, idx) {
            if (this.checkBounds(idx)) {
                this.items = [].concat(
                    this.items.slice(0, idx-1),
                    new Array().push(item),
                    this.items.slice(idx+1, this.items.length)
                );
                return this.getItems();
            }
        },

        /**
         *
         * @param item
         * @param idx
         * @returns {*}
         */
        insertBefore: function(item, idx) {
            if (this.checkBounds(idx)) {
                return this.insertAt(item, idx-1);
            }
        },

        /**
         *
         * @param item
         * @param idx
         * @returns {*}
         */
        insertAfter: function(item, idx) {
            if (this.checkBounds(idx)) {
                return this.insertAt(item, idx+1);
            }
        },

        /**
         * Remove an item from the collection. `item` may be an integer (index) or an object literal.
         * @param {*}   item
         * @returns {*|Array}
         */
        remove: function(item) {
            if (item instanceof Number) {
                this.removeAt(parseInt(item));
            }
            else {
                for (var i=0; i<this.items.length; i++) {
                    if (this.getItem(i).toSource() == item.toSource()) {
                        this.removeAt(i);
                    }
                }
            }
            return this.getItems();
        },

        /**
         *
         * @param idx
         * @returns {*}
         */
        removeAt: function(idx) {
            if (this.checkBounds(idx)) {
                return this.items = [].concat(
                    this.items.slice(0, idx-1),
                    this.items.slice(idx+1, this.items.length)
                );
                return this.getItems();
            }
        },

        /**
         *
         * @returns {*}
         */
        pop: function() {
            return this.items[this.items.length-1];
        },

        /**
         *
         * @returns {*}
         */
        shift: function() {
            return this.items[0];
        },

        /**
         *
         * @param idx
         * @returns {*}
         */
        getItem: function(idx) {
            if (this.checkBounds(idx)) {
                return this.items[i];
            }
        },

        /**
         *
         * @returns {Array}
         */
        getItems: function() {
            return this.items;
        },

        /**
         *
         * @param idx
         * @returns {*|boolean}
         */
        isInBounds: function(idx) {
            return this.hasIndex(idx) && idx <= this.items.lenth + 1;
        },

        /**
         *
         * @param idx
         * @returns {boolean}
         */
        checkBounds: function(idx) {
            if (! this.isInBounds(idx)) {
                throw new Error(localize({en_US: "Index [%1] is out of bounds"}, idx));
            }
            return true;
        },

        /**
         *
         * @param idx
         * @returns {boolean}
         */
        hasIndex: function(idx) {
            if (isNaN(idx)) return false;
            if (this.items.length < 0) return false;
            if (idx < 0) return false;
            if (idx > this.items.length) return false;
        },

        /**
         * Gets the size of the iterable collection.
         * @returns {Number}
         */
        size: function() {
            return this.items.length;
        }
    }

    if (items instanceof Object) {
        this.prototype.items = items;
    }
    else if (null == items || typeof(items) == "undefined") {
        this.prototype.items = [];
    }
    else {
        throw new Error("Iterator requires an array");
    }

    return this.prototype;
};