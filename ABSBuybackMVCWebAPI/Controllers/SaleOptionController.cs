using System.Collections.Generic;
using System.Web.Http;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Services.Repository;

namespace ABSBuybackMVCWebAPI.Controllers
{
    [RoutePrefix("api/saleoption")]
    public class SaleOptionController : ApiController
    {
        private readonly IRepositoryService repositoryService;

        public SaleOptionController(IRepositoryService repositoryService)
        {
            this.repositoryService = repositoryService;
        }

        // GET: api/SaleOption
        public IEnumerable<BuybackResultDescription> Get()
        {
            return repositoryService.ResultDescritionRepository.GetAll();
        }

        // GET: api/SaleOption/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/SaleOption
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/SaleOption/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/SaleOption/5
        public void Delete(int id)
        {
        }
    }
}
