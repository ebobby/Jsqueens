/**
 * @author Francisco Soto <ebobby@gmail.com>
 */
 var Console = (function () {
     var DOMConsole = null;

     function _init () {
         DOMConsole = document.getElementById('console');
     }

     function _clear () {
         DOMConsole.innerHTML = '';
     }

     function _print (output) {
         DOMConsole.innerHTML = DOMConsole.innerHTML + output;
     }

     return {
         Initialize: function () {
            _init();
         },

         Print: function () {
             _clear();

             for (var i = 0; i < arguments.length; i++) {
                 _print(arguments[i].toString() + ' ');
             }
         }
     }
 })();
