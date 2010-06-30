/**
 * @author Francisco Soto <ebobby@gmail.com>
 */
var App = (function () {
    var intervalId = 0,
        alreadyRunning = false;

    return {
        Start: function() {
            if (alreadyRunning) {
                return;
            }

            var options = {
                initialTemperature: 35.0,
                initialStabilizer: 35.0,
                coolingFactor: 0.05,
                stabilizingFactor: 1.005,
                freezingTemperature: 0.0,
                generateNewSolution: Queens.GenerateRandomPositions,
                generateNeighbor: Queens.GenerateNeighbor,
                acceptNeighbor: Queens.AcceptNeighbor
            };

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
