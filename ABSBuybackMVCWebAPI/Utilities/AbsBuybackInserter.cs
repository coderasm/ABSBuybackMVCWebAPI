
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
        private BuybackVehicle vehicle;
        private int buybackId;
        private int buybackResultId;
        private int? vehicleId;
        private SqlConnection connection;

        public AbsBuybackInserter(IRepositoryService repositoryService)
        {
            this.repositoryService = repositoryService;
        }

        public int Process(BuybackVehicle vehicle)
        {
            this.vehicle = vehicle;
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
                vehicleId = createVehicle();
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
                ReasonId = vehicle.ReasonId.Value,
                VehicleIdOriginal = vehicle.VehicleId
            }, connection);
        }

        private int createBuybackResult(int buybackId)
        {
            return repositoryService.ResultRepository.Insert(new BuybackResult
            {
                Reserve = vehicle.Reserve,
                ResultDescriptionId = vehicle.ResultDescriptionId.Value,
                BuybackId = buybackId
            }, connection);
        }

        private int? createVehicle()
        {
            if (vehicle.SaleInstanceId == null)
                return null;
            var fullVehicle = prepareVehicle();
            return repositoryService.GsvRepository.Insert(fullVehicle, connection);
        }

        private GroupSaleVehicle prepareVehicle()
        {
            var fullVehicle = repositoryService.GsvRepository.Get(vehicle.VehicleId, connection);
            fullVehicle.ma = vehicle.Reserve;
            fullVehicle.SaleInstanceId = vehicle.SaleInstanceId.Value;
            return fullVehicle;
        }

        private void createBuybackResultAbsSale()
        {
            repositoryService.BuybackResultAbsSaleRepository.Insert(new BuybackResultAbsSale
            {
                BuybackResultId = buybackResultId,
                SaleId = vehicle.SaleId,
                VehicleId = vehicleId
            }, connection);
        }
    }
}