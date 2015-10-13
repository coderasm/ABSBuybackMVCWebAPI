
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
        private VehicleWithChoices vehicleWithChoices;
        private int buybackId = 0;
        private SqlConnection connection;

        public BuybackInsertProcessor(IBuybackResultRepository buybackResultRepository, IBuybackRepository buybackRepository)
        {
            this.buybackResultRepository = buybackResultRepository;
            this.buybackRepository = buybackRepository;
        }

        public int Process(VehicleWithChoices vehicleWithChoices)
        {
            this.vehicleWithChoices = vehicleWithChoices;
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
                ReasonId = vehicleWithChoices.ReasonId,
                VehicleIdOriginal = vehicleWithChoices.Vehicle.VehicleId
            }, connection);
        }

        private void createBuybackResult(int buybackId)
        {
            buybackResultRepository.Insert(new BuybackResult
            {
                Reserve = vehicleWithChoices.Vehicle.Reserve,
                ResultDescriptionId = vehicleWithChoices.ResultDescriptionId,
                BuybackId = buybackId
            }, connection);
        }
    }
}