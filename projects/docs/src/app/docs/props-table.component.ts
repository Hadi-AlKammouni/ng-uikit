import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'app-props-table',
  standalone: true,
  templateUrl: './props-table.component.html',
  styleUrl: './props-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropsTableComponent {
  @Input({ required: true }) props: PropRow[] = [];
  @Input() title = 'Inputs';
}
