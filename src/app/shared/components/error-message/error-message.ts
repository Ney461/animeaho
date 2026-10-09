import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.html',
  host: { class: 'flex flex-1 flex-col' },
  // host: { class: 'block' },

})
export class ErrorMessage {
  message = input.required<string>()
}
