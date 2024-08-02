
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
    cards.forEach((card) => {
      this.getComputedHeight(card as HTMLElement);
      card.addEventListener('click', () => this.checkClick(card));
    });
  }

  arrcomputedHeight: any[] = [];

private getComputedHeight(card: HTMLElement): void
{ const cardTextElement = card.querySelector('.card-text');
   const computedHeight = card.getBoundingClientRect().height;
   //assign id to the card computed
   card.style.height = 'auto';
   card.setAttribute('data-id', this.arrcomputedHeight.length.toString());
     this.arrcomputedHeight.push({"height":computedHeight,"id":card.getAttribute('data-id')});
    card.style.height = '20rem';
    }
    

  private checkClick(card:any): void {
    const cardTextElement = card.querySelector('.card-text');
    const computedHeight = this.arrcomputedHeight[card.getAttribute('data-id')].height;
        const expandedHeight = (computedHeight) + 'px';
        const isExpanded = card.classList.contains('expanded');
        if (isExpanded) {
          card.style.height = '20rem';
          cardTextElement.style.opacity = '0';
          card.classList.remove('expanded');
        } else {
          card.style.height = expandedHeight;
          cardTextElement.style.opacity = '1';
          card.classList.add('expanded');
        }
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
