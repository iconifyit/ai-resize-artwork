/**
 * USAGE:
 *
 * 1. Place this script in Applications > Adobe Illustrator > Presets > en_US > Scripts
 * 2. Restart Adobe Illustrator to activate the script
 * 3. The script will be available under menu File > Scripts > Center on Artboards
 */
/**
 * LICENSE & COPYRIGHT
 *
 *   You are free to use, modify, and distribute this script as you see fit.
 *   No credit is required but would be greatly appreciated.
 *
 *   Scott Lewis - scott@iconify.it
 *   http://github.com/iconifyit
 *   http://iconify.it
 *
 *   THIS SCRIPT IS OFFERED AS-IS WITHOUT ANY WARRANTY OR GUARANTEES OF ANY KIND.
 *   YOU USE THIS SCRIPT COMPLETELY AT YOUR OWN RISK AND UNDER NO CIRCUMSTANCES WILL
 *   THE DEVELOPER AND/OR DISTRIBUTOR OF THIS SCRIPT BE HELD LIABLE FOR DAMAGES OF
 *   ANY KIND INCLUDING LOSS OF DATA OR DAMAGE TO HARDWARE OR SOFTWARE. IF YOU DO
 *   NOT AGREE TO THESE TERMS, DO NOT USE THIS SCRIPT.
 */

/**
 * Declare the target app.
 */
#target illustrator

/**
 * Include the libraries we need.
 */
#includepath "/Users/scott/github/iconify/jsx-common/";


#include "JSON.jsxinc";
#include "Utils.jsxinc";
#include "Logger.jsxinc";

/**
 * Name that script.
 */
#script "Resize Icons";

/**
 * Disable Illustrator's alerts.
 */
Utils.displayAlertsOff();

/**
 * Set some global variables.
 */
var $HERE = new File($.fileName).path + '/';
var $HOME = new File('~/').fsName + '/';
var $UUID = Utils.uuid().split('-').shift();

/**
 * The config object for this script.
 * @type {{
 *     APP_NAME: string,
 *     LOGFOLDER: string
 * }}
 */
var CONFIG = Utils.create({
    APP_NAME   : 'ai-resize-icons',
    SCALE      : 100,
    UNIT_TYPES : {
        PT   : 0,
        PICA : 1,
        INCH : 2,
        MM   : 3,
        CM   : 4,
        HQ   : 5,
        PX   : 6
    }
});

/**
 * Import external configs to over-ride the settings above.
 */
#include "conf/config.js";

/**
 * Update the CONFIG object with any user-specified
 * custom values.
 */
Utils.update(CONFIG, DEFAULT_CONFIG || {});

// End global setup

var Module = (function(CONFIG) {

    // Create a logger instance.
    Utils['logger'] = new Logger(CONFIG.APP_NAME, Utils.folder(CONFIG.LOG_FILE_PATH));

    /**
     * Create a new instance of this module.
     * @constructor
     */
    var Instance = function() {
        app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;
        app.preferences.setIntegerPreference("rulerType", CONFIG.UNIT_TYPES.PX);

        if (app.documents.length > 0) {

            var doc   = app.activeDocument;
            var count = doc.artboards.length;

            var theUnit  = null;
            var theValue = null;

            var n = 0;
            var max = 5;
            while ((isNaN(theValue) || ['%', 'px'].indexOf(theUnit) == -1) && n < max) {
                theResponse = Window.prompt ("Enter the new size for the artboards. You can specify a percentage or pixels. Ex: 100% or 128px", '100%');
                theUnit  = theResponse.replace(/[0-9]+/, '');
                theValue = parseFloat(theResponse);
                n++;
            }

            if (isNaN(theValue) || ['%', 'px'].indexOf(theUnit) == -1) {
                return;
            }

            Utils.showProgressBar(doc.artboards.length);

            for (i = 0; i < count; i++) {
                doc.artboards.setActiveArtboardIndex(i);
                doc.selectObjectsOnActiveArtboard();
                app.executeMenuCommand('group');

                var board    = doc.artboards[doc.artboards.getActiveArtboardIndex()];
                var left     = board.artboardRect[0];
                var top      = board.artboardRect[1];
                var right    = board.artboardRect[2];
                var bottom   = board.artboardRect[3];
                var abWidth  = Math.abs(right) - Math.abs(left);
                var abHeight = Math.abs(bottom) - Math.abs(top);

                // If there are no visible items, update the progress bar and continue.
                if (doc.selection.length == 0) {
                    Utils.updateProgress(
                        localize({en_US: 'Artboard %1 has no visible items. Skipping.'}, i)
                    );
                    continue;
                }

                var groupItem = doc.selection[0];

                CONFIG.SCALE = theValue;
                if (theUnit != '%' && Utils.trim(theUnit) != '') {
                    CONFIG.SCALE = Utils.scaleFromSize(
                        groupItem.width, groupItem.height,
                        theValue, theValue
                    );
                    if (theValue > abWidth || theValue > abHeight) {
                        Utils.progress.close();
                        throw new Error("The artwork cannot be larger than the artboard. It will cause errors");
                        return;
                    }
                    var ratio = CONFIG.SCALE / 100;
                    if (ratio * groupItem.width > abWidth || ratio * groupItem.height > abHeight) {
                        Utils.progress.close();
                        throw new Error("The artwork cannot be larger than the artboard. It will cause errors");
                        return;
                    }
                }

                Utils.logger.info( "Calculated scale : " + CONFIG.SCALE + "%" );

                if (isNaN(CONFIG.SCALE)) {
                    Utils.progress.close();
                    throw new Error("Scale must be a numeric value expressed as a percentage or exact size");
                    return;
                }

                try {
                    Utils.updateProgressMessage(
                        localize({en_US: 'Grouping selection'})
                    );
                    Utils.updateProgressMessage(
                        localize(
                            {en_US: 'Selection is %1'},
                            Utils.isVisibleAndUnlocked(doc.selection)
                                ? 'Visible'
                                : 'Hidden'
                        )
                    );
                    if (! Utils.isVisibleAndUnlocked(doc.selection)) continue;

                    Utils.resizeArtwork(
                        groupItem,
                        groupItem.width,
                        groupItem.height,
                        abWidth,
                        abHeight,
                        CONFIG.SCALE
                    );
                }
                catch(e) {
                    Utils.progress.close();
                    Utils.logger.error(e.message);
                    // $.writeln("[ERROR] " + e.message);
                }
                redraw();
                Utils.updateProgress(localize({en_US: 'Selection centered'}));
            }
            Utils.progress.close();
        }
        else  {
            alert(localize({en_US: 'There are no open documents'}))
        }
    }

    /**
     * Returns the public module object.
     */
    return {
        /**
         * Runs the module code.
         */
        run: function() {
            new Instance();
        }
    }

})(CONFIG);

Module.run();

Utils.displayAlertsOn();