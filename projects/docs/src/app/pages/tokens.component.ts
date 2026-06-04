import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeaderComponent } from '../docs/page-header.component';
import { CodeBlockComponent } from '../docs/code-block.component';

interface SwatchRow {
  name: string;
  cssVar: string;
}

@Component({
  selector: 'app-tokens',
  standalone: true,
  imports: [PageHeaderComponent, CodeBlockComponent],
  templateUrl: './tokens.component.html',
  styleUrl: './tokens.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TokensComponent {
  readonly colorTokens: SwatchRow[] = [
    { name: 'bg', cssVar: '--bg' },
    { name: 'surface', cssVar: '--surface' },
    { name: 'surface-2', cssVar: '--surface-2' },
    { name: 'border', cssVar: '--border' },
    { name: 'text', cssVar: '--text' },
    { name: 'text-muted', cssVar: '--text-muted' },
    { name: 'accent', cssVar: '--accent' },
    { name: 'accent-2', cssVar: '--accent-2' },
    { name: 'success', cssVar: '--success' },
    { name: 'warning', cssVar: '--warning' },
    { name: 'danger', cssVar: '--danger' },
  ];

  readonly spaceTokens = [
    { name: 'space-1', size: '4px' },
    { name: 'space-2', size: '8px' },
    { name: 'space-3', size: '12px' },
    { name: 'space-4', size: '16px' },
    { name: 'space-5', size: '24px' },
    { name: 'space-6', size: '32px' },
    { name: 'space-7', size: '48px' },
  ];

  readonly typeScale = [
    { name: 'fs-xs', size: '12px' },
    { name: 'fs-sm', size: '14px' },
    { name: 'fs-md', size: '16px' },
    { name: 'fs-lg', size: '20px' },
    { name: 'fs-xl', size: '28px' },
    { name: 'fs-2xl', size: '40px' },
  ];

  protected readonly themingCode = `// Override any token at any scope:
:root[data-theme='brand-x'] {
  --accent: #ff6a00;
  --radius-md: 4px;
}

// Then on <html data-theme="brand-x"> the whole library re-paints.`;
}
