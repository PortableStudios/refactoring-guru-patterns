# Strategy

https://refactoring.guru/design-patterns/strategy

## Intent

Strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.

## Problem

 Our little coffee shop is now 100% automated! Orders come through a touch panel in store or through an app
 on our customers phones. The orders get ingested on one of our servers and the order handler is subscribed to
 any orders that come through. The order handler calls the correct machine, creates the beverage (or fails) and returns
 the relevant order status object, which is then picked up by other services to move the beverage into the customers hands.
 We've got 4 machines which handle different beverages - our super fancy Coffee and Latte maker has a well maintained SDK,
 the EspressoMagix has a nice, but now quite old, library. Our green tea maker is a small wrapper around some API services
 and our TeaMaker is connected via TCP, which is pretty old (but it works)

 The current implementation is fine - it does the job, but with future expansion this file will grow exponentially and worse... we can only run integration tests on it.
 The main entry point you'll need is in handlers/OrderHandler.ts

## Expected Outcomes

 * We want to be able to unit test each machines implementation
 * We want to be able to add machines relatively quickly that adhere to the handlers interface
 * We want to be able to change which machine to use depending on the order coming in
 * We want the developer experience to be better. Adding a new machine should be easy to do, easy to maintain and code reviews should be understandable.
