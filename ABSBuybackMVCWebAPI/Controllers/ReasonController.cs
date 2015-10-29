
using System.Collections.Generic;
using System.Web.Http;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Services.Repository;

namespace ABSBuybackMVCWebAPI.Controllers
{
    [RoutePrefix("api/reason")]
    public class ReasonController : ApiController
    {
        private readonly IRepositoryService repositoryService;

        public ReasonController(IRepositoryService repositoryService)
        {
            this.repositoryService = repositoryService;
        }

        // GET: api/Reason
        public IEnumerable<BuybackReasonDescription> Get()
        {
            return repositoryService.ReasonDescriptionRepository.GetAll();
        }

        // GET: api/Reason/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Reason
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Reason/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Reason/5
        public void Delete(int id)
        {
        }
    }
}
