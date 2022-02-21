# Dependency Inversion

## Intent

The purpose of this pattern is to rely on an interface rather that a
concrete representation of set of methods, which allow you to then write
alternate implementation details, which can be useful for testing
purposes.

## Problem

We've got some application logic that is mixing the `domain logic` and
the `implementation details` of the API in the same class. The issue
is, that in a months time, we will no longer be able to rely on the
API because it is being deprecated, and instead, we'll need to rely on
an internal database as the source of truth.

## Expected Outcomes

* refactor the code so that the domain logic can be tested
  independently of the implementation details of the API, ensuring that
  all the tests still pass
* create the implementation detail of the database
* swap the new database implementation into the domain logic when the
  application runs
