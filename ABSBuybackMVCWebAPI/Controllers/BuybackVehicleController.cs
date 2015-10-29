
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

        // GET: api/BuybackVehicle/paged/pageSize/pageNumber
        [Route("paged/{pageSize:int}/{pageNumber:int}")]
        public IEnumerable<BuybackVehicle> Get(int pageSize, int pageNumber)
        {
            return repositoryService.VehicleRepository.Paged(pageSize,pageNumber);
        }

        // GET: api/BuybackVehicle/5
        public BuybackVehicle Get(int id)
        {
            return repositoryService.VehicleRepository.Get(id);
        }

        // GET: api/BuybackVehicle/search
        [Route("search")]
        public IEnumerable<BuybackVehicle> Post([FromBody] BuybackVehicleQuery queryObject)
        {
            return repositoryService.VehicleRepository.Search(queryObject);
        }

        // GET: api/BuybackVehicle/search/pageSize/pageNumber
        [Route("search/{pageNumber:int}/{pageSize:int}")]
        public IEnumerable<BuybackVehicle> Post(int pageSize, int pageNumber, [FromBody] BuybackVehicleQuery queryObject)
        {
            return repositoryService.VehicleRepository.SearchPaged(queryObject, pageSize, pageNumber);
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
