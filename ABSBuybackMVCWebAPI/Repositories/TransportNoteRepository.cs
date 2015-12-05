
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Utilities;
using Dapper;
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Repositories
{
    public class TransportNoteRepository : ITransportNoteRepository
    {

        private const string Select = @"SELECT 
	                                        * 
                                        FROM 
	                                        usernotes";

        const string insertTemplate = "INSERT INTO UserNotes VALUES(3,@VehicleID,@UserNote,@CreatedDT,@CreatedBy,DEFAULT)";
        private const string SelectPaged = @"";
        private const string WhereTemplate = @" WHERE NoteID = 3{0}";
        private string WherePredicate = "";
        private const string OrderBy = @" ORDER BY CreatedDT DESC";
        private readonly ITransportNoteQueryProcessorFactory TransportNoteQueryProcessorFactory;

        public TransportNoteRepository(ITransportNoteQueryProcessorFactory transportNoteQueryProcessorFactory)
        {
            this.TransportNoteQueryProcessorFactory = transportNoteQueryProcessorFactory;
        }

        public List<TransportNote> GetAll()
        {
            var query = FormQuery();
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<TransportNote>(query).ToList();
            }
        }

        private string FormQuery()
        {
            return Select + String.Format(WhereTemplate, WherePredicate) + OrderBy;
        }

        public TransportNote Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public int Insert(TransportNote poco)
        {
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Execute(insertTemplate, poco);
            }
        }

        public int Insert(TransportNote poco, IDbTransaction transaction)
        {
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Execute(insertTemplate, poco, transaction);
            }
        }

        public bool Update(TransportNote poco)
        {
            throw new System.NotImplementedException();
        }

        public int Delete(TransportNote poco)
        {
            throw new System.NotImplementedException();
        }

        public List<TransportNote> Search(TransportNoteQuery queryObject)
        {
            WherePredicate = TransportNoteQueryProcessorFactory.Create(queryObject).ProcessAll();
            var query = FormQuery();
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ABS-SQL"].ConnectionString))
            {
                return connection.Query<TransportNote>(query).ToList();
            }
        }
    }
}