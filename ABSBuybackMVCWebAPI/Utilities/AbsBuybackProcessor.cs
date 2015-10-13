
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class AbsBuybackProcessor : IAbsBuybackProcessor
    {
        private readonly IAbsBuybackInserter absBuybackInserter;
        private readonly IAbsBuybackUpdater absBuybackUpdater;

        public AbsBuybackProcessor(IAbsBuybackInserter absBuybackInserter, IAbsBuybackUpdater absBuybackUpdater)
        {
            this.absBuybackInserter = absBuybackInserter;
            this.absBuybackUpdater = absBuybackUpdater;
        }

        public bool ProcessUpdate(AbsBuybackResult absBuybackResult)
        {
            return absBuybackUpdater.Process(absBuybackResult);
        }

        public int ProcessInsert(AbsVehicleWithChoices absVehicleWithChoices)
        {
            return absBuybackInserter.Process(absVehicleWithChoices);
        }
    }
}