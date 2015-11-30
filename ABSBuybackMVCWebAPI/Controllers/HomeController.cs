using System.Web.Mvc;

namespace ABSBuybackMVCWebAPI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Extranet";

            return View();
        }
    }
}
