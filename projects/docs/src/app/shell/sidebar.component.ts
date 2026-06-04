import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV } from '../app.routes';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly sections = computed(() => {
    const groups = new Map<string, typeof NAV>();
    for (const item of NAV) {
      if (!groups.has(item.section)) groups.set(item.section, []);
      groups.get(item.section)!.push(item);
    }
    return [...groups.entries()].map(([section, items]) => ({ section, items }));
  });
}
