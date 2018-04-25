var ArtboardDimensions = function(artboard) {
    if (typeof(dims) == "undefined") {
        var left     = artboard.artboardRect[0];
        var top      = artboard.artboardRect[1];
        var right    = artboard.artboardRect[2];
        var bottom   = artboard.artboardRect[3];
        var dims = {
            top    : top,
            left   : left,
            right  : right,
            bottom : bottom,
            width  : Math.abs(right) - Math.abs(left),
            height : Math.abs(bottom) - Math.abs(top)
        };
    }
    return dims;
};