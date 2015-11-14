export let nonAbsBuybackResultFunctions = {
    update: function update(buybackresult) {
        return this.repositoryService.BuybackResultRepository.update(buybackResult);
    },
    sale: function sale(sales)
    {
        for(let sale of sales)
            if (sale.ResultDescriptionId === this.ResultDescriptionId)
                return sale.ResultDescription;
    }
}