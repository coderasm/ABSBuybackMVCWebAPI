export class SaleLocation
{
    id = null;
    name = null;

    equals(object)
    {
        if (typeof object === "object" && Object.getPrototypeOf(object) === Object.getPrototypeOf(this)) {
            return this.id === object.id;
        }
        return false;
    }
}