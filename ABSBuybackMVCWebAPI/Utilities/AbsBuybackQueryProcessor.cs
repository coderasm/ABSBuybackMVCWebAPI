
using ABSBuybackMVCWebAPI.Models;
using AutoMapper;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class AbsBuybackQueryProcessor : IAbsBuybackQueryProcessor
    {
        private AbsBuybackResultQuery absBuybackResultQuery;
        private readonly IBuybackQueryProcessor buybackQueryProcessor;
        private string WherePredicate = "";

        private AbsBuybackQueryProcessor(AbsBuybackResultQuery absBuybackResultQuery, IBuybackQueryProcessor buybackQueryProcessor)
        {
            this.absBuybackResultQuery = absBuybackResultQuery;
            this.buybackQueryProcessor = buybackQueryProcessor;
        }

        public static AbsBuybackQueryProcessor Instance(AbsBuybackResultQuery absBuybackResultQuery)
        {
            var buybackResultQuery = Mapper.Map<BuybackResultQuery>(absBuybackResultQuery);
            return new AbsBuybackQueryProcessor(absBuybackResultQuery, BuybackQueryProcessor.Instance(buybackResultQuery));
        }

        public string ProcessAll()
        {
            WherePredicate = buybackQueryProcessor.ProcessAll();
            return WherePredicate;
        }


        public string ProcessSaleOption()
        {
            var predicate = buybackQueryProcessor.ProcessSaleOption();
            WherePredicate += predicate;
            return predicate;
        }

        public string ProcessStatus()
        {
            var predicate = buybackQueryProcessor.ProcessStatus();
            WherePredicate += predicate;
            return predicate;
        }

        public string ProcessReserve()
        {
            var predicate = buybackQueryProcessor.ProcessReserve();
            WherePredicate += predicate;
            return predicate;
        }
    }
}