using System.Collections.Generic;
using System.Web.Http;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Services.Repository;
using ABSBuybackMVCWebAPI.Utilities;

namespace ABSBuybackMVCWebAPI.Controllers
{
    [RoutePrefix("api/buybackresult")]
    public class BuybackResultController : ApiController
    {
        private readonly IRepositoryService repositoryService;
        private readonly IBuybackUpdateProcessor buybackResultProcessor;

        public BuybackResultController(IRepositoryService repositoryService, IBuybackUpdateProcessor buybackResultProcessor)
        {
            this.repositoryService = repositoryService;
            this.buybackResultProcessor = buybackResultProcessor;
        }

        // GET: api/BuybackResult
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/BuybackResult/{reserve:int}/{status:int}
        [Route("{reserve:int}/{status:int}")]
        public IEnumerable<BuybackResult> Get(int reserve, int status)
        {
            return repositoryService.ResultRepository.Get(reserve, status);
        }

        // GET: api/BuybackResult/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/BuybackResult
        public void Post([FromBody]BuybackResult value)
        {
        }

        // PUT: api/BuybackResult/
        public bool Put([FromBody]BuybackResult value)
        {
            if (value.VehicleId.Equals(null))
                return repositoryService.ResultRepository.Update(value);
            return buybackResultProcessor.Process(value);
        }

        // DELETE: api/BuybackResult/5
        public void Delete(int id)
        {
        }
    }
}
