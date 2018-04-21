# JSX Common Library

This library is a work-in-progress. The purpose is to build a library of modules that encapsulate commonly-used patterns in Adobe Illustrator JSX plugins. Feel free to make suggestions about modules to include.

## Overview

You will notice that the file extension for these scripts is JSXINC. This is because the common practice for included scripts versus procedural code is to use JSXINC. However, this is just convention and you can use any of JS, JSX, or JSXINC.

To use any of these scripts, simply include the following in your script:

```jsx
#include "/path/to/jsx-common/{{FILE}}.jsxinc;
```

## Logger.jsxinc

After including the logger class in your script, you will need to create a new instance. The Logger class takes two arguments:

1. The name of the app using the logger.
1. The location where you want to save the log files.

See below for an example usage:


```jsx
#include "/path/to/jsx-common/Logger.jsxinc;
```

```jsx
var logger = new Logger( $.fileName, "/var/log/" );
```

Write something to the log...

```jsx
Logger.info( 'This is only a test' );
```

Open /var/logs/myscript-2018-01-26.log

```jsx
This is only a test
```


## Progress.jsxinc

The Progress class allows you to easily incorporate a progress bar into your script/app.

Example:

```jsx
#include "/path/to/jsx-common/Progress.jsxinc;
```

```jsx
var MyProgress = Progress.init( 0, 100 );
```

```jsx
Progress.show();
```

```jsx
Do some stuff ...
```

```jsx
Progress.update( "Processed X of Y items" );
```

```jsx
Finish doing some stuff...
```

```jsx
Progress.close();
```

## JSON.jsxinc

The JSON class works the same as the native JSON class in modern web browsers. Currently, the JSX engine in Adobe Illustrator ( as of 01/26/2018 ) does not support JSON natively.

NOTE: I am not the original author of this include. I have tried to find who wrote the script originally but have not been able to find the author. There are numerous copies of this exact code in numerous libraries. I am happy to add a credit and link to the original author if anyone knows who it is.

Example Usage:

```jsx
#include "/path/to/jsx-common/JSON.jsxinc;
```

```jsx
var Animal = {
    type : "dog",
    legs : 4,
    name : "Sammy"
};
```
```jsx
var sAnimal = JSON.stringify( Animal );
```

```jsx
alert( sAnimal );
```

```jsx
// Displays a string representation of Animal
```

## Utils.jsxinc

The Utils class is just that - a utility class - that includes a lot of convenience methods for various patterns I use over-and-over. I hope you will find it as useful as I do. The best thing to do is read through the code comments to see what it does. You will notice that the Logger and Progress are also included in the Utils class with wrapper methods for using them as well.

Example Usage:

```jsx
#include "/path/to/jsx-common/Utils.jsxinc;
```

```js
/**
 * Turn off displaying alerts.
 */
Utils.displayAlertsOff();
```
```js
/**
 * Turn on displaying alerts.
 */
Utils.displayAlertsOn();
```

```js
/**
 * Get a value from an object or array.
 * @param   {object|array}    subject
 * @param   {string}          key
 * @param   {*}               dfault
 * @returns {*}
 */
Utils.get( subject, key, dfault );
```

```js
/**
 * Open a file dialog.
 * @param   {File} file           The file object
 * @param   {String} title        The dialog title
 * @param   {String} file_filter  The file filter pattern
 * @returns {*}
 */
Utils.chooseFile( oFile, title, file_filter );
```

```js
/**
 * Gets the screen dimensions and bounds.
 * @returns {{left: *, top: *, right: *, bottom: *}}
 */
Utils.getScreenSize();
```

```js
/**
 * Create a new dialog, centered on screen.
 * @param type
 * @param width
 * @param height
 * @param title
 * @returns {window}
 */
Utils.window( type, title, width, height );
```

```js
/**
 * Saves the file in AI format.
 * @param {document} doc            The document object to save
 * @param {string}   path           The file destination path
 * @param {int}      compatibility  The Adobe Illustrator format ( version )
 * @return void
 */
Utils.saveFileAsAi( doc, path, compatibility );
```

```js
/**
 *
 * @param {string}  str
 * @returns {XML|string|void}
 */
Utils.trim( str );
```

```js
/**
 * Logging for this script.
 * @param {string} message      The logging text
 * @return void
 * @deprecated
 */
Utils.logger( message, line, filename );
```

```js
/**
 * Logging for this script.
 * @param {string}  path        The file path
 * @param {string}  txt         The text to write
 * @param {bool}    replace     Replace the file
 * @return void
 */
Utils.write_file( path, txt, replace );
```

```js
/**
 * Writes a file and calls a callback.
 * @param   {string}    path        The file path
 * @param   {string}    txt         The text to write
 * @param   {function}  callback    The callback to execute.
 * @returns {*}                     The result of the callback.
 */
Utils.write_and_call( path, txt, callback );
```

```js
/**
 *
 * @param {string}  path
 * @param {object}  json
 * @param {bool}    replace
 */
Utils.write_json_file( path, json, replace );
```

```js
/**
 * Reads the contents of a file.
 * @param   {string}  filepath
 * @returns {string}
 */
Utils.read_file( filepath );
```

```js
/**
 *
 * @param {string}  filepath
 * @returns {*}
 */
Utils.read_json_file( filepath );
```

```js
/**
 * Replace Mac's tilde home alias with full path.
 * @param {string}      path    The path to de-mac.
 * @returns {string}
 */
Utils.expand_path( path, root_path );
```

```js
/**
 * Get saved configuration JSON.
 * @param {String}  config_file     Path to the config file.
 * @returns {{}}
 */
Utils.get_config( config_file );
```

```js
/**
 *
 * @param {string}  filepath
 * @param {bool}    mustconfirm
 */
Utils.deleteFile( filepath, mustconfirm );
```

```js
/**
 * Initialize a folder.
 * @param {string}  path
 */
Utils.folder( path );
```

```js
/**
 * Get all files in sub-folders.
 * @param   {string}  srcFolder
 * @returns {Array}
 */
Utils.getFilesInSubfolders( srcFolder );
```

```js
/**
 * Format the date in YYYY-MM-DD format
 * @param {string}  date  The date in timestring format
 * @return {string} date string in YYYY-MM-DD format ( 2015-10-06 )
 */
Utils.dateFormat( date );
```
```js
/**
 * Stringify an object.
 * @param   {object}  obj
 * @returns {string}
 */
Utils.objectToString( obj );
```

```js
/**
 * Align objects to nearest pixel.
 * @param {array}   sel     Selection array
 */
Utils.alignToNearestPixel( sel );
```

```js
/**
 * Cleans up the filename/artboardname.
 * @param   {String}    name    The name to filter and reformat.
 * @returns  {String}            The cleaned up name.
 */
Utils.filterName( name );
```

```js
/**
 * Test if all parents are visible & unlocked.
 * @param {object} item
 * @returns {boolean}
 */
Utils.isVisibleAndUnlocked( item );
```

```js
/**
 * Derived from P. J. Onori's Iconic SVG Exporter.jsx
 * @param {object} item
 * @returns {boolean}
 */
Utils.anyParentLocked( item );
```

```js
/**
 * Derived from P. J. Onori's Iconic SVG Exporter.jsx
 * @param {object} item
 * @returns {boolean}
 */
Utils.anyParentHidden( item );
```

```js
/**
 * Groups selected items.
 * @returns void
 */
Utils.groupSelection();
```

```js
/**
 * Display a new progress bar.
 * @param maxvalue
 * @returns {*}
 */
Utils.showProgressBar( maxvalue );
```

```js
/**
 * Hides and destroys the progress bar.
 */
Utils.hideProgressBar();
```

```js
/**
 * Updates the progress bar.
 * @param progress
 * @returns {*}
 */
Utils.updateProgress( message );
```

```js
/**
 * Updates the progress bar.
 * @param progress
 * @returns {*}
 */
Utils.updateProgressMessage( message );
```

```js
/**
 * Alias for localize function.
 * @param str
 * @param vars
 * @returns {*}
 */
Utils.i18n( str, vars );
```

```js
/**
 * Converts a string, array, or object to dash-separated string.
 * @param   {string|array|object}   subject    A string, array, or object to convert to a slug.
 * @returns {string}                           The cleaned up name.
 */
Utils.slugger( subject );
```

```js
/**
 * Gets the artboard index of the current selection. This is a brute-force approach
 * and not the ideal solution but it's the best we can currently do.
 * @author  carlos canto 09/28/2013
 * @see     http://forums.adobe.com/message/5721205?tstart=0#5721205
 * @param   {GroupItem}     The selection for which see want the artboard.
 * @returns {integer}       Returns the index of the artboard.
 */
Utils.getArtboardOfGroupItem( groupItem );
```

```js
/**
 * Get the index of an artboard by its name.
 * @param {string} name
 * @returns {number}
 */
Utils.getArtboardIndexByName( name );
```

```js
/**
 * Get the artboard index using the name of the items on the artboard.
 * @param itemName
 * @returns {number}
 */
Utils.getArtboardIndexItemByName( itemName );
```

```js
/**
 * Set active artboard by name.
 * @param {string} name
 */
Utils.setActiveArtboardByName( name );
```

```js
/**
 * Get a unique universal identifier.
 * RFC4122 version 4 compliant.
 * @returns {string}
 */
Utils.generateUUID();
```

```js
/**
 * @experimental
 * Rename artboard groupItems by artboard name
 */
Utils.renameGroupItemsByArtboardNames();
```

```js
/**
 * Opens a folder in the Finder. If `thePath` is not defined,
 * the active document in Illustrator will be used. If no documents
 * are open, it will error out.
 * @param {string} thePath
 */
Utils.showInFinder( thePath );
```