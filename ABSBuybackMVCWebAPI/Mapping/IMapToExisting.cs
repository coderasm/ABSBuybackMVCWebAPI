

namespace ABSBuybackMVCWebAPI.Mapping
{
    public interface IMapToExisting<in TSource, in TTarget>
    {
        void Map(TSource source, TTarget target);
    }
}
