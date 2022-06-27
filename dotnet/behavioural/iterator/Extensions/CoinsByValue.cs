using Iterator.Models;

namespace Iterator.Extensions;

public static partial class Extensions
{
    public static List<Coin> CoinsByValue(this List<Coin> Coins)
    {
        return Coins
            .OrderByDescending(c => c.ValueInCents)
            .ToList();
    }
}