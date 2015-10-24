
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Transactions;
using ABSBuybackMVCWebAPI.Mapping;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Repositories;
using AutoMapper;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class AbsBuybackUpdater : IAbsBuybackUpdater
    {
        private IBuybackResultRepository buybackResultRepository;
        private IGSVRepository gsvRepository;
        private IMapToExisting<AbsBuybackResult, GroupSaleVehicle> gsvMapper; 
        private AbsBuybackResult absBuybackResult;
        private bool success = false;
        private SqlConnection connection;

        public AbsBuybackUpdater(IBuybackResultRepository buybackResultRepository, IGSVRepository gsvRepository, IMapToExisting<AbsBuybackResult, GroupSaleVehicle> gsvMapper)
        {
            this.buybackResultRepository = buybackResultRepository;
            this.gsvRepository = gsvRepository;
            this.gsvMapper = gsvMapper;
        }

        public bool Process(AbsBuybackResult absBuybackResult)
        {
            this.absBuybackResult = absBuybackResult;
            using (var transaction = new TransactionScope())
            {
                using (connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
                {
                    doProcess();
                }
                transaction.Complete();
            }
            return success;
        }

        private void doProcess()
        {
            try
            {
                if (!CouldUpdate())
                    success = false;
            }
            catch (TransactionAbortedException exception)
            {
                Console.WriteLine("TransactionAbortedException Message: {0}", exception.Message);
            }
        }

        private bool CouldUpdate()
        {
            
            var buybackUpdateResult = buybackResultRepository.Update(Mapper.Map<BuybackResult>(absBuybackResult), connection);
            if (absBuybackResult.VehicleId != null)
            {
                var groupSaleVehicle = gsvRepository.Get(absBuybackResult.VehicleId.Value, connection);
                gsvMapper.Map(absBuybackResult, groupSaleVehicle);
                return gsvRepository.Update(groupSaleVehicle, connection) && buybackUpdateResult;
            }
            return buybackUpdateResult;
        }
    }
}