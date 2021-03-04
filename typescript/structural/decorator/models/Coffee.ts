/**
 * Price List
 *
 * InstantCoffee - 1.0
 * RoastedCoffee - 1.2
 * Milk - 0.5
 * Sugar - 0.25
 */
export default interface Coffee {  
  cost(): number
  
  description(): string
}
