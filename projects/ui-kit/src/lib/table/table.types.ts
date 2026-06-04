export interface TableColumn<T = Record<string, unknown>> {
  /** Property key on the row object. */
  key: keyof T & string;
  /** Header label. */
  label: string;
  /** Allow click-to-sort on this column header. */
  sortable?: boolean;
  /** Optional alignment for the cell content. */
  align?: 'start' | 'center' | 'end';
  /** Optional custom formatter (returns string only — for full templating
   *  this component can be extended with a directive-based cell template). */
  format?: (row: T) => string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortState<T = Record<string, unknown>> {
  key: keyof T & string;
  direction: SortDirection;
}
