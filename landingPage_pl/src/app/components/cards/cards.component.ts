
import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class CardsComponent implements OnInit, AfterViewInit {
  propostas = [
    { title: 'Mais de 1.300 Requerimentos', icone: '📄',text:"Ele apresentou mais de 1.300 requerimentos, buscando respostas e soluções para as necessidades de nossa população."},
    { title: 'Mais de 2.000 Indicações', icone: '📊' ,text:"Com uma visão clara para o progresso da cidade, fez mais de 2.000 indicações que resultaram em melhorias significativas para nossa comunidade."},
    { title: 'Mais de 74 Projetos de Lei', icone: '📜' ,text:"Adriano é responsável por 75 projetos de lei, dos quais 11 foram sancionados e se tornaram leis que beneficiam diretamente a nossa cidade e seus cidadãos."}
  ];

  ngOnInit(): void {
    this.checkScroll();

    fromEvent(window, 'scroll')
      .pipe(debounceTime(100))
      .subscribe(() => this.checkScroll());

    
   
  }
  ngAfterViewInit(): void {
    const cards = document.querySelectorAll('.card');
    console.log(cards)
    cards.forEach((card) => {
      card.addEventListener('click', () => this.checkClick(card));
    });
  }


    private checkClick(card:any): void {
      // keep on hover css on till next click
     if(card.style.height == '35rem')
      card.style.height = '20rem';
     else
      card.style.height = '35rem';


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
