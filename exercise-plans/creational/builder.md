# Adapter Pattern

https://refactoring.guru/design-patterns/builder

## Intent

The builder designer patterns allows you to build up a complex object
piece by piece.

## Problem

Our news service calls an API to fetch news, there are options to filter, 
sort, and authenticated requests. Building the request object for each
service call is getting messy with some duplication.

Your task is to refactor the view code, implementing the builder pattern
so that each News Request objects is clearly defined and easy to read.
