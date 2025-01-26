import { Component } from '@angular/core';
import { PresentationComponent } from './presentation/presentation.component';
import { CirclesComponent } from './circles/circles.component';
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [PresentationComponent, CirclesComponent, MainComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {}
