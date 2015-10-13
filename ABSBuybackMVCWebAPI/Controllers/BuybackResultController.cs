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
        public IEnumerable<BuybackResult> Get()
        {
            return repositoryService.ResultRepository.GetAll();
        }

        // GET: api/BuybackResult/paged/pageSize/pageNumber
        [Route("paged/{pageSize:int}/{pageNumber:int}")]
        public IEnumerable<BuybackResult> Get(int pageSize, int pageNumber)
        {
            return repositoryService.ResultRepository.Paged(pageSize, pageNumber);
        }

        // GET: api/BuybackResult/5
        [Route({"{id:int}")]
        public BuybackResult Get(int id)
        {
            return repositoryService.ResultRepository.Get(id);
        }

        // GET: api/BuybackResult/search
        [Route("search")]
        public IEnumerable<BuybackResult> Post([FromBody] BuybackResultQuery queryObject)
        {
            return repositoryService.ResultRepository.Search(queryObject);
        }

        // GET: api/BuybackResult/search/pageSize/pageNumber
        [Route("search/{pageNumber:int}/{pageSize:int}")]
        public IEnumerable<BuybackResult> Post(int pageSize, int pageNumber, [FromBody] BuybackResultQuery queryObject)
        {
            return repositoryService.ResultRepository.SearchPaged(queryObject, pageSize, pageNumber);
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
