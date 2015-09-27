export class SaleLocation
{
    id = null;
    name = null;

    equals(object)
    {
        if (typeof object === "object" && Object.getPrototypeOf(object) === Object.getPrototypeOf(this)) {
            return this.Id === object.Id;
        }
        return false;
    }
}