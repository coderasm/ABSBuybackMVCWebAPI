
using ABSBuybackMVCWebAPI.Repositories;

namespace ABSBuybackMVCWebAPI.Services.Repository
{
    public interface IRepositoryService
    {
        BuybackRepository BuybackRepository { get; set; }
        IBuybackVehicleRepository VehicleRepository { get; set; }
        IBuybackResultRepository ResultRepository { get; set; }
        IAbsBuybackResultRepository AbsBuybackResultRepository { get; set; }
        IBuybackResultAbsSaleRepository BuybackResultAbsSaleRepository { get; set; }
        IBuybackReasonDescriptionRepository ReasonDescriptionRepository { get; set; }
        IBuybackResultDescritionRepository ResultDescritionRepository { get; set; }
        IGSVRepository GsvRepository { get; set; }
        ISaleLocationRepository LocationRepository { get; set; }
        ISaleFirstRepository SaleFirstRepository { get; set; }
        IStatusDescriptionRepository StatusDescriptionRepository { get; set; }
    }
}
