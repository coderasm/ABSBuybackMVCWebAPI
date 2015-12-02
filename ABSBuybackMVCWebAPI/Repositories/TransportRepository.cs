
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ABSBuybackMVCWebAPI.Models;
using Dapper;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public class TransportRepository : ITransportRepository
    {
        private const string @select = @"";

        private string @where = @"";

        private const string orderBy = @"";

        private ITransportNoteRepository noteRepository;

        public TransportRepository(ITransportNoteRepository noteRepository)
        {
            this.noteRepository = noteRepository;
        }
        
        public List<Transport> GetAll()
        {
            return GetAll((int)TransportOrderFields.Buyer);
        }

        public List<Transport> GetAll(int orderBy)
        {
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                var transports = connection.Query<Transport>("usp_EXT_SEL_LTScreen_Refactored", new { pOrder = orderBy }, commandType: CommandType.StoredProcedure);
                return FindAndAttachNotes(transports.ToList()).ToList();
            }
        }

        private IEnumerable<Transport> FindAndAttachNotes(List<Transport> transports)
        {
            transports.ForEach(t => t.Notes = noteRepository.Search(new TransportNoteQuery
            {
                VehicleId = t.VID
            }));
            return transports;
        }

        public Transport Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public int Insert(Transport poco)
        {
            throw new System.NotImplementedException();
        }

        public bool Update(Transport poco)
        {
            throw new System.NotImplementedException();
        }

        public int Delete(Transport poco)
        {
            throw new System.NotImplementedException();
        }

        private string FormQuery()
        {
            return @select + @where + orderBy;
        }
    }

    enum TransportOrderFields
    {
        Buyer = 0,
        Seller = 1,
        LateShipped = 2,
        LateReceived = 3,
        BoughtFrom = 4,
        ShipTo = 5,
        LastReleased = 6
    }
}