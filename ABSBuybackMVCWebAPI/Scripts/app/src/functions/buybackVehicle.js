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
            Vehicle:this.mapper.map(this),
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
    },
    setReason: function setReason(reason) {
        this.reasonId = reason;
    },
    setSaleOption: function setSaleOption(saleOption) {
        this.resultDescriptionId= saleOption;
    },
    setAbsSaleLocation: function setAbsSaleLocation(saleId) {
        this.saleId = saleId;
    },
    setAbsSaleInstance: function setAbsSaleInstance(saleInstance) {
        this.saleInstanceId = saleInstance;
    }
}