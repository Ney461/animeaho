import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'filter-option',
  imports: [NgTemplateOutlet],
  host: {
    class: 'block w-full'
  },
  templateUrl: './filter-option.html',
})
export class FilterOption {

  filterLabel = input.required<string>();
  options = input.required<string[]>();

  variant = input<'dropdown' | 'collapse'>('dropdown');
  dropdownTop = input<boolean>(false);
  expanded = input(false);

  selectionChange = output<string[]>();
  expandedChange = output<boolean>();

  selected = signal<string[]>([]);

  selectedOption = signal<string | null>(null);

  onExpansionChange(event: Event) {
    const isExpanded = (event.target as HTMLInputElement).checked;
    this.expandedChange.emit(isExpanded);
  }

  selectSingleOption(option: string) {
    this.selectedOption.set(option);
    this.selectionChange.emit([option]);
  }

  toggleOption(option: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.selected();
    const updatedSelection = checked
      ? [...current, option]
      : current.filter(selectedOption => selectedOption !== option);
    this.selected.set(updatedSelection);
    this.selectionChange.emit(updatedSelection);
  }

  formatOptionLabel(option: string): string {
    return option
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
