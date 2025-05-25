import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styles: ``
})
export default class HomeComponent {

}
