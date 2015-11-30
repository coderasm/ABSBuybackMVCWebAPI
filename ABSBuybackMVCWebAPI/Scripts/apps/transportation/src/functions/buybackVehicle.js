export let buybackVehicleFunctions = {
    doCreate: function doCreate()
    {
        if (this.create && this.isValid())
            this.createBuybackResult();
    },
    createBuybackResult: function createBuybackResult()
    {
        var vehicle = this.mapper.map(this)
        if (this.ResultDescriptionId != 10)
            this.repositoryService.BuybackResultRepository.insert(vehicle);
        else
            this.repositoryService.AbsBuybackResultRepository.insert(vehicle);
    },
    isValid: function isValid()
    {
        this.validation.validate().catch(err => {});
        return this.validation.result.isValid;
    },
    setReason: function setReason(reason) {
        this.ReasonId = reason;
    },
    setSaleOption: function setSaleOption(saleOption) {
        this.ResultDescriptionId= saleOption;
    },
    setAbsSaleLocation: function setAbsSaleLocation(saleId) {
        this.SaleId = saleId;
    },
    setAbsSaleInstance: function setAbsSaleInstance(saleInstance) {
        this.SaleInstanceId = saleInstance;
    }
}