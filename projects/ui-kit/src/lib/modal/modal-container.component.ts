import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewContainerRef,
  inject,
  signal,
} from '@angular/core';
import { ConfigurableFocusTrap, ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';
import { ModalRef } from './modal-ref';
import { MODAL_CONFIG, MODAL_CONTENT } from './modal.service';

export type ModalSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'uikit-modal-container',
  standalone: true,
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContainerComponent implements AfterViewInit {
  @ViewChild('host', { read: ViewContainerRef, static: true })
  private hostVcr!: ViewContainerRef;
  @ViewChild('trap', { static: true })
  private trapEl!: { nativeElement: HTMLElement };

  private readonly trapFactory = inject(ConfigurableFocusTrapFactory);
  private trap?: ConfigurableFocusTrap;
  private readonly previouslyFocused: Element | null =
    (typeof document !== 'undefined' && document.activeElement) || null;

  protected readonly ref = inject(ModalRef);
  protected readonly content = inject(MODAL_CONTENT);
  protected readonly config = inject(MODAL_CONFIG);

  readonly contentInstance = signal<unknown | undefined>(undefined);

  get sizeClass(): string {
    return 'uikit-modal--' + (this.config.size ?? 'md');
  }

  ngAfterViewInit(): void {
    const compRef = this.hostVcr.createComponent(this.content);
    this.contentInstance.set(compRef.instance);

    queueMicrotask(() => {
      this.trap = this.trapFactory.create(this.trapEl.nativeElement);
      this.trap.focusInitialElementWhenReady();
    });

    // Restore focus on dispose.
    this.ref.closed.subscribe(() => {
      this.trap?.destroy();
      if (this.previouslyFocused instanceof HTMLElement) {
        this.previouslyFocused.focus();
      }
    });
  }
}
