Push Pipe
The ngrxPush pipe serves as a drop-in replacement for the async pipe. It contains intelligent handling of change detection to enable us running in zone-full as well as zone-less mode without any changes to the code.

Usage
The ngrxPush pipe is a standalone pipe. To use it, add the PushPipe to the imports of your standalone component or NgModule:

content_copy
import { Component } from '@angular/core';
import { PushPipe } from '@ngrx/component';

@Component({
  // ... other metadata
  standalone: true,
  imports: [
    // ... other imports
    PushPipe,
  ],
})
export class MyStandaloneComponent {}
Comparison with async Pipe
The current way of binding an observable to the view looks like this:

content_copy
<p>{{ number$ | async }}</p>

<ng-container *ngIf="number$ | async as n">{{ n }}</ng-container>

<app-number [number]="number$ | async"></app-number>
The async pipe marks the component and all its ancestors as dirty, but does not trigger the change detection mechanism. It needs the zone.js microtask queue to exhaust until ApplicationRef.tick is called to render all dirty marked components. To use the async pipe in zone-less mode, we have to manually trigger the change detection each time an observable emits a new value.

Fortunately, the ngrxPush pipe solves this problem by scheduling a new change detection cycle in zone-less mode when an observable emits a new value. It can be used as follows:

content_copy
<p>{{ number$ | ngrxPush }}</p>

<ng-container *ngIf="number$ | ngrxPush as n">{{ n }}</ng-container>

<app-number [number]="number$ | ngrxPush"></app-number>
Combining Multiple Observables
The ngrxPush pipe can be also used with a dictionary of observables in the following way:

content_copy
<code>
  {{ { users: users$, query: query$ } | ngrxPush | json }}
</code>
Included Features
Takes observables or promises, retrieves their values, and passes the value to the template.
Allows combining multiple observables in the template.
Handles null and undefined values in a clean unified/structured way.
Triggers change detection using the RenderScheduler that behaves differently in zone-full and zone-less mode.
Distinct the same values in a row for better performance.

NgRx Signals is a standalone library that provides a reactive state management solution and a set of utilities for Angular Signals.

Key Principles
Simple and Intuitive: Designed with ease of use in mind, NgRx Signals provides a straightforward and intuitive API for developers to efficiently work with Angular Signals.
Lightweight and Performant: Keep your application size optimal with a lightweight library that adds minimal overhead to your projects and performs efficiently.
Declarative: NgRx Signals is built around the concept of declarative programming, ensuring clean and concise code.
Modular, Extensible, and Scalable: Modularity and extensibility are the guiding principles of this library. NgRx Signals enables the creation of independent building blocks that can be easily combined for flexible and scalable implementations.
Opinionated, but Flexible: Strike a balance between flexibility and opinionation, offering customization where needed while providing thoughtful conventions for a smooth development experience.
Type-safe: NgRx Signals is designed with a strong focus on type safety, ensuring the prevention of errors and misuse at compile time.
Installation
Detailed installation instructions can be found on the Installation page.

Main Features
SignalStore: A fully-featured state management solution that provides native support for Angular Signals and offers a robust way to manage application state.
SignalState: A lightweight utility for managing signal-based state in Angular components and services in a concise and minimalistic manner.
RxJS Integration: A plugin for opt-in integration with RxJS, enabling easier handling of asynchronous side effects.
Entity Management: A plugin for manipulating and querying entity collections in a simple and performant way.


@ngrx/data
NgRx Data is an extension that offers a gentle introduction to NgRx by simplifying management of entity data while reducing the amount of explicitness.

Introduction
Many applications have substantial domain models with 10s or 100s of entity types.

Such applications typically create, retrieve, update, and delete entity data that are "persisted" in a database of some sort, hosted on a remote server.

Developers who build these apps with the NgRx Store, Effects, and Entity libraries alone tend to write a large number of actions, action-creators, reducers, effects, dispatchers, and selectors as well as the HTTP GET, PUT, POST, and DELETE methods for each entity type. There will be a lot of repetitive code to create, maintain, and test. The more entities in your model, the bigger the challenge.

With NgRx Data you can develop large entity models quickly with very little code and without knowing much NgRx at all. Yet all of NgRx remains accessible to you, when and if you want it.

NgRx Data is an abstraction over the Store, Effects, and Entity that radically reduces the amount of code you'll write. As with any abstraction, while you gain simplicity, you lose the explicitness of direct interaction with the supporting NgRx libraries.

Key Concepts
NgRx Data
automates the creation of actions, reducers, effects, dispatchers, and selectors for each entity type.
provides default HTTP GET, PUT, POST, and DELETE methods for each entity type.
holds entity data as collections within a cache which is a slice of NgRx store state.
supports optimistic and pessimistic save strategies
enables transactional save of multiple entities of multiple types in the same request.
makes reasonable default implementation choices
offers numerous extension points for changing or augmenting those default behaviors.
NgRx Data targets management of persisted entity data, like Customers and Orders, that many apps query and save to remote storage. That's its sweet spot.

It is ill-suited to non-entity data. Value types, enumerations, session data and highly idiosyncratic data are better managed with standard NgRx. Real-world apps will benefit from a combination of NgRx techniques, all sharing a common store.

Entity
An entity is an object with long-lived data values that you read from and write to a database. An entity refers to some "thing" in the application domain. Examples include a Customer, Order, LineItem, Product, Person and User.

An entity is a specific kind of data, an object defined by its thread of continuity and identity.

We experience its "continuity" by storing and retrieving ("persisting") entity objects in a permanent store on a server, a store such as a database. Whether we retrieve the "Sally" entity today or tomorrow or next week, we "mean" that we're getting the same conceptual "Sally" no matter how her data attributes have changed.

In NgRx Data we maintain the entity object's identity by means of its primary key. Every entity in NgRx Data must have a primary key. The primary key is usually a single attribute of the object. For example, that "Sally" entity object might be an instance of the "Customer" entity type, an instance whose permanent, unchanging primary key is the id property with a value of 42.

The primary key doesn't have to be a single attribute. It can consist of multiple attributes of the object if you need that feature. What matters is that the primary key uniquely identifies that object within a permanent collection of entities of the same type. There can be exactly one Customer entity with id: 42 and that entity is "Sally".

Entity Collection
The notion of an Entity Collection is also fundamental to NgRx Data. All entities belong to a collection of the same entity type. A Customer entity belongs to a Customers collection.

Even if you have only one instance of an entity type, it must be held within an entity collection: perhaps a collection with a single element.