import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableColumn, TableComponent } from 'ui-kit';
import { PageHeaderComponent } from '../docs/page-header.component';
import { ExampleBlockComponent } from '../docs/example-block.component';
import { PropRow, PropsTableComponent } from '../docs/props-table.component';

interface InvoiceRow extends Record<string, unknown> {
  number: string;
  customer: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  due: string;
}

@Component({
  selector: 'app-table-docs',
  standalone: true,
  imports: [TableComponent, PageHeaderComponent, ExampleBlockComponent, PropsTableComponent],
  templateUrl: './table-docs.component.html',
  styleUrl: './docs-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDocsComponent {
  readonly columns: TableColumn<InvoiceRow>[] = [
    { key: 'number', label: 'Invoice #', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      align: 'end',
      format: (r) =>
        '$' + (r.amount as number).toLocaleString('en-US', { minimumFractionDigits: 2 }),
    },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'due', label: 'Due', sortable: true },
  ];

  readonly rows: InvoiceRow[] = [
    {
      number: 'INV-1041',
      customer: 'Lumina Capital',
      amount: 4280.0,
      status: 'Paid',
      due: '2026-05-12',
    },
    {
      number: 'INV-1042',
      customer: 'Acme Cooperative',
      amount: 1920.5,
      status: 'Pending',
      due: '2026-05-18',
    },
    {
      number: 'INV-1043',
      customer: 'Northwind Foods',
      amount: 760.0,
      status: 'Overdue',
      due: '2026-04-30',
    },
    {
      number: 'INV-1044',
      customer: 'Helix Robotics',
      amount: 12_400.0,
      status: 'Paid',
      due: '2026-05-22',
    },
    {
      number: 'INV-1045',
      customer: 'Beacon Press',
      amount: 540.0,
      status: 'Pending',
      due: '2026-05-25',
    },
    {
      number: 'INV-1046',
      customer: 'Quartz Energy',
      amount: 3210.0,
      status: 'Paid',
      due: '2026-05-15',
    },
  ];

  protected readonly basicCode = `<uikit-table
  [columns]="columns"
  [rows]="invoices"
  [pageSize]="5"
  emptyMessage="No invoices in this period."
/>`;

  readonly props: PropRow[] = [
    {
      name: 'columns',
      type: 'TableColumn<T>[]',
      description: 'Column definitions: key, label, optional sortable, align, and format callback.',
    },
    {
      name: 'rows',
      type: 'T[]',
      description: 'The dataset. Sorting and pagination are applied locally.',
    },
    { name: 'pageSize', type: 'number', default: '10', description: 'Rows shown per page.' },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Shows a "Loading…" row spanning all columns.',
    },
    {
      name: 'emptyMessage',
      type: 'string',
      default: "'No results.'",
      description: 'Shown when rows is empty.',
    },
  ];
}
