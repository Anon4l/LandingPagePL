
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
    { title: 'Mais de 1.400 Requerimentos', icone: '📄',
      text: "Adriano apresentou mais de 1.400 requerimentos, buscando respostas e soluções para as necessidades de nossa população."},
    { title: 'Mais de 2.200 Indicações', icone: '📊' ,text: "Com uma visão clara para o progresso da cidade, fez mais de 2.000 indicações que resultaram em melhorias significativas para nossa comunidade."},
    { title: 'Mais de 75 Projetos de Lei', icone: '📜' ,text: `Ele apresentou mais de 75 projetos, buscando respostas e soluções para as necessidades de nossa população.\n\n Dentre as leis, se destaca a de número 4.209 de 31 de maio de 2023, que institui a Política Municipal de Proteção e Atenção Integral aos Órfãos de Feminicídio. A propositura de número 329/2022 foi criada com o intuito de assegurar a proteção integral e o direito humano ao desenvolvimento das crianças e adolescentes, filhas destas vítimas, a viverem dignamente, preservando a saúde física e mental e o desenvolvimento. Alguns dos princípios básicos que o município fornece a estes jovens são a assistência social, saúde, alimentação, moradia, educação e assistência jurídica gratuita. \n\nO Projeto de Lei número 390/2023, também apresentado pelo vereador Adriano Piemonte, se tornou a norma de número 4.506 de 20 de junho de 2024. Ela acrescenta um novo dispositivo à lei número 1.755 de 27 de abril de 1999, instituindo o serviço telefônico Disque Denúncia, para atender denúncias de violência, maus-tratos, abandono, discriminação e exploração de trabalho infantil. O parlamentar enxergou na Internet, através do WhatsApp, um novo meio seguro, rápido e eficaz de a população realizar a denúncia.\n\nEm preocupação ao meio ambiente, a lei 4.456 de 18 de março de 2024, que altera dispositivo da lei nº 3.265, de 12 de maio de 2016, que institui o calendário oficial de eventos e datas comemorativas do município, Piemonte propôs, através do projeto 308/2021, a Semana de Conscientização sobre o Descarte Responsável do Lixo. A preocupação com a natureza também pôde ser vista através do projeto de lei 119/2020, que propõe a aplicação do conceito “cidade esponja” ao município, através de mecanismos sustentáveis de gestão das águas pluviais para fins de controle de enchentes e alagamentos. Há pouco, a propositura foi enviada à Comissão de Meio Ambiente e Desenvolvimento Sustentável (CMADS).\n\nAlém disso, duas proposituras se tornaram normas em Santos recentemente. O projeto de lei complementar 50/2024, que dispõe sobre as condições de lei para o tratamento das malformações congênitas fissura labiopalatina e/ou anomalias craniofaciais e síndromes correlatas em Santos, virou a Lei Complementar de nº 1.275 de 3 de setembro de 2024. Assim, a cidade fica responsável por realizar o atendimento às pessoas com fissura labiopalatina. Durante tempos, o único atendimento realizado era do Hospital Guilherme Álvaro, através do Estado. Só que este serviço ficou paralisado por meses, forçando os pais destas crianças e adolescentes a buscarem ajuda em outros municípios, longe da nossa região. Não precisarão mais disso.\n\nOutra, foi a 4.532 de 3 de setembro de 2024. A lei tem como finalidade proibir adoção de animais de qualquer espécie por pessoas condenadas pelo crime de maus-tratos. Ela entrará em vigor com base no projeto de lei de número 344/2023, que tinha o intuito de garantir mais segurança aos animais, sendo assim, não sofrerem nas mãos de pessoas erradas. Mais uma luta vencida.`.replaceAll('\n', '<br>')}
      
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
   card.setAttribute('data-id', this.arrcomputedHeight.length.toString());
     this.arrcomputedHeight.push({"height":computedHeight,"id":card.getAttribute('data-id')});
    }
    

    private checkClick(card: any): void {
      const cardTextElement = card.querySelector('.card-text') as HTMLElement;
      const flechaElement = card.querySelector('.flecha') as HTMLElement;
      
      const isExpanded = card.classList.contains('expanded');
    
      if (isExpanded) {
        cardTextElement.style.maxHeight = '0';
        cardTextElement.style.opacity = '0';
        card.classList.remove('expanded');
      } else {
        cardTextElement.style.maxHeight = cardTextElement.scrollHeight + 'px';
        cardTextElement.style.opacity = '1';
        card.classList.add('expanded');
      }
    
      flechaElement.style.transform = isExpanded ? 'rotate(0)' : 'rotate(180deg)';
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
