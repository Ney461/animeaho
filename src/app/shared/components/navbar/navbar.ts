import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SearchBar } from '@shared/components/search-bar/search-bar';
import { NavbarLogo } from './navbar-logo/navbar-logo';

@Component({
  selector: 'app-navbar',
  imports: [SearchBar, RouterLink, NavbarLogo],
  templateUrl: './navbar.html',
})
export class Navbar {}
