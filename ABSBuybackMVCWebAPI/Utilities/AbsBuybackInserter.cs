
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Transactions;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Services.Repository;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class AbsBuybackInserter : IAbsBuybackInserter
    {
        private readonly IRepositoryService repositoryService;
        private AbsVehicleWithChoices absVehicleWithChoices;
        private int buybackId = 0;
        private int buybackResultId = 0;
        private int? vehicleId = 0;
        private SqlConnection connection;

        public AbsBuybackInserter(IRepositoryService repositoryService)
        {
            this.repositoryService = repositoryService;
        }

        public int Process(AbsVehicleWithChoices absVehicleWithChoices)
        {
            this.absVehicleWithChoices = absVehicleWithChoices;
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
                buybackResultId = createBuybackResult(buybackId);
                vehicleId = createVehicle().Value;
                createBuybackResultAbsSale();
            }
            catch (TransactionAbortedException exception)
            {
                Console.WriteLine("TransactionAbortedException Message: {0}", exception.Message);
            }
        }

        private int createBuyback()
        {
            return repositoryService.BuybackRepository.Insert(new Buyback
            {
                ReasonId = absVehicleWithChoices.ReasonId,
                VehicleIdOriginal = absVehicleWithChoices.Vehicle.VehicleId
            }, connection);
        }

        private int createBuybackResult(int buybackId)
        {
            return repositoryService.ResultRepository.Insert(new BuybackResult
            {
                Reserve = absVehicleWithChoices.Vehicle.Reserve,
                ResultDescriptionId = absVehicleWithChoices.ResultDescriptionId,
                BuybackId = buybackId
            }, connection);
        }

        private int? createVehicle()
        {
            if (absVehicleWithChoices.SaleInstanceId == null)
                return null;
            //TODO: create entry in gsv using gsv repository
            return repositoryService.GsvRepository.Insert(new GroupSaleVehicle
            {
                MA = absVehicleWithChoices.Vehicle.Reserve.Value,
                VehicleID = absVehicleWithChoices.Vehicle.VehicleId
            }, connection);
        }

        private void createBuybackResultAbsSale()
        {
            repositoryService.BuybackResultAbsSaleRepository.Insert(new BuybackResultAbsSale
            {
                BuybackResultId = buybackResultId,
                SaleId = absVehicleWithChoices.SaleId,
                VehicleId = absVehicleWithChoices.Vehicle.VehicleId
            }, connection);
        }
    }
}