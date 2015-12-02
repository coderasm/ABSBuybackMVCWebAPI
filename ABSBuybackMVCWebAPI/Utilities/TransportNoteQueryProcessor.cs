
using System;
using ABSBuybackMVCWebAPI.Models;

namespace ABSBuybackMVCWebAPI.Utilities
{
    public class TransportNoteQueryProcessor : ITransportNoteQueryProcessor
    {
        private readonly TransportNoteQuery transportNoteQuery;
        private string WherePredicate = "";
        private const string VehicleIdPredicateTemplate = @" AND VehicleId = {0}";

        private TransportNoteQueryProcessor(TransportNoteQuery transportNoteQuery)
        {
            this.transportNoteQuery = transportNoteQuery;
        }

        public static TransportNoteQueryProcessor Instance(TransportNoteQuery transportNoteQuery)
        {
            return new TransportNoteQueryProcessor(transportNoteQuery);
        }

        public string ProcessAll()
        {
            WherePredicate = "";
            ProcessVehicleId();
            return WherePredicate;
        }

        public string ProcessVehicleId()
        {
            var predicate = transportNoteQuery.VehicleId != null ? FormatVehicleIdPredicate(transportNoteQuery.VehicleId.Value) : "";
            WherePredicate += predicate;
            return predicate;
        }

        private static string FormatVehicleIdPredicate(int vehicleId)
        {
            return String.Format(VehicleIdPredicateTemplate, vehicleId);
        }
    }
}