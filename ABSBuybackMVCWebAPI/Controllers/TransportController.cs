using System.Collections.Generic;
using System.Web.Http;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Repositories;

namespace ABSBuybackMVCWebAPI.Controllers
{
    public class TransportController : ApiController
    {
        private readonly ITransportRepository transportRepository;

        public TransportController(ITransportRepository transportRepository)
        {
            this.transportRepository = transportRepository;
        }

        // GET: api/Transport
        public IEnumerable<Transport> Get()
        {
            return transportRepository.GetAll();
        }

        // GET: api/Transport/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Transport
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Transport/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Transport/5
        public void Delete(int id)
        {
        } 
    }
}
