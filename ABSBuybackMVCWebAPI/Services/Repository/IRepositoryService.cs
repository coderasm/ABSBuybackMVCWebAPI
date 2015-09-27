
using ABSBuybackMVCWebAPI.Repositories;

namespace ABSBuybackMVCWebAPI.Services.Repository
{
    public interface IRepositoryService
    {
        IBuybackVehicleRepository VehicleRepository { get; set; }
        IBuybackResultRepository ResultRepository { get; set; }
        IBuybackReasonDescriptionRepository ReasonDescriptionRepository { get; set; }
        IBuybackResultDescritionRepository ResultDescritionRepository { get; set; }
        ISaleLocationRepository LocationRepository { get; set; }
        ISaleFirstRepository SaleFirstRepository { get; set; }
        IStatusDescriptionRepository StatusDescriptionRepository { get; set; }
    }
}
