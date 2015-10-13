using ABSBuybackMVCWebAPI.Repositories;

namespace ABSBuybackMVCWebAPI.Services.Repository
{
    class RepositoryService : IRepositoryService
    {
        public IBuybackVehicleRepository VehicleRepository
        {
            get
            {
                return new BuybackVehicleRepository();
            }
            set
            {
                throw new System.NotImplementedException();
            }
        }

        public IBuybackReasonDescriptionRepository ReasonDescriptionRepository
        {
            get
            {
                return new BuybackReasonDescriptionRepository();
            }
            set
            {
                throw new System.NotImplementedException();
            }
        }

        public IBuybackResultDescritionRepository ResultDescritionRepository
        {
            get
            {
                return new BuybackResultDescriptionRepository();
            }
            set
            {
                throw new System.NotImplementedException();
            }
        }


        public ISaleLocationRepository LocationRepository
        {
            get
            {
                return new SaleLocationRepository();
            }
            set
            {
                throw new System.NotImplementedException();
            }
        }


        public ISaleFirstRepository SaleFirstRepository
        {
            get
            {
                return new SaleFirstRepository();
            }
            set
            {
                throw new System.NotImplementedException();
            }
        }


        public IBuybackResultRepository ResultRepository
        {
            get
            {
                return new BuybackResultRepository();
            }
            set
            {
                throw new System.NotImplementedException();
            }
        }


        public IStatusDescriptionRepository StatusDescriptionRepository
        {
            get
            {
                return new StatusDescriptionRepository();
            }
            set
            {
                throw new System.NotImplementedException();
            }
        }


        public IAbsBuybackResultRepository AbsBuybackResultRepository
        {
            get
            {
                return new AbsBuyBackResultRepository();
            }
            set
            {
                throw new System.NotImplementedException();
            }
        }

        public IBuybackResultAbsSaleRepository BuybackResultAbsSaleRepository
        {
            get
            {
                return new BuybackResultAbsSaleRepository();
            }
            set
            {
                throw new System.NotImplementedException();
            }
        }
    }
}
