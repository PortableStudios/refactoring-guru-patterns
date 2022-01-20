# Room Booking Allocation Problem

Within the booking application, each booking needs to be allocated a room. The room must be suitable for the type of event, the participants and most not be fully booked already. 

The challenge is that allocate rules change regularly and every change makes the allocation function harder to understand and find bugs.

## The chain of Responsibility (CoR) Pattern

https://refactoring.guru/design-patterns/chain-of-responsibility

Chain of Responsibility is a behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.

## Tasks

* Rewrite the allocateRooms function using the CoR Pattern
* Add a new rule into the chain

## New Rules 

* Add the `{ballpit?: boolean}` flag to Room, and `{withKids?: boolean}` to Allotment. Prefer ballpit rooms if any guest (allotment) is withKids. Prefer: mean it will book if available but fallback to other rooms if not.
* Some rooms are booking using an external system, before they can be allocated, we must call the web api with the number of guests (allotment.length), add `{checkAvailableExternal?: (numberOfGuests: number)=>boolean}` to Room interface
* be creative and make your own rules...

