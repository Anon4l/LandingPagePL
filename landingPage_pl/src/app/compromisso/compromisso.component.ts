import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-compromisso',
  standalone: true,
  imports: [],
  templateUrl: './compromisso.component.html',
  styleUrl: './compromisso.component.css'
})
export class CompromissoComponent implements OnInit {
  ngOnInit(): void {
    this.checkVisibility(); 
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkVisibility();
  }

  checkVisibility(): void {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add('visible');
      }
    });
  }
}
