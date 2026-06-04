import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent, ModalRef, ModalService } from 'ui-kit';
import { PageHeaderComponent } from '../docs/page-header.component';
import { ExampleBlockComponent } from '../docs/example-block.component';
import { PropRow, PropsTableComponent } from '../docs/props-table.component';

@Component({
  selector: 'app-example-confirm-dialog',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <p class="dialog__lede">
      This will remove the workspace and detach all 14 members. This action is not reversible.
    </p>
    <div class="dialog__actions">
      <button uikitButton variant="ghost" (click)="ref.close('cancel')">Cancel</button>
      <button
        uikitButton
        variant="danger"
        (click)="ref.close('confirm')"
        data-testid="dialog-confirm"
      >
        Delete workspace
      </button>
    </div>
  `,
  styles: `
    .dialog__lede {
      color: var(--text-muted);
      margin-bottom: 16px;
      line-height: 1.6;
    }
    .dialog__actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleConfirmDialog {
  protected readonly ref = inject(ModalRef);
}

@Component({
  selector: 'app-modal-docs',
  standalone: true,
  imports: [ButtonComponent, PageHeaderComponent, ExampleBlockComponent, PropsTableComponent],
  templateUrl: './modal-docs.component.html',
  styleUrl: './docs-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDocsComponent {
  private readonly modal = inject(ModalService);

  protected readonly basicCode = `import { Component, inject } from '@angular/core';
import { ModalService, ModalRef } from 'ui-kit';

@Component({ template: '...' })
export class ConfirmDialog {
  ref = inject(ModalRef);
}

// Open it
modal.open(ConfirmDialog, {
  title: 'Delete workspace',
  size: 'sm',
}).closed.subscribe(result => {
  if (result === 'confirm') deleteWorkspace();
});`;

  openConfirm(): void {
    this.modal.open(ExampleConfirmDialog, {
      title: 'Delete workspace',
      size: 'sm',
    });
  }

  readonly props: PropRow[] = [
    {
      name: 'title',
      type: 'string',
      description:
        'Optional header text. When omitted the modal has no titlebar — useful for visual-only dialogs.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Max-width preset (360 / 480 / 720 px).',
    },
    {
      name: 'closeOnBackdrop',
      type: 'boolean',
      default: 'true',
      description: 'Click on the dimmed area to dismiss.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'ESC key dismisses the modal.',
    },
  ];
}
