import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent, ToastService } from 'ui-kit';
import { PageHeaderComponent } from '../docs/page-header.component';
import { ExampleBlockComponent } from '../docs/example-block.component';
import { PropRow, PropsTableComponent } from '../docs/props-table.component';

@Component({
  selector: 'app-toast-docs',
  standalone: true,
  imports: [ButtonComponent, PageHeaderComponent, ExampleBlockComponent, PropsTableComponent],
  templateUrl: './toast-docs.component.html',
  styleUrl: './docs-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastDocsComponent {
  private readonly toasts = inject(ToastService);

  protected readonly basicCode = `import { inject } from '@angular/core';
import { ToastService } from 'ui-kit';

const toasts = inject(ToastService);

toasts.success('Settings saved.');
toasts.warning('Quota at 85% — consider archiving old runs.', { duration: 6000 });
toasts.danger('Couldn't reach the billing API.', { title: 'Sync failed' });`;

  info(): void {
    this.toasts.info('Workspace snapshot started.', { title: 'Backup' });
  }
  success(): void {
    this.toasts.success('Settings saved.');
  }
  warning(): void {
    this.toasts.warning('Quota at 85% — consider archiving old runs.', { duration: 6000 });
  }
  danger(): void {
    this.toasts.danger('Couldn’t reach the billing API.', { title: 'Sync failed' });
  }

  readonly props: PropRow[] = [
    {
      name: 'variant',
      type: "'info' | 'success' | 'warning' | 'danger'",
      default: "'info'",
      description: 'Drives the colored strip and ARIA live politeness.',
    },
    { name: 'title', type: 'string', description: 'Optional short headline above the message.' },
    {
      name: 'duration',
      type: 'number',
      default: '4000',
      description: 'Auto-dismiss after this many ms. Pass 0 to require manual dismissal.',
    },
  ];
}
