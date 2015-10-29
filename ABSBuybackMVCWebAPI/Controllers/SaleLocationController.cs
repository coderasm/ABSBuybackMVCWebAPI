using System.Diagnostics;
using ABSBuybackMVCWebAPI.Models;
using ABSBuybackMVCWebAPI.Services.Repository;
using System.Collections.Generic;
using System.Web.Http;

namespace ABSBuybackMVCWebAPI.Controllers
{
    [RoutePrefix("api/salelocation")]
    public class SaleLocationController : ApiController
    {
        private readonly IRepositoryService repositoryService;

        public SaleLocationController(IRepositoryService repositoryService)
        {
            this.repositoryService = repositoryService;
        }

        // GET: api/SaleLocation
        public IEnumerable<Location> Get()
        {
            return repositoryService.LocationRepository.GetAll();
        }

        [HttpGet]
        [Route("authtest")]
        // GET: api/SaleLocation
        public IHttpActionResult GetAll()
        {
            Debug.Write("AuthenticationType:" + User.Identity.AuthenticationType);
            Debug.Write("IsAuthenticated:" + User.Identity.IsAuthenticated);
            Debug.Write("Name:" + User.Identity.Name);

            if (User.Identity.IsAuthenticated)
            {
                return Ok("Authenticated: " + User.Identity.Name);
            }
            else
            {
                return BadRequest("Not authenticated");
            }
        }

        // GET: api/SaleLocation/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/SaleLocation
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/SaleLocation/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/SaleLocation/5
        public void Delete(int id)
        {
        }
    }
}
