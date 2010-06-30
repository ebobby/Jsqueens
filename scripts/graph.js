/**
 * @author Francisco Soto <ebobby@gmail.com>
 */
var Graph = (function () {
    var canvasElement   = null,
        canvasContext   = null,
        canvasWidth     = 600,
        canvasHeight    = 100,
        graphXdelta     = 0.0,
        graphYscale     = 0.0,
        graphCurrentPos = 0.0,
        isSupported     = false
        alreadyCreated  = false;

    function _init (width, height) {
        graphXdelta = canvasWidth / width;
        graphYscale = canvasHeight / height;
        graphCurrentPos = 0.0;
        
        if (alreadyCreated) {
            document.getElementById('graph').innerHTML = '';
            alreadyCreated = false;
        }
        
        canvasElement = document.createElement('canvas');
        
        if (canvasElement.getContext) {
            canvasContext = canvasElement.getContext('2d');
        }
        else {
            return;
        }
        
        canvasElement.setAttribute('width', canvasWidth);
        canvasElement.setAttribute('height', canvasHeight);
        canvasElement.setAttribute('class', 'bordered');
        
        canvasContext.strokeStyle = 'rgb(0, 0, 0)';
        canvasContext.fillStyle = 'rgb(255, 255, 255)';
        canvasContext.moveTo(0, canvasHeight);        
        document.getElementById('graph').appendChild(canvasElement);
        isSupported = true;
        alreadyCreated = true;
    }

    function _drawPoint (value) {
        if (isSupported) {
            canvasContext.lineTo(graphCurrentPos, canvasHeight - (value * graphYscale));
            canvasContext.stroke();
            graphCurrentPos = graphCurrentPos + graphXdelta;   
        }        
    }

    return {
        Initialize: function (width, height) {
            _init(width, height);
        },

        Point: function (value) {
            _drawPoint(value);
        }
    };
})();