#include "Iterator.js";

var items = [];

for (var i = 0; i < 100; i++) {
    items.push({index: i, name: "Item " + i});
}

var MyIterator = new Iterator(ditems);