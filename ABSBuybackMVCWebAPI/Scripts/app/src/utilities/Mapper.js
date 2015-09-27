export class Mapper
{
    map(from, to)
    {
        var toObject = new to();
        for(var property in toObject)
            if (from.hasOwnProperty(property))
                toObject[property] = from[property];
        return toObject;
    }
}