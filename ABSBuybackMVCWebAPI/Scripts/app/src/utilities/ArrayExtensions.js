export { if (typeof Array.prototype.distinct !== "function")
            Array.prototype.distinct = function () {
                var distinct = [];
                var self = this;
                var processObjects = function() {
                    self.forEach(elthis => {
                        var found = processObject(elthis);
                    if(!found)
                        distinct.push(elthis);
                });
            }
            var processObject = function(elthis) {
                if(typeof Object.getPrototypeOf(elthis).equals === 'function')
                    return distinct.some(eldist => {
                        return elthis.equals(eldist);
            });
            return distinct.some(eldist => {
                return eldist === elthis;
            });
            }
            var processPrimatives = function() {
                self.reduce(function(distinctValues, val) {
                    if (distinctValues.indexOf(val) === -1) {
                        distinctValues.push(val)
                    }
                    return distinctValues;
                },
                            distinct
                     );
            }
            if(typeof this[0] === 'object')
                processObjects();
            else
                processPrimatives();
            return distinct;
            };
}