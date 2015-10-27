
using System.Collections.Generic;
using System.Web.Http;
using ABSBuybackMVCWebAPI.Services.Repository;
using ABSBuybackMVCWebAPI.Utilities;
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Controllers
{
    [Authorize]
    [RoutePrefix("api/absbuybackresult")]
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
        public IEnumerable<AbsBuybackResult> Get()
        {
            return repositoryService.AbsBuybackResultRepository.GetAll();
        }

        // GET: api/AbsBuybackResult/paged/pageSize/pageNumber
        [Route("paged/{pageSize:int}/{pageNumber:int}")]
        public IEnumerable<AbsBuybackResult> Get(int pageSize, int pageNumber)
        {
            return repositoryService.AbsBuybackResultRepository.Paged(pageSize, pageNumber);
        }

        // GET: api/AbsBuybackResult/5
        [Route("{id:int}")]
        public AbsBuybackResult Get(int id)
        {
            return repositoryService.AbsBuybackResultRepository.Get(id);
        }

        // GET: api/AbsBuybackResult/search
        [Route("search")]
        public IEnumerable<AbsBuybackResult> Post([FromBody] AbsBuybackResultQuery queryObject)
        {
            return repositoryService.AbsBuybackResultRepository.Search(queryObject);
        }

        // GET: api/AbsBuybackResult/search/pageSize/pageNumber
        [Route("search/{pageNumber:int}/{pageSize:int}")]
        public IEnumerable<AbsBuybackResult> Post(int pageSize, int pageNumber, [FromBody] AbsBuybackResultQuery queryObject)
        {
            return repositoryService.AbsBuybackResultRepository.SearchPaged(queryObject, pageSize, pageNumber);
        }

        // POST: api/AbsBuybackResult
        public int Post([FromBody] AbsVehicleWithChoices absVehicleWithChoices)
        {
            return absBuybackProcessor.ProcessInsert(absVehicleWithChoices);
        }

        // PUT: api/AbsBuybackResult
        public bool Put([FromBody]AbsBuybackResult absBuybackResult)
        {
            return absBuybackProcessor.ProcessUpdate(absBuybackResult);
        }

        // DELETE: api/AbsBuybackResult/5
        public void Delete(int id)
        {
        }
    }
}
