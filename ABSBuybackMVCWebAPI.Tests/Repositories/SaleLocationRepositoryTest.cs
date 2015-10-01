using ABSBuybackMVCWebAPI.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ABSBuybackMVCWebAPI.Tests.Repositories
{
    [TestClass]
    public class SaleLocationRepositoryTest
    {
        private ISaleLocationRepository repository;
        
        [TestInitialize]
        public void Setup()
        {
            repository = new SaleLocationRepository();
        }

        [TestMethod]
        public void SaleLocationObjectsContainSaleInstanceIdLists()
        {
            var saleLocations = repository.GetAll();
            Assert.AreEqual(saleLocations.Count, 9);
        }
    }
}
