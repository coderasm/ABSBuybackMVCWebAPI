export let absBuybackResultFunctions = {
    update: function update(buybackResult) {
        return this.repositoryService.AbsBuybackResultRepository.update(buybackResult);
    },
    get saleFirstDate() {
        if (this.SaleFirstDate === null)
            return "Next Sale";
        return (new Date(this.SaleFirstDate)).toLocaleDateString();
    },
    location: function location(saleLocations) {
        for(let location of saleLocations)
            if (location.SaleId === this.SaleId)
            return location.SaleLocation;
    }
}