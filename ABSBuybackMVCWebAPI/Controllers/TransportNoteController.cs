using System;
using System.Collections.Generic;
using System.Web.Http;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Repositories;

namespace ABSBuybackMVCWebAPI.Controllers
{
    public class TransportNoteController : ApiController
    {
        private readonly ITransportNoteRepository transportNoteRepository;

        public TransportNoteController(ITransportNoteRepository transportNoteRepository)
        {
            this.transportNoteRepository = transportNoteRepository;
        }

        // GET: api/TransportNote
        public IEnumerable<TransportNote> Get()
        {
            return transportNoteRepository.GetAll();
        }

        // GET: api/TransportNote/5
        public TransportNote Get(int id)
        {
            return transportNoteRepository.Get(id);
        }

        // POST: api/TransportNote
        public int Post(TransportNote note)
        {
            return transportNoteRepository.Insert(note);
        }

        // PUT: api/TransportNote/5
        public void Put(int id, TransportNote note)
        {
            throw new NotImplementedException();
        }

        // DELETE: api/TransportNote/5
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
