import { Component, HostListener, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ngOnInit(): void {

  }

  private checkScroll(): void {
    const footer = document.querySelector('#footer-contato') as HTMLElement;
    const scrollY: number = window.scrollY;
    const windowHeight: number = window.innerHeight;
    const documentHeight: number = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 50) {
      footer.style.transform = 'translateY(-60px)';
    } else {
      footer.style.transform = 'translateY(0)';
    }
  }
}
