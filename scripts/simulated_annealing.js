/**
 * @author Francisco Soto <ebobby@gmail.com>
 */
var SimulatedAnnealing = (function () {
    var coolingFactor            = 0.0,
        stabilizingFactor        = 0.0,
        freezingTemperature      = 0.0,
        currentSystemEnergy      = 0.0,
        currentSystemTemperature = 0.0,
        currentStabilizer        = 0.0,

        generateNewSolution      = null,
        generateNeighbor         = null,
        acceptNeighbor           = null;

    function _init (options) {
        coolingFactor            = options.coolingFactor;
        stabilizingFactor        = options.stabilizingFactor;
        freezingTemperature      = options.freezingTemperature;
        generateNewSolution      = options.generateNewSolution;
        generateNeighbor         = options.generateNeighbor;
        acceptNeighbor           = options.acceptNeighbor;

        currentSystemEnergy      = generateNewSolution();
        currentSystemTemperature = options.initialTemperature;
        currentStabilizer        = options.initialStabilizer;
    }

    function _probabilityFunction (temperature, delta) {
        if (delta < 0) {
            return true;
        }

        var C = Math.exp(-delta / temperature);
        var R = Math.random();

        if (R < C) {
            return true;
        }

        return false;
    }

    function _doSimulationStep () {
        if (currentSystemTemperature > freezingTemperature) {
            for (var i = 0; i < currentStabilizer; i++) {
                var newEnergy = generateNeighbor(),
                    energyDelta = newEnergy - currentSystemEnergy;

                if (_probabilityFunction(currentSystemTemperature, energyDelta)) {
                    acceptNeighbor();
                    currentSystemEnergy = newEnergy;
                }
            }
            currentSystemTemperature = currentSystemTemperature - coolingFactor;
            currentStabilizer = currentStabilizer * stabilizingFactor;
            return false;
        }
        currentSystemTemperature = freezingTemperature;
        return true;
    }

    return {
        Initialize: function (options) {
            _init(options);
        },

        Step: function () {
            return _doSimulationStep();
        },

        GetCurrentEnergy: function () {
            return currentSystemEnergy;
        },

        GetCurrentTemperature: function () {
            return currentSystemTemperature;
        }
    };
})();