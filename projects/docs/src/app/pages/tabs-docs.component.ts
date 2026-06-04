import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabComponent, TabsComponent } from 'ui-kit';
import { PageHeaderComponent } from '../docs/page-header.component';
import { ExampleBlockComponent } from '../docs/example-block.component';
import { PropRow, PropsTableComponent } from '../docs/props-table.component';

@Component({
  selector: 'app-tabs-docs',
  standalone: true,
  imports: [
    TabsComponent,
    TabComponent,
    PageHeaderComponent,
    ExampleBlockComponent,
    PropsTableComponent,
  ],
  templateUrl: './tabs-docs.component.html',
  styleUrl: './docs-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsDocsComponent {
  protected readonly basicCode = `<uikit-tabs>
  <uikit-tab label="Overview">
    <p>Pipeline succeeded in 2 min 17 s. 12 tests passed.</p>
  </uikit-tab>
  <uikit-tab label="Logs">
    <pre class="mono">[12:43:01] Building... ✔</pre>
  </uikit-tab>
  <uikit-tab label="Artifacts" [disabled]="true">
    <p>Artifacts are still uploading…</p>
  </uikit-tab>
</uikit-tabs>`;

  readonly props: PropRow[] = [
    {
      name: 'selectedIndex',
      type: 'number',
      default: '0',
      description: 'Zero-based index of the active tab.',
    },
    {
      name: 'selectedIndexChange',
      type: 'EventEmitter<number>',
      description: 'Two-way bindable. Fires whenever the user selects a different tab.',
    },
    {
      name: '(tab) label',
      type: 'string',
      description: 'Display label on each <uikit-tab>.',
    },
    {
      name: '(tab) disabled',
      type: 'boolean',
      default: 'false',
      description: 'Skipped during arrow-key navigation.',
    },
  ];
}
