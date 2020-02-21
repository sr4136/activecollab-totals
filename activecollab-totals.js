// ==UserScript==
// @name         ActiveCollab Time Totals
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       SteveR
// @match        https://app.activecollab.com/207970/my-time
// ==/UserScript==

/* Hiding "jQuery is not defined" errors in Tampermonkey
https://github.com/Tampermonkey/tampermonkey/issues/553#issuecomment-417948210 */
/* globals jQuery, $ */


/* Wait until element exists
 * From: https://stackoverflow.com/a/54131168/2203220
*/
function waitUntilElementLoaded(selector) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var start = performance.now();
    var now = 0;

    return new Promise(function (resolve, reject) {
        var interval = setInterval(function () {
            var element = document.querySelector(selector);

            if (element instanceof Element) {
                clearInterval(interval);

                resolve();
            }

            now = performance.now();

            if (now - start >= timeout) {
                reject("Could not find the element " + selector + " within " + timeout + " ms");
            }
        }, 100);
    });
}

/* Adding CSS
 * From: https://stackoverflow.com/a/524721/2203220
*/
var css = `
.tracking_objects_list_group h2 {
    background: black;
    margin-bottom: 0;
    padding: .5em 1em;
    color: white;
}
.tracking_objects_list_group h2 span {
    float: right;
    font-size: 1.5em;
}
.tracking_objects_list_group h2 span::after {
    content: " hrs";
    font-size: .75em;
}`,
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet){
  // This is required for IE8 and below.
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}


/* Run the calculations */

waitUntilElementLoaded( '.paper-title', 2000 ).then( reCalc );

$( document ).on( 'click', '.my_time_form .submit_button', function(){
    setTimeout( reCalc, 1500 );
});

function reCalc(){
    $( '.tracking_objects_list_group' ).each( function(){
        var groupTotal = 0;
        var groupWholeTotal = 0;
        var groupDecimalTotal = 0;

        $( this ).find( '.tracking_object_value span' ).each( function(){
            var thisTime = $( this ).text().split( ':' );
            groupWholeTotal += parseFloat( thisTime[0] );
            groupDecimalTotal += parseFloat( thisTime[1] );
        } );

        //console.log( 'whole ' + groupWholeTotal );
        //console.log( 'decimal ' + groupDecimalTotal/60 );

        groupTotal = groupWholeTotal + ( groupDecimalTotal/60 );
        if( $( this ).find( 'h2 span' ).length ){
            $( this ).find( 'h2 span' ).text( groupTotal );
        }else {
            $( this ).find( 'h2' ).append( '<span class="total">' + groupTotal + '</span>');
        }

    } );
}
