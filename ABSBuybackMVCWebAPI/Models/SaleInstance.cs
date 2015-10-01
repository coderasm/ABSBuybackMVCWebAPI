
using System;
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Models
{
    [Table("GroupSaleInstance")]
    public class SaleInstance
    {
        [Key]
        public int SaleInstanceId { get; set; }
        public DateTime? SaleFirstDate { get; set; }
        public DateTime? SaleEndDate { get; set; }
    }
}