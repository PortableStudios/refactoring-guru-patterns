using Iterator.Extensions;
using Iterator.Factories;
using Iterator.Models;

namespace Iterator.Services;
public static class CoinService
{
    public static void RunDemo()
    {
        var coins = CoinFactory.Create();

        Console.WriteLine("CoinsByValue");
        foreach(var Coin in coins.CoinsByValue())
        {
            Console.WriteLine(Coin.ValueInCents);
        }

        // TODO: Implement this...
        //Console.WriteLine("CoinsBySize");
    }
}