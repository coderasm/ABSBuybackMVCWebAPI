
using System.Collections.Generic;
using System.Web.Http;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Services.Repository;

namespace ABSBuybackMVCWebAPI.Controllers
{
    [Authorize]
    [RoutePrefix("api/buybackstatus")]
    public class BuybackStatusController : ApiController
    {
        private readonly IRepositoryService repositoryService;

        public BuybackStatusController(IRepositoryService repositoryService)
        {
            this.repositoryService = repositoryService;
        }

        // GET: api/Status
        public IEnumerable<BuybackStatus> Get()
        {
            return repositoryService.StatusDescriptionRepository.GetAll();
        }

        // GET: api/Status/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Status
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Status/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Status/5
        public void Delete(int id)
        {
        }
    }
}
