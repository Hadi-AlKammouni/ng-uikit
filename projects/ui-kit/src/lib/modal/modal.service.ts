import { InjectionToken, Injectable, Injector, Type, inject } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalRef } from './modal-ref';
import { ModalContainerComponent, ModalSize } from './modal-container.component';

export interface ModalConfig {
  size?: ModalSize;
  /** Override the default container title. */
  title?: string;
  /** Close when the backdrop is clicked (default: true). */
  closeOnBackdrop?: boolean;
  /** Close when ESC is pressed (default: true). */
  closeOnEscape?: boolean;
}

export const MODAL_CONTENT = new InjectionToken<Type<unknown>>('UIKIT_MODAL_CONTENT');
export const MODAL_CONFIG = new InjectionToken<ModalConfig>('UIKIT_MODAL_CONFIG');

/**
 * Opens a modal using a CDK Overlay so the content is rendered into a portal
 * outside the component tree — focus trap, backdrop, and stacking are
 * handled by `<uikit-modal-container>`.
 */
@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);

  open<T, R = unknown>(component: Type<T>, config: ModalConfig = {}): ModalRef<T, R> {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'uikit-modal__backdrop',
      panelClass: 'uikit-modal__panel-wrap',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    });
    const overlayRef = this.overlay.create(overlayConfig);
    const ref = new ModalRef<T, R>(overlayRef);

    const containerPortal = new ComponentPortal(
      ModalContainerComponent,
      null,
      Injector.create({
        parent: this.injector,
        providers: [
          { provide: ModalRef, useValue: ref },
          { provide: MODAL_CONTENT, useValue: component },
          { provide: MODAL_CONFIG, useValue: config },
        ],
      }),
    );

    const containerCompRef = overlayRef.attach(containerPortal);
    ref.componentInstance = containerCompRef.instance.contentInstance() as T | undefined;

    if (config.closeOnBackdrop !== false) {
      overlayRef.backdropClick().subscribe(() => ref.close());
    }
    if (config.closeOnEscape !== false) {
      overlayRef.keydownEvents().subscribe((e) => {
        if (e.key === 'Escape') ref.close();
      });
    }

    return ref;
  }
}
