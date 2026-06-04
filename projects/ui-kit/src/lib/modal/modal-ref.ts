import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class ModalRef<T = unknown, R = unknown> {
  private readonly _closed = new Subject<R | undefined>();
  readonly closed = this._closed.asObservable();

  /** Set by ModalService after the component is instantiated. */
  componentInstance?: T;

  constructor(private readonly overlayRef: OverlayRef) {}

  close(result?: R): void {
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this._closed.next(result);
    this._closed.complete();
  }
}
