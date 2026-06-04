import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from 'ui-kit';
import { PageHeaderComponent } from '../docs/page-header.component';
import { CodeBlockComponent } from '../docs/code-block.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ButtonComponent, PageHeaderComponent, CodeBlockComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly installCode = `npm install ui-kit @angular/cdk`;
  protected readonly usageCode = `import { ButtonComponent, ToastService } from 'ui-kit';

@Component({
  imports: [ButtonComponent],
  template: \`
    <button uikitButton variant="primary" (click)="notify()">
      Save changes
    </button>
  \`,
})
export class Example {
  private readonly toasts = inject(ToastService);
  notify() {
    this.toasts.success('Saved.');
  }
}`;
}
