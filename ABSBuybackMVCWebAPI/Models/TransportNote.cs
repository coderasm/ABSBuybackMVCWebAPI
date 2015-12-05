
using System;
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Models
{
    [Table("UserNotes")]
    public class TransportNote
    {
        [Key]
        public int UserNoteID { get; set; }
        public int VehicleID { get; set; }
        public string UserNote { get; set; }
        public DateTime CreatedDT { get; set; }
        public string CreatedBy { get; set; }
    }
}