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
        private readonly IBuybackProcessor buybackResultProcessor;

        public BuybackResultController(IRepositoryService repositoryService, IBuybackProcessor buybackResultProcessor)
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
        public int Post([FromBody]VehicleWithChoices vehicleWithChoices)
        {
            return buybackResultProcessor.Process(vehicleWithChoices);
        }

        // PUT: api/BuybackResult/
        public bool Put([FromBody]BuybackResult buybackResult)
        {
            return repositoryService.ResultRepository.Update(buybackResult);
        }

        // DELETE: api/BuybackResult/5
        public void Delete(int id)
        {
        }
    }
}
