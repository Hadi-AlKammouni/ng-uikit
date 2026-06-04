import { Injectable, Injector, inject, signal } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Toast, ToastOptions } from './toast.model';
import { ToastViewportComponent } from './toast-viewport.component';

let nextId = 0;

/**
 * Service for pushing toast notifications onto a top-right stack. The first
 * call lazily creates a single CDK overlay containing the viewport
 * component; subsequent toasts are pushed onto a signal it watches.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);
  private overlayRef: OverlayRef | null = null;
  private viewportComp: ToastViewportComponent | null = null;

  /** Reactive list of currently-visible toasts (used by the viewport). */
  readonly toasts = signal<Toast[]>([]);

  show(message: string, options: ToastOptions = {}): number {
    this.ensureViewport();
    const toast: Toast = {
      id: ++nextId,
      message,
      variant: options.variant ?? 'info',
      title: options.title,
    };
    this.toasts.update((arr) => [...arr, toast]);

    const duration = options.duration ?? 4_000;
    if (duration > 0) {
      setTimeout(() => this.dismiss(toast.id), duration);
    }
    return toast.id;
  }

  success(message: string, options: Omit<ToastOptions, 'variant'> = {}): number {
    return this.show(message, { ...options, variant: 'success' });
  }
  warning(message: string, options: Omit<ToastOptions, 'variant'> = {}): number {
    return this.show(message, { ...options, variant: 'warning' });
  }
  danger(message: string, options: Omit<ToastOptions, 'variant'> = {}): number {
    return this.show(message, { ...options, variant: 'danger' });
  }
  info(message: string, options: Omit<ToastOptions, 'variant'> = {}): number {
    return this.show(message, { ...options, variant: 'info' });
  }

  dismiss(id: number): void {
    this.toasts.update((arr) => arr.filter((t) => t.id !== id));
  }

  dismissAll(): void {
    this.toasts.set([]);
  }

  private ensureViewport(): void {
    if (this.overlayRef) return;
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().top('16px').right('16px'),
      hasBackdrop: false,
      panelClass: 'uikit-toast__overlay',
    });
    const portal = new ComponentPortal(ToastViewportComponent, null, this.injector);
    const compRef = this.overlayRef.attach(portal);
    this.viewportComp = compRef.instance;
  }
}
