import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    const elements = document.querySelectorAll('.apresentacao, .img');
    elements.forEach(el => {
      el.classList.add('visible');
    });
  }
}
