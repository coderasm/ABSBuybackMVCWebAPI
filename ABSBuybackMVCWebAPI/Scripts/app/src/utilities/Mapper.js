export class Mapper
{
    map(from, to)
    {
        var toObject = to();
        for(var property in toObject)
            if (property in from)
                toObject[property] = from[property];
        return toObject;
    }
}