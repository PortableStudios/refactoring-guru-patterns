# Decorator

[refactoring.guru/design-patterns/decorator](https://refactoring.guru/design-patterns/decorator)

## Intent

**Decorator** is a structural design pattern that lets you attach new behaviors to objects by placing these objects
inside special wrapper objects that contain the behaviors.

## Problem

We have a small but growing coffee shop that currently has some pretty annoying customers in the controller code.
At the moment we're having to create concrete classes for every possible combination of coffee order and instead,
we'd like to simplify this so coffee orders can be decorated with "ad ons".

Your task is to refactor the controller code, implementing the decorator pattern so that we no longer need to create
new concrete clesses for new coffee orders, we can simply create decorators and by composing them in the way we need to
create new coffee orders.

## Expected Outcomes

* Identify that your business domain can be represented as a primary component with multiple optional layers
* Identify the common methods to both the primary component and the optional layers
* Create decorators and compose them in the way you need
