
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Transactions;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Repositories;
using AutoMapper;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class AbsBuybackUpdater : IAbsBuybackUpdater
    {
        private IBuybackResultRepository buybackResultRepository;
        private IGSVRepository gsvRepository;
        private AbsBuybackResult absBuybackResult;
        private bool success = false;
        private SqlConnection connection;

        public AbsBuybackUpdater(IBuybackResultRepository buybackResultRepository, IGSVRepository gsvRepository)
        {
            this.buybackResultRepository = buybackResultRepository;
            this.gsvRepository = gsvRepository;
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
            var groupSaleVehicle = new GroupSaleVehicle
            {
                VehicleID = absBuybackResult.VehicleId.Value,
                MA = absBuybackResult.Reserve.Value
            };
            return gsvRepository.Update(groupSaleVehicle, connection) &&
                   buybackResultRepository.Update(Mapper.Map<BuybackResult>(absBuybackResult), connection) &&
                   doSaleUpdate();
        }

        private bool doSaleUpdate()
        {
            //TODO: How do we handle sale location changes? Generate a new VID or move the VID to a new saleInstanceId
            return true;
        }
    }
}