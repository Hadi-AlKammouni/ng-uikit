import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';

@Component({
  selector: 'uikit-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  @Input() set selectedIndex(value: number) {
    this._selected.set(value);
  }
  @Output() selectedIndexChange = new EventEmitter<number>();

  protected readonly _selected = signal(0);

  ngAfterContentInit(): void {
    if (!this.tabs.length) return;
    if (this._selected() >= this.tabs.length) this._selected.set(0);
  }

  protected select(i: number): void {
    const tab = this.tabs.get(i);
    if (!tab || tab.disabled) return;
    this._selected.set(i);
    this.selectedIndexChange.emit(i);
  }

  protected onKeydown(e: KeyboardEvent, i: number): void {
    const max = this.tabs.length - 1;
    let next = i;
    if (e.key === 'ArrowRight') next = i < max ? i + 1 : 0;
    else if (e.key === 'ArrowLeft') next = i > 0 ? i - 1 : max;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = max;
    else return;
    e.preventDefault();
    // Skip disabled tabs.
    let safety = this.tabs.length;
    while (this.tabs.get(next)?.disabled && safety-- > 0) {
      next =
        e.key === 'ArrowLeft' || e.key === 'End'
          ? next > 0
            ? next - 1
            : max
          : next < max
            ? next + 1
            : 0;
    }
    this.select(next);
    const el = document.querySelectorAll<HTMLElement>('[data-uikit-tab-trigger]')[next];
    el?.focus();
  }

  protected isSelected(i: number): boolean {
    return this._selected() === i;
  }
}
