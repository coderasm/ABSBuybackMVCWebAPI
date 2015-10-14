
using ABSBuybackMVCWebAPI.Models;
using AutoMapper;

namespace ABSBuybackMVCWebAPI.AutoMapper
{
    public static class AutoMapperConfig
    {
        public static void Configure()
        {
            Mapper.CreateMap<AbsBuybackResult, BuybackResult>();
            Mapper.CreateMap<AbsBuybackResultQuery, BuybackResultQuery>();
        }
    }
}