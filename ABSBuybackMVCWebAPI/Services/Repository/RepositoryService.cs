using System;
using ABSBuybackMVCWebAPI.Mapping;
using ABSBuybackMVCWebAPI.Repositories;
using ABSBuybackMVCWebAPI.Utilities;

namespace ABSBuybackMVCWebAPI.Services.Repository
{
    class RepositoryService : IRepositoryService
    {
        public IBuybackVehicleRepository VehicleRepository
        {
            get
            {
                return new BuybackVehicleRepository(new BuybackVehicleQueryProcessorFactory());
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
                return new BuybackResultRepository(new BuybackQueryProcessorFactory());
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
                return new AbsBuybackResultRepository(new AbsBuybackQueryProcessorFactory());
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

        public BuybackRepository BuybackRepository
        {
            get
            {
                return new BuybackRepository();
            }

            set
            {
                throw new NotImplementedException();
            }
        }

        public IGSVRepository GsvRepository
        {
            get
            {
                return new GsvRepository(new GSVMapper());
            }

            set
            {
                throw new NotImplementedException();
            }
        }
    }
}
