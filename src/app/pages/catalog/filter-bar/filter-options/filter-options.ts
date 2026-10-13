import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, forwardRef, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterOption } from '@core/constants/option-labels';
import { SelectionIndicator } from '../selection-indicator/selection-indicator';

@Component({
  selector: 'filter-options',
  templateUrl: './filter-options.html',
  host: {
    class: 'block w-full'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterOptions),
      multi: true
    },
  ],
  imports: [NgClass, NgTemplateOutlet, SelectionIndicator],
})

export class FilterOptions implements ControlValueAccessor {

  dropdownTop = input<boolean>(false);
  filterLabel = input.required<string>();
  options = input.required<FilterOption[]>();
  variant = input<'dropdown' | 'collapse'>('dropdown');
  defaultOption = input<string | null>(null);
  expanded = input(false);

  expandedChange = output<boolean>();

  value = signal<string[] | string | null>(null);
  disabled = signal(false);
  selectionCount = computed(() => {
    const value = this.value();
    return this.isMulti()
      ? Array.isArray(value) ? value.length : 0
      : typeof value === 'string' && value.length > 0 ? 1 : 0;
  });

  private isMulti(): boolean {
    return this.filterLabel() !== 'Estado' && this.filterLabel() !== 'Orden';
  }

  private onChange: (val: any) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(val: string[] | string | null): void {
    this.value.set(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  toggleOption(option: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const current = (this.value() as string[]) ?? [];
    const updated = checked
      ? [...current, option]
      : current.filter((o) => o != option);
    this.value.set(updated);
    this.onChange(updated);
    this.onTouched()
  }

  selectSingleOption(option: string): void {
    this.value.set(option);
    this.onChange(option)
    this.onTouched();
  }

  isChecked(option: string): boolean {
    if (this.isMulti()) {
      return ((this.value() as string[]) ?? []).includes(option);
    }

    if (this.value() == null || this.value() === '') {
      return this.defaultOption() === option;
    }

    return this.value() === option;
  }

  onExpansionChange(event: Event): void {
    this.expandedChange.emit((event.target as HTMLInputElement).checked);
  }

}
