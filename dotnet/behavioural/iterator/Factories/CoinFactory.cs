using Iterator.Models;

namespace Iterator.Factories;

public static class CoinFactory
{
    public static List<Coin> Create()
    {
        return  new List<Coin>()
        {
            new Coin()
            {
                ValueInCents = 1,
                DiameterInMillimetres = 18
            },
            new Coin()
            {
                ValueInCents = 2,
                DiameterInMillimetres = 21.5
            },
            new Coin()
            {
                ValueInCents = 5,
                DiameterInMillimetres = 20
            },
            new Coin()
            {
                ValueInCents = 10,
                DiameterInMillimetres = 24
            },
            new Coin()
            {
                ValueInCents = 20,
                DiameterInMillimetres = 29
            },
            new Coin()
            {
                ValueInCents = 50,
                DiameterInMillimetres = 33
            },
            new Coin()
            {
                ValueInCents = 100,
                DiameterInMillimetres = 25
            },
            new Coin()
            {
                ValueInCents = 200,
                DiameterInMillimetres = 21.5
            },
            new Coin()
            {
                ValueInCents = 500,
                DiameterInMillimetres = 40
            }
        };
    }
}
