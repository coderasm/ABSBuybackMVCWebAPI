
namespace ABSBuybackMVCWebAPI.Mapping
{
    public interface IMapToNew<in TSource, out TTarget>
    {
        TTarget Map(TSource source);
    }
}
