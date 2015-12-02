
using System;
using Dapper.Contrib.Extensions;

namespace ABSBuybackMVCWebAPI.Models
{
    [Table("UserNotes")]
    public class TransportNote
    {
        [Key]
        public int UserNoteId { get; set; }
        // Type
        public int NoteId { get; set; }
        public int VehicleId { get; set; }
        public string UserNote { get; set; }
        public DateTime CreatedDT { get; set; }
        public string CreatedBy { get; set; }
    }
}