import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { BooksStore } from './books.store';

@Component({
  standalone: true,
  imports: [JsonPipe],
  template: `
    <p>Books: {{ store.books() | json }}</p>
    <p>Loading: {{ store.isLoading() }}</p>

    <!-- 👇 The `DeepSignal` value can be read in the same way as `Signal`. -->
    <p>Pagination: {{ store.filter() | json }}</p>

    <!-- 👇 Nested signals are created as `DeepSignal` properties. -->
    <p>Query: {{ store.filter.query() }}</p>
    <p>Order: {{ store.filter.order() }}</p>
  `,
  providers: [BooksStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent {
  readonly store = inject(BooksStore);
}