import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from 'ui-kit';
import { PageHeaderComponent } from '../docs/page-header.component';
import { ExampleBlockComponent } from '../docs/example-block.component';
import { PropRow, PropsTableComponent } from '../docs/props-table.component';

@Component({
  selector: 'app-button-docs',
  standalone: true,
  imports: [ButtonComponent, PageHeaderComponent, ExampleBlockComponent, PropsTableComponent],
  templateUrl: './button-docs.component.html',
  styleUrl: './docs-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDocsComponent {
  protected readonly variantsCode = `<button uikitButton variant="primary">Primary</button>
<button uikitButton variant="secondary">Secondary</button>
<button uikitButton variant="ghost">Ghost</button>
<button uikitButton variant="danger">Delete</button>`;

  protected readonly sizesCode = `<button uikitButton size="sm">Small</button>
<button uikitButton size="md">Medium</button>
<button uikitButton size="lg">Large</button>`;

  protected readonly loadingCode = `<button uikitButton [loading]="saving">Save</button>`;

  protected readonly disabledCode = `<button uikitButton disabled>Disabled</button>`;

  protected readonly linkCode = `<a uikitButton variant="secondary" href="/docs">Read docs</a>`;

  readonly props: PropRow[] = [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'ghost' | 'danger'",
      default: "'primary'",
      description:
        'Visual style. Primary for the main action on a screen, danger for destructive actions.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Vertical density. Pick md for nearly everything.',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description:
        'Replaces content with a spinner and applies aria-busy. Click events are blocked while loading.',
    },
  ];
}
