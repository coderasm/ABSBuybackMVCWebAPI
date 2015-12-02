
using System.Collections.Generic;
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public interface ITransportNoteRepository : IBaseRepository<TransportNote>
    {
        List<TransportNote> Search(TransportNoteQuery query);
    }
}
