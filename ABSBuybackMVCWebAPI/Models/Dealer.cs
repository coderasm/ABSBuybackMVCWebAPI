
using System;

namespace ABSBuybackMVCWebAPI.Models
{
    public class Dealer : IEquatable<Dealer>
    {
        public string DealerId { get; set; }
        public string Name { get; set; }

        public bool Equals(Dealer other)
        {
            if (other == null) return false;
            return other == this || DealerId.Equals(other.DealerId);
        }

        public override int GetHashCode()
        {
            return DealerId == null ? 0 : DealerId.GetHashCode();
        }
    }
}
