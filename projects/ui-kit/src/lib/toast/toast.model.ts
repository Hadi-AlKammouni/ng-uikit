export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ToastOptions {
  variant?: ToastVariant;
  /** Auto-dismiss after this many ms. Set to 0 to keep until manually closed. */
  duration?: number;
  /** Optional title rendered above the message. */
  title?: string;
}

export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
  title?: string;
}
