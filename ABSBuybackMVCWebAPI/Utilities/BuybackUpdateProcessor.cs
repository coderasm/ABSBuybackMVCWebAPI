
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Transactions;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Repositories;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class BuybackUpdateProcessor : IBuybackUpdateProcessor
    {
        private IBuybackResultRepository buybackResultRepository;
        private IGSVRepository gsvRepository;
        private bool success = false;
        private SqlConnection connection;

        public BuybackUpdateProcessor(IBuybackResultRepository buybackResultRepository, IGSVRepository gsvRepository)
        {
            this.buybackResultRepository = buybackResultRepository;
            this.gsvRepository = gsvRepository;
        }

        public bool Process(BuybackResult buybackResult)
        {
            using (var transaction = new TransactionScope())
            {
                using (connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
                {
                    doProcess(buybackResult);
                }
                transaction.Complete();
            }
            return success;
        }

        private void doProcess(BuybackResult buybackResult)
        {
            try
            {
                if (CouldUpdate(buybackResult))
                    success = false;
            }
            catch (TransactionAbortedException exception)
            {
                Console.WriteLine("TransactionAbortedException Message: {0}", exception.Message);
            }
        }

        private bool CouldUpdate(BuybackResult buybackResult)
        {
            var groupSaleVehicle = new GroupSaleVehicle
            {
                VehicleID = buybackResult.VehicleId.Value,
                MA = buybackResult.Reserve.Value
            };
            return gsvRepository.Update(groupSaleVehicle, connection) && buybackResultRepository.Update(buybackResult, connection);
        }
    }
}