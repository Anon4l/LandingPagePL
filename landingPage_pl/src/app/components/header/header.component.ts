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
    { id: 'politico-container', linkId: 'politico-container' },
    { id: 'videos-container', linkId: 'videos-container' }
  ];

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.highlightMenuItem();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const nav = document.getElementById('navbar');
    const menuTrigger = document.getElementById('menu-trigger') as HTMLInputElement;
    const overlay = document.getElementById('overlay');
    const target = event.target as Node;
  
    if (menuTrigger) {
      if (nav && !nav.contains(target) && !menuTrigger.contains(target)) {
        menuTrigger.checked = false;
        if (overlay) {
          overlay.style.display = 'none';
        }
      } else {
        if (menuTrigger.checked) {
          if (overlay) {
            overlay.style.display = 'block';
          }
        } else {
          if (overlay) {
            overlay.style.display = 'none';
          }
        }
      }
    }
  }
  
 
  @HostListener('document:change', ['$event'])
  onMenuChange(event: Event) {
    const menuTrigger = document.getElementById('menu-trigger') as HTMLInputElement;
    const overlay = document.getElementById('overlay');
  
    if (menuTrigger && overlay) {
      if (menuTrigger.checked) {
        overlay.style.display = 'block';
      } else {
        overlay.style.display = 'none';
      }
    }
  }


  highlightMenuItem() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    let offsetDistance = 650;
    if (window.innerWidth < 450) {
      offsetDistance = 300;
    }
    this.sections.forEach(section => {
      const sectionElement = document.getElementById(section.id);
      if (sectionElement) {
        const sectionTop = sectionElement.offsetTop - offsetDistance;
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
      this.closeMenu();
    }
  }

  closeMenu() {
    const menuTrigger = document.getElementById('menu-trigger') as HTMLInputElement;
    if (menuTrigger) {
      menuTrigger.checked = false;
      const overlay = document.getElementById('overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    }
  }

  smoothScrollTo(endX: number, endY: number, duration: number = 1200): void {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    let startTime: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 0.5 * (1 - Math.cos(Math.PI * progress));
      window.scrollTo(startX + distanceX * easeProgress, startY + distanceY * easeProgress);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }

  ngOnInit(): void {
    this.highlightMenuItem();
  }

  ngOnDestroy(): void {
  }
}
