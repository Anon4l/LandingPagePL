import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  sections: { id: string, linkId: string }[] = [
    { id: 'home', linkId: 'home-link' },
    { id: 'sobre', linkId: 'sobre-link' },
    { id: '#', linkId: '#' },
    { id: '#', linkId: '#' }
  ];

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.highlightMenuItem();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const nav = document.getElementById('navbar');
    const menuTrigger = document.getElementById('menu-trigger') as HTMLInputElement;
    if (nav && menuTrigger && !nav.contains(event.target as Node) && !menuTrigger.contains(event.target as Node)) {
      menuTrigger.checked = false;
    }
  }

  highlightMenuItem() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    this.sections.forEach(section => {
      const sectionElement = document.getElementById(section.id);
      if (sectionElement) {
        const sectionTop = sectionElement.offsetTop - 650;
        const sectionHeight = sectionElement.offsetHeight;
        const linkElement = document.getElementById(section.linkId);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          linkElement?.classList.add('active');
        } else {
          linkElement?.classList.remove('active');
        }
      }
    });
  }

  scrollTo(event: Event, sectionId: string) {
    event.preventDefault();
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const targetOffset = targetElement.offsetTop;
      this.smoothScrollTo(0, targetOffset - 150);
    }
  }

  closeMenu() {
    const menuTrigger = document.getElementById('menu-trigger') as HTMLInputElement;
    if (menuTrigger) {
      menuTrigger.checked = false;
    }
  }

  clicou(): void {
    const menu = document.getElementById('navbar');
    if (menu) {
      if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "flex";
      } else {
        menu.style.display = "none";
      }
    }
  }

  mudouTamanho = () => {
    const itens = document.getElementById('navbr');
    if (itens) {
      if (window.innerWidth <= 768) {
        itens.style.display = 'flex';
      } else {
        itens.style.display = 'none';
      }
    }
  }

  smoothScrollTo(endX: number, endY: number, duration: number = 1200): void {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    const easeInOutQuart = (time: number, from: number, distance: number, duration: number): number => {
      if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
      return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    const scroll = () => {
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - startTime;
      const nextX = easeInOutQuart(timeElapsed, startX, distanceX, duration);
      const nextY = easeInOutQuart(timeElapsed, startY, distanceY, duration);
      if (timeElapsed < duration) {
        window.scrollTo(nextX, nextY);
        requestAnimationFrame(scroll);
      } else {
        window.scrollTo(endX, endY);
      }
    };

    scroll();
  }

  ngOnInit(): void {
    window.addEventListener('resize', this.mudouTamanho);
    this.mudouTamanho();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.mudouTamanho);
  }
}
