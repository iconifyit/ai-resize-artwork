if (typeof(Object.create) != "function") {
    Object.prototype.create = function(properties) {
        var self = new Object();
        for (key in properties) {
            self[key] = properties[key];
        }
        return self;
    };
}