import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { SortDirection, SortState, TableColumn } from './table.types';

@Component({
  selector: 'uikit-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends Record<string, unknown>> {
  @Input({ required: true }) set columns(value: TableColumn<T>[]) {
    this._columns.set(value);
  }
  @Input({ required: true }) set rows(value: T[]) {
    this._rows.set(value ?? []);
    this._page.set(0);
  }
  @Input() set pageSize(value: number) {
    this._pageSize.set(Math.max(1, value || 10));
    this._page.set(0);
  }
  @Input() loading = false;
  @Input() emptyMessage = 'No results.';

  protected readonly _columns = signal<TableColumn<T>[]>([]);
  protected readonly _rows = signal<T[]>([]);
  protected readonly _pageSize = signal(10);
  protected readonly _page = signal(0);
  protected readonly _sort = signal<SortState<T> | null>(null);

  protected readonly sorted = computed(() => {
    const rows = this._rows().slice();
    const sort = this._sort();
    if (!sort) return rows;
    const { key, direction } = sort;
    return rows.sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av == null && bv == null) return 0;
      if (av == null) return direction === 'asc' ? -1 : 1;
      if (bv == null) return direction === 'asc' ? 1 : -1;
      const cmp =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv), undefined, { sensitivity: 'base' });
      return direction === 'asc' ? cmp : -cmp;
    });
  });

  protected readonly totalPages = computed(() => {
    const len = this.sorted().length;
    return Math.max(1, Math.ceil(len / this._pageSize()));
  });

  protected readonly pageRows = computed(() => {
    const start = this._page() * this._pageSize();
    return this.sorted().slice(start, start + this._pageSize());
  });

  cellValue(col: TableColumn<T>, row: T): string {
    if (col.format) return col.format(row);
    const v = row[col.key];
    return v == null ? '' : String(v);
  }

  alignStyle(col: TableColumn<T>): string {
    switch (col.align) {
      case 'center':
        return 'center';
      case 'end':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  }

  sortBy(col: TableColumn<T>): void {
    if (!col.sortable) return;
    const current = this._sort();
    let direction: SortDirection = 'asc';
    if (current?.key === col.key) {
      direction = current.direction === 'asc' ? 'desc' : 'asc';
    }
    this._sort.set({ key: col.key, direction });
  }

  sortIcon(col: TableColumn<T>): 'asc' | 'desc' | null {
    const s = this._sort();
    if (!s || s.key !== col.key) return null;
    return s.direction;
  }

  nextPage(): void {
    if (this._page() + 1 < this.totalPages()) this._page.update((p) => p + 1);
  }
  prevPage(): void {
    if (this._page() > 0) this._page.update((p) => p - 1);
  }

  protected readonly page = this._page.asReadonly();
  protected readonly columnList = this._columns.asReadonly();
}
