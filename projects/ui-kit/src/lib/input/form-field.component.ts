import { ChangeDetectionStrategy, Component, Input, contentChild } from '@angular/core';
import { InputDirective } from './input.directive';

let nextId = 0;

@Component({
  selector: 'uikit-form-field',
  standalone: true,
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'uikit-form-field',
    '[class.uikit-form-field--invalid]': 'hasError',
    '[class.uikit-form-field--disabled]': 'isDisabled',
  },
})
export class FormFieldComponent {
  @Input({ required: true }) label!: string;
  @Input() hint?: string;
  @Input() error?: string;

  readonly fieldId = `uikit-field-${++nextId}`;
  readonly hintId = `${this.fieldId}-hint`;
  readonly errorId = `${this.fieldId}-error`;

  readonly child = contentChild(InputDirective);

  get hasError(): boolean {
    return !!this.error;
  }

  get isDisabled(): boolean {
    return this.child()?.disabled() ?? false;
  }
}
