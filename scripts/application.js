/**
 * @author Francisco Soto <ebobby@gmail.com>
 */
var App = (function () {
    var intervalId     = 0,
        alreadyRunning = false;

    function GetOptions () {
        return {
            initialTemperature:  document.getElementById('initial_temperature').value,
            initialStabilizer:   document.getElementById('initial_stabilizer').value,
            coolingFactor:       document.getElementById('cooling_factor').value,
            stabilizingFactor:   document.getElementById('stabilizing_factor').value,
            freezingTemperature: document.getElementById('freezing_temperature').value
        };
    }

    return {
        Start: function() {
            if (alreadyRunning) {
                clearInterval(intervalId);
            }

            var options = GetOptions();

            options.generateNewSolution = Queens.GenerateRandomPositions;
            options.generateNeighbor    = Queens.GenerateNeighbor;
            options.acceptNeighbor      = Queens.AcceptNeighbor;

            Draw.Initialize();
            Graph.Initialize((options.initialTemperature - options.freezingTemperature) / options.coolingFactor, Constants.MAX_POSSIBLE_ATTACKS);
            Console.Initialize();
            SimulatedAnnealing.Initialize(options);
            Draw.DrawBoard(Queens.GetCurrentPositions());
            Console.Print('System energy: ', SimulatedAnnealing.GetCurrentEnergy());
            Graph.Point(SimulatedAnnealing.GetCurrentEnergy());

            intervalId = setInterval(function () {
                var done = SimulatedAnnealing.Step();
                Draw.DrawBoard(Queens.GetCurrentPositions());
                Console.Print('System energy: ', SimulatedAnnealing.GetCurrentEnergy(),
                              '&nbsp;&nbsp;&nbsp;',
                              'System temperature:', SimulatedAnnealing.GetCurrentTemperature());
                Graph.Point(SimulatedAnnealing.GetCurrentEnergy());

                if (done === true) {
                    clearInterval(intervalId);
                    alreadyRunning = false;
                }

            }, 50);

            alreadyRunning = true;
        }
    }
})();
