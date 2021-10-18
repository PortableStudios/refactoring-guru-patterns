# Proxy

[refactoring.guru/design-patterns/proxy](https://refactoring.guru/design-patterns/proxy)

## Intent

**Proxy** is a structural design pattern that lets you provide a substitute or placeholder
for another object. A proxy controls access to the original object, allowing you
to perform something either before or after the request gets through to the
original object.

## Problem

We have a very simple service that is responsible for serving the latest news, and therefore must be really performant. However, this depends on a service where the minimum response time is 5 seconds!

How can we use the proxy design pattern to allow for more speedy access to the data without creating a bottleneck in our system?