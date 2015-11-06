export let buybackVehicleFunctions = {
    doCreate: function doCreate()
    {
        if (this.create && this.isValid())
            this.createBuybackResult();
    },
    createBuybackResult: function createBuybackResult()
    {
        var vehicleWithChoices = this.createVehicleWithChoices();
        if (this.saleOption != 10)
            this.repositoryService.BuybackResultRepository.insert(vehicleWithChoices);
        else
            this.createAbsBuyback(vehicleWithChoices);
    },
    createVehicleWithChoices: function createVehicleWithChoices()
    {
        return {
            Vehicle:this.buybackVehicleVMToBuybackVehicle.map(this),
            ResultDescriptionId:this.saleOption,
            ReasonId:this.reason
        }
    },
    createAbsBuyback: function createAbsBuyback(vehicle)
    {
        vehicle.SaleInstanceId = this.absOptionLocationInstanceId;
        vehicle.SaleId = this.absOptionLocationId;
        this.repositoryService.AbsBuybackResultRepository.insert(vehicle);
    },
    isValid: function isValid()
    {
        this.validation.validate().catch(err => {});
        return this.validation.result.isValid;
    }
}