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