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

Let Directive
The *ngrxLet directive serves a convenient way of binding observables to a view context (DOM element's scope). It also helps with several internal processing under the hood.

Usage
The *ngrxLet directive is a standalone directive. To use it, add the LetDirective to the imports of your standalone component or NgModule:

content_copy
import { Component } from '@angular/core';
import { LetDirective } from '@ngrx/component';

@Component({
  // ... other metadata
  standalone: true,
  imports: [
    // ... other imports
    LetDirective,
  ],
})
export class MyStandaloneComponent {}
Comparison with *ngIf and async
The current way of binding an observable to the view looks like this:

content_copy
<ng-container *ngIf="number$ | async as n">
  <app-number [number]="n"></app-number>
  
  <app-number-special [number]="n"></app-number-special>
</ng-container>
The problem is that *ngIf is interfering with rendering. In case of 0 (falsy value), the component would be hidden.

The *ngrxLet directive takes over several things and makes it more convenient and safe to work with streams in the template:

content_copy
<ng-container *ngrxLet="number$ as n">
  <app-number [number]="n"></app-number>
</ng-container>

<ng-container *ngrxLet="number$; let n">
  <app-number [number]="n"></app-number>
</ng-container>
Tracking Different Observable Events
In addition to that it provides us information from the whole observable context. We can track next, error, and complete events:

content_copy
<ng-container *ngrxLet="number$ as n; error as e; complete as c">
  <app-number [number]="n" *ngIf="!e && !c">
  </app-number>

  <p *ngIf="e">There is an error: {{ e }}</p>
  <p *ngIf="c">Observable is completed.</p>
</ng-container>
Combining Multiple Observables
The *ngrxLet directive can be also used with a dictionary of observables. This feature provides the ability to create a view model object in the template:

content_copy
<ng-container *ngrxLet="{ users: users$, query: query$ } as vm">
  <app-search-bar [query]="vm.query"></app-search-bar>
  <app-user-list [users]="vm.users"></app-user-list>
</ng-container>
Using Suspense Template
There is an option to pass the suspense template that will be displayed when an observable is in a suspense state:

content_copy
<ng-container *ngrxLet="number$ as n; suspenseTpl: loading">
  <app-number [number]="n"></app-number>
</ng-container>

<ng-template #loading>
  <p>Loading...</p>
</ng-template>
An observable is in a suspense state until it emits the first event (next, error, or complete).

In case a new observable is passed to the *ngrxLet directive at runtime, the suspense template will be displayed again until the new observable emits the first event.

Using Aliases for Non-Observable Values
The *ngrxLet directive can also accept static (non-observable) values as input argument. This feature provides the ability to create readable templates by using aliases for deeply nested properties:

content_copy
<ng-container *ngrxLet="userForm.controls.email as email">
  <input type="text" [formControl]="email" />

  <ng-container *ngIf="email.errors && (email.touched || email.dirty)">
    <p *ngIf="email.errors.required">This field is required.</p>
    <p *ngIf="email.errors.email">This field must be an email.</p>
  </ng-container>
</ng-container>
Included Features
Binding is present even for falsy values. (See "Comparison with *ngIf and async" section)
Takes away the multiple usages of the async or ngrxPush pipe.
Allows displaying different content based on the current state of an observable.
Allows combining multiple observables in the template.
Provides a unified/structured way of handling null and undefined.
Provides the ability to create readable templates by using aliases for nested properties.
Triggers change detection using the RenderScheduler that behaves differently in zone-full and zone-less mode.
Distinct the same values in a row for better performance.

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
Overview
Use ESLint to follow the best practices and to avoid common pitfalls in your application.

The NgRx ESLint Plugin is no different and promotes the key concepts to create a maintainable project. It consists of @ngrx/store, @ngrx/effects, and @ngrx/component-store rules and a handful of preconfigured configurations.

The plugin comes with a number of rules that help address most popular NgRx malpractices. The rules are configurable so that you can choose the ones you want to follow, and which rules should give a linting error or warning.

Some rules also allow automatic fixes with ng lint --fix.

Adding rules
To use the a rule, import the NgRx plugin via plugins or extends. You can add a rule by adding the rule to the rules collection.

content_copy
{
      "plugins": ["@ngrx"],
      "rules": {
        "@ngrx/good-action-hygiene": "error",
      }
}
or

content_copy
{
      "extends": ["@ngrx/recommended"],
      "rules": {
        "@ngrx/good-action-hygiene": "error",
      }
}
Instead of manually configuring the rules, there are also preconfigured configurations. To use a configuration, add it to extends:

content_copy
{
      "extends": ["@ngrx/recommended-requiring-type-checking"],
      "rules": {}
}

NgRx is a community-maintained project that thrives due to the contributions of fellow developers. Whether it be documentation, issues, features, or tests, all contributions help this project in a meaningful way. This page serves as a "Getting Started Guide" on how to contribute to NgRx in different areas. If you also want to donate or sponsor this project, visit our GitHub Sponsors page.

Prerequisites
yarn - The NgRx library utilizes the yarn CLI tool. Please make sure that you have the latest stable release of yarn installed. For more information, visit the Yarn Install Docs
Contributing to the Docs and NgRx.io Website
Learn How to Contribute
Watch as Brandon Roberts and Jan-Niklas Wortmann walk through how to contribute to RxJS and NgRx through the docs. They will cover finding issues, making changes, and submitting a pull request.


Store

The store can be seen as your client side database but, more importantly, it reflects the state of your application. You can see it as the single source of truth.

It is the only thing you alter when you follow the Redux pattern and you modify by dispatching actions to it.

Reducer

Reducers are the functions that know what to do with a given action and the previous state of your app.

The reducers will take the previous state from your store and apply a pure function to it. Pure means that the function always returns the same value for the same input and that it has no side effects. From the result of that pure function, you will have a new state that will be put in your store.

Actions

Actions are the payload that contains needed information to alter your store. Basically, an action has a type and a payload that your reducer function will take to alter the state.

Dispatcher

Dispatchers are simply an entry point for you to dispatch your action. In Ngrx, there is a dispatch method directly on the store.

Middleware

Middleware are some functions that will intercept each action that is being dispatched in order to create side effects, even though you will not use them in this article. They are implemented in the Ngrx/Effect library, and there is a big chance that you will need them while building real-world applications.