import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarAppComponent } from './components/car-app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarAppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '3-car-app';
}
