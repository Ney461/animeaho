import { Component } from '@angular/core';
import { SearchBar } from "../search-bar/search-bar";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [SearchBar, RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {}
