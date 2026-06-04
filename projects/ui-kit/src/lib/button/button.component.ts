import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'button[uikitButton], a[uikitButton]',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'uikit-button',
    '[class.uikit-button--primary]': "variant === 'primary'",
    '[class.uikit-button--secondary]': "variant === 'secondary'",
    '[class.uikit-button--ghost]': "variant === 'ghost'",
    '[class.uikit-button--danger]': "variant === 'danger'",
    '[class.uikit-button--sm]': "size === 'sm'",
    '[class.uikit-button--md]': "size === 'md'",
    '[class.uikit-button--lg]': "size === 'lg'",
    '[class.uikit-button--loading]': 'loading',
    '[attr.aria-busy]': 'loading || null',
    '[attr.aria-disabled]': 'loading || null',
  },
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() loading = false;
}
