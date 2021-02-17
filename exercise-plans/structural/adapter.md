# Adapter Pattern

https://refactoring.guru/design-patterns/adapter

## Intent

Adapter is a structural design pattern that allows objects with
incompatible interfaces to collaborate.

## Problem

We have a news application that currently has some pretty annoying
things in the view code. At the moment we're having to deal with every
different case of news item type in the view and instead, we'd like to
simplify this to ensure that we working with a consistent interface.

Your task is to refactor the view code, implementing the adapter pattern
so that we no longer need to implement different behaviours for
different news types in the view, we can simply add to the existing
collection by creating a new service and it's corresponding adapter.
