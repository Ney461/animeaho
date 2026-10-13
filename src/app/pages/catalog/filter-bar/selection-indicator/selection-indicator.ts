import { Component, input } from '@angular/core';

@Component({
  selector: 'selection-indicator',
  templateUrl: './selection-indicator.html',
})
export class SelectionIndicator {
  count = input(0);
}
