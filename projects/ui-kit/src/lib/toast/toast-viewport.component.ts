import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'uikit-toast-viewport',
  standalone: true,
  templateUrl: './toast-viewport.component.html',
  styleUrl: './toast-viewport.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastViewportComponent {
  private readonly svc = inject(ToastService);
  readonly toasts = this.svc.toasts;

  dismiss(id: number): void {
    this.svc.dismiss(id);
  }
}
