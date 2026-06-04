import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CodeBlockComponent } from './code-block.component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CodeBlockComponent],
  templateUrl: './example-block.component.html',
  styleUrl: './example-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleBlockComponent {
  @Input() title?: string;
  @Input({ required: true }) code = '';
  @Input() language = 'html';
}
