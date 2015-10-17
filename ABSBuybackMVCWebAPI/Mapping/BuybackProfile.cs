using ABSBuybackMVCWebAPI.Models;
using AutoMapper;

namespace ABSBuybackMVCWebAPI.Mapping
{
    public class BuybackProfile : Profile
    {
        protected override void Configure()
        {
            base.Configure();
            Mapper.CreateMap<AbsBuybackResult, BuybackResult>();
            Mapper.CreateMap<AbsBuybackResultQuery, BuybackResultQuery>();
        }
    }
}