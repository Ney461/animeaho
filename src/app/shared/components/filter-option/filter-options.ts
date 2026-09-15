import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, forwardRef, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { optionLabels } from '@core/constants/option-labels';

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
  imports: [NgClass, NgTemplateOutlet],
})

export class FilterOptions implements ControlValueAccessor {

  dropdownTop = input<boolean>(false);

  filterLabel = input.required<string>();
  options = input.required<string[]>();
  variant = input<'dropdown' | 'collapse'>('dropdown');

  expanded = input(false);
  expandedChange = output<boolean>();

  value = signal<string[] | string | null>(null);
  disabled = signal(false);

  private isMulti(): boolean {
    return this.filterLabel() !== 'Estado' && this.filterLabel() !== 'Orden';
  }

  private onChange: (val: any) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(val: string[] | string | null): void {
    this.value.set(this.isMulti() ? (val ?? []) : val);
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
    return this.isMulti()
      ? ((this.value() as string[]) ?? []).includes(option)
      : this.value() === option
  }

  formatOptionLabel(option: string): string {
    const normalizedOption = option.toLowerCase();

    return optionLabels[normalizedOption] ?? option
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  onExpansionChange(event: Event): void {
    this.expandedChange.emit((event.target as HTMLInputElement).checked);
  }

}
