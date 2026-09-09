import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from '@shared/components/footer/footer';
import { Navbar } from '@shared/components/navbar/navbar';

@Component({
  selector: 'app-layout',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './layout.html',
})
export class Layout {}
