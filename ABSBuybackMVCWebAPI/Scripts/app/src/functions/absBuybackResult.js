export let absBuybackResultFunctions = {
    update: function update(buybackresult) {
        return this.repositoryService.AbsBuybackResultRepository.update(buybackResult);
    },
    get saleFirstDate() {
        if (instance.SaleFirstDate === null)
            return "Next Sale";
        return (new Date(instance.SaleFirstDate)).toLocaleDateString();
    },
    location: function location(saleLocations) {
        for(let location of saleLocations)
            if (location.SaleId === this.SaleId)
            return location.SaleLocation;
    }
}