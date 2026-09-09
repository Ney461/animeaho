import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SearchBar } from '@shared/components/search-bar/search-bar';

@Component({
  selector: 'app-navbar',
  imports: [SearchBar, RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {}
