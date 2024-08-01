
import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  imports: [CommonModule]
})
export class CardsComponent implements OnInit {
  propostas = [
    { title: 'Mais de 1.300 Requerimentos', icone: '📄' },
    { title: 'Mais de 2.000 Indicações', icone: '📊' },
    { title: '75 Projetos de Lei', icone: '📜' }
  ];

  ngOnInit(): void {
    this.checkScroll();

    fromEvent(window, 'scroll')
      .pipe(debounceTime(100))
      .subscribe(() => this.checkScroll());
  }

  private checkScroll(): void {
    const container = document.querySelector('.politico-container') as HTMLElement;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const scrollY: number = window.scrollY;

    if (scrollY + window.innerHeight >= containerTop) {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    } else {
      container.style.opacity = '0';
      container.style.transform = 'translateY(20px)';
    }
  }
}
