
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public interface ITransportNoteQueryProcessorFactory
    {
        ITransportNoteQueryProcessor Create(TransportNoteQuery transportNoteQuery);
    }
}
