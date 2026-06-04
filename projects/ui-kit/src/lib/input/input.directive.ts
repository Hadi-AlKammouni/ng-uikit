import { Directive, ElementRef, HostListener, inject, signal } from '@angular/core';

/**
 * Attribute directive that styles a native `<input>` or `<textarea>` to match
 * the design system. Pairs with `<uikit-form-field>` for label/hint/error
 * decoration but works standalone too.
 */
@Directive({
  selector: 'input[uikitInput], textarea[uikitInput]',
  standalone: true,
  host: {
    class: 'uikit-input',
    '[class.uikit-input--focused]': 'focused()',
    '[class.uikit-input--disabled]': 'disabled()',
  },
})
export class InputDirective {
  private readonly el = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>);

  readonly focused = signal(false);

  disabled(): boolean {
    return this.el.nativeElement.disabled;
  }

  @HostListener('focus')
  onFocus(): void {
    this.focused.set(true);
  }

  @HostListener('blur')
  onBlur(): void {
    this.focused.set(false);
  }
}
