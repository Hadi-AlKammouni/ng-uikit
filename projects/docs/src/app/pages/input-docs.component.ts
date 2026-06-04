import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent, InputDirective } from 'ui-kit';
import { PageHeaderComponent } from '../docs/page-header.component';
import { ExampleBlockComponent } from '../docs/example-block.component';
import { PropRow, PropsTableComponent } from '../docs/props-table.component';

@Component({
  selector: 'app-input-docs',
  standalone: true,
  imports: [
    FormsModule,
    PageHeaderComponent,
    ExampleBlockComponent,
    PropsTableComponent,
    FormFieldComponent,
    InputDirective,
  ],
  templateUrl: './input-docs.component.html',
  styleUrl: './docs-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDocsComponent {
  protected fullName = '';
  protected emailWithError = 'not-an-email';

  protected readonly basicCode = `<uikit-form-field label="Full name" hint="Used on your billing receipts.">
  <input uikitInput placeholder="Ada Lovelace" />
</uikit-form-field>`;

  protected readonly errorCode = `<uikit-form-field label="Email" [error]="emailError">
  <input uikitInput type="email" [(ngModel)]="email" />
</uikit-form-field>`;

  protected readonly textareaCode = `<uikit-form-field label="Notes" hint="Markdown welcome.">
  <textarea uikitInput rows="4"></textarea>
</uikit-form-field>`;

  readonly fieldProps: PropRow[] = [
    {
      name: 'label',
      type: 'string',
      description: 'Required. Rendered above the control and associated via `for`/`id`.',
    },
    {
      name: 'hint',
      type: 'string',
      description: 'Optional helper text shown beneath the control.',
    },
    {
      name: 'error',
      type: 'string',
      description:
        'Optional error message. When set, the control borders turn red and the message is announced via role="alert".',
    },
  ];
}
