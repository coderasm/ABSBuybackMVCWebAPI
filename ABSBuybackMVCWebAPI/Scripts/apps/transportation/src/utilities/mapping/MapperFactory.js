export function MapperFactory() {
    return {
        map: function(from) {
            var toObject = toFactory();
            for (var property in toObject)
                if (property in from)
                    toObject[property] = from[property];
            return toObject;
        },
        toFactory: function() {
            return {};
        }
    }
}