
using System.Collections.Generic;
using System.Web.Http;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Services.Repository;

namespace ABSBuybackMVCWebAPI.Controllers
{
    [RoutePrefix("api/buybackvehicle")]
    public class BuybackVehicleController : ApiController
    {
        private readonly IRepositoryService repositoryService;

        public BuybackVehicleController(IRepositoryService repositoryService)
        {
            this.repositoryService = repositoryService;
        }

        // GET: api/BuybackVehicle
        public IEnumerable<BuybackVehicle> Get()
        {
            return repositoryService.VehicleRepository.GetAll();
        }

        // GET: api/BuybackVehicle/5
        public string Get(int id)
        {
            return "value";
        }

        // GET: api/BuybackVehicle/search
        [Route("search")]
        public IEnumerable<BuybackVehicle> Get([FromBody] BuybackVehicleQuery queryObject)
        {
            return repositoryService.VehicleRepository.Search(queryObject);
        }

        // POST: api/BuybackVehicle
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/BuybackVehicle/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/BuybackVehicle/5
        public void Delete(int id)
        {
        }
    }
}
