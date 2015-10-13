
using System.Collections.Generic;
using System.Web.Http;
using ABSBuybackMVCWebAPI.Services.Repository;
using ABSBuybackMVCWebAPI.Utilities;

namespace ABSBuybackMVCWebAPI.Controllers
{
    public class AbsBuybackResultController : ApiController
    {
        private readonly IRepositoryService repositoryService;
        private readonly IAbsBuybackProcessor absBuybackProcessor;

        public AbsBuybackResultController(IRepositoryService repositoryService, IAbsBuybackProcessor absBuybackProcessor)
        {
            this.repositoryService = repositoryService;
            this.absBuybackProcessor = absBuybackProcessor;
        }

        // GET: api/AbsBuybackResult
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/AbsBuybackResult/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/AbsBuybackResult
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/AbsBuybackResult/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/AbsBuybackResult/5
        public void Delete(int id)
        {
        }
    }
}
