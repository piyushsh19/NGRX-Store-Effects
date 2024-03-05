@ngrx/store
Store is RxJS powered global state management for Angular applications, inspired by Redux. Store is a controlled state container designed to help write performant, consistent applications on top of Angular.

Key concepts
Actions describe unique events that are dispatched from components and services.
State changes are handled by pure functions called reducers that take the current state and the latest action to compute a new state.
Selectors are pure functions used to select, derive and compose pieces of state.
State is accessed with the Store, an observable of state and an observer of actions.
Local state management
NgRx Store is mainly for managing global state across an entire application. In cases where you need to manage temporary or local component state, consider using NgRx ComponentStore.