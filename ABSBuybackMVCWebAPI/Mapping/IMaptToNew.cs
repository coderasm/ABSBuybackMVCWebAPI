
namespace ABSBuybackMVCWebAPI.Mapping
{
    public interface IMaptToNew<in TSource, out TTarget>
    {
        TTarget Map(TSource source);
    }
}
