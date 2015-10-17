using AutoMapper;

namespace ABSBuybackMVCWebAPI.Mapping
{
    public static class AutoMapperConfig
    {
        public static void Configure()
        {
            Mapper.Initialize(cfg =>
                cfg.AddProfile<BuybackProfile>());
        }
    }
}