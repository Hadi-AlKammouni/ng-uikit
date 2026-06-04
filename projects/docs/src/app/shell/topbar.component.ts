import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  protected readonly theme = signal<'dark' | 'light'>(this.readTheme());

  constructor() {
    this.applyTheme(this.theme());
  }

  protected toggleTheme(): void {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.applyTheme(next);
    try {
      localStorage.setItem('uikit-docs-theme', next);
    } catch {
      /* no-op */
    }
  }

  private readTheme(): 'dark' | 'light' {
    try {
      const stored = localStorage.getItem('uikit-docs-theme');
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {
      /* no-op */
    }
    return 'dark';
  }

  private applyTheme(t: 'dark' | 'light'): void {
    if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', t);
  }
}
