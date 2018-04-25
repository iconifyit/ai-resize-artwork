/**
 * Only one instance of Strings is defined for the app because they should not change.
 * You can create an object named LANG.jsxinc in /ai-resize-artwork/lib/LANG.jsxinc with
 * the name of your language code (ex: en_US, en_UK, etc) matching the language setting
 * for Adobe Illustrator.
 */
var Strings = (function(TERMS, locale) {

    var locale = locale || app.locale;

    this.prototype = {
        get: function(key, vars) {
            return Strings._get(key, vars);
        }
    };

    this.prototype._strings = Utils.extend({}, TERMS, true);

    this.prototype._get = function(key, vars, _default) {
        var result = _default;
        if (typeof(this._strings[key]) != 'undefined') {
            result = this._strings[key];
        }
        var encoding = {};
        encoding[locale] = result;
        return localize(encoding, vars);
    }

    return this.prototype;
})( TERMS || {} );