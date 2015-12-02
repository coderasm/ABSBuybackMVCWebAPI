
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class TransportNoteQueryProcessorFactory : ITransportNoteQueryProcessorFactory
    {
        public ITransportNoteQueryProcessor Create(TransportNoteQuery transportNoteQuery)
        {
            return TransportNoteQueryProcessor.Instance(transportNoteQuery);
        }
    }
}