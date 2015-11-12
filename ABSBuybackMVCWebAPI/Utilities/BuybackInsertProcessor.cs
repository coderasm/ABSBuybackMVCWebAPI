
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Transactions;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Repositories;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class BuybackInsertProcessor : IBuybackProcessor
    {
        private IBuybackResultRepository buybackResultRepository;
        private IBuybackRepository buybackRepository;
        private BuybackVehicle vehicle;
        private int buybackId = 0;
        private SqlConnection connection;

        public BuybackInsertProcessor(IBuybackResultRepository buybackResultRepository, IBuybackRepository buybackRepository)
        {
            this.buybackResultRepository = buybackResultRepository;
            this.buybackRepository = buybackRepository;
        }

        public int Process(BuybackVehicle BuybackVehicle)
        {
            this.vehicle = BuybackVehicle;
            using (var transaction = new TransactionScope())
            {
                using (connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
                {
                    doProcess();
                }
                transaction.Complete();
            }
            return buybackId;
        }

        private void doProcess()
        {
            try
            {
                buybackId = createBuyback();
                createBuybackResult(buybackId);
            }
            catch (TransactionAbortedException exception)
            {
                Console.WriteLine("TransactionAbortedException Message: {0}", exception.Message);
            }
        }

        private int createBuyback()
        {
            return buybackRepository.Insert(new Buyback
            {
                ReasonId = vehicle.ReasonId.Value,
                VehicleIdOriginal = vehicle.VehicleId
            }, connection);
        }

        private void createBuybackResult(int buybackId)
        {
            buybackResultRepository.Insert(new BuybackResult
            {
                Reserve = vehicle.Reserve,
                ResultDescriptionId = vehicle.ResultDescriptionId.Value,
                BuybackId = buybackId
            }, connection);
        }
    }
}