import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cardsvideo',
  standalone: true,
  templateUrl: './cardsvideo.component.html',
  styleUrls: ['./cardsvideo.component.css'],
  imports: [CommonModule]
})
export class VideosPoliticoComponent implements OnInit, AfterViewInit {
  videos = [
    { img: '../../../assets/adriano5.jpg', url: 'https://www.instagram.com/reel/C_dG0YNROlt/?igsh=ZXg4cTUwMW5veGZo' },
    { img: '../../../assets/adriano6.jpg', url: 'https://www.instagram.com/reel/C_jTf3hRszY/?igsh=MWVhemZhOXp3amN1OA==' },
    { img: '../../../assets/adriano1.jpg', url: 'https://www.instagram.com/p/C9Yc75XxR1H/?igsh=ZzNmNWl5ajV2bmow' },
    { img: '../../../assets/adriano2.jpg', url: 'https://www.instagram.com/p/C8z3RUmxOUL/?igsh=cGQwNHozcW1tcGV3' },
    { img: '../../../assets/adriano3.jpg', url: 'https://www.instagram.com/p/C8TFS3RN7NY/?igsh=YzJveGNlaDR5eTM2' },
    { img: '../../../assets/adriano4.jpg', url: 'https://www.instagram.com/p/C7475WnA2_A/?igsh=ZmE4cDBuaHpodzVk' },
  ];

  displayedVideos = this.videos;
  currentIndex = 0;
  autoScrollInterval: any;
  isAutoScrolling = true;
  touchStartX = 0;
  touchEndX = 0;


  ngOnInit(): void {
    this.updateDisplayedVideos();

    // Start autoscrolling on initialization
    this.startAutoScroll();
  }

  ngAfterViewInit(): void {
    this.updateDisplayedVideos();
  }

  // Handle resizing to adjust the number of visible videos
  @HostListener('window:resize')
  onResize() {
    this.updateDisplayedVideos();
  }

  // Mouse hover event to stop auto-scroll on desktop
  @HostListener('mouseover')
  onHover() {
    this.stopAutoScroll();
  }

  @HostListener('mouseout')
  onHoverOut() {
    this.startAutoScroll();
  }

  // Touch events to stop auto-scroll on mobile when dragging
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.stopAutoScroll();
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
    this.startAutoScroll(); // Resume auto-scroll after dragging
  }

  private startAutoScroll(): void {
    if (this.isAutoScrolling) {
      this.autoScrollInterval = setInterval(() => {
        this.nextVideos();
      }, 3000); // Slow scrolling (3 seconds)
    }
  }
  private stopAutoScroll(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.isAutoScrolling = false;
    }
  }

  private handleSwipe(): void {
    if (this.touchStartX - this.touchEndX > 50) {
      // Swiped left
      this.nextVideos();
    } else if (this.touchEndX - this.touchStartX > 50) {
      // Swiped right
      this.prevVideos();
    }
  }
 
  nextVideos(): void {
    const width = window.innerWidth;
    let x = 4;
  
    
    if (width <= 768) {
      x = 2;
    } else if (width <= 1200) {
      x = 3;
    }
  
    const container = document.querySelector('.videos-grid') as HTMLElement;
  
    
    const nextCard = container.firstChild!.cloneNode(true) as HTMLElement;
  
    
    let nextIndex = (this.currentIndex + x) % this.videos.length;
  
    
    nextCard.querySelector('img')!.setAttribute('src', this.videos[nextIndex].img);
  
    
    
    container.appendChild(nextCard);
    

    
    
    container.style.transition = 'transform 2s ease-in-out';
    container.style.transform = 'translateX(-100%)';
    setTimeout(() => {
      
      container.style.transform = 'translateX(0)';

  
      
      container.removeChild(nextCard);
      container.removeChild(container.firstChild!)
  
      
      const firstVideo = this.videos.shift();
      if (firstVideo) {
        this.videos.push(firstVideo);
      }
  
      
      this.updateDisplayedVideos();
    }, 30);
  }
  
  

  prevVideos(): void {
    const container = document.querySelector('.videos-container') as HTMLElement;

   
    const lastCard = container.lastElementChild!.cloneNode(true) as HTMLElement;
    container.insertBefore(lastCard, container.firstChild);

   
    container.style.transition = 'none'; 
    container.style.transform = 'translateX(-25%)'; 

   
    requestAnimationFrame(() => {
      setTimeout(() => {
        container.removeChild(lastCard); 

       
        if (this.currentIndex === 0) {
          this.currentIndex = this.videos.length - this.displayedVideos.length;
        } else {
          this.currentIndex--;
        }
        this.updateDisplayedVideos();
      }, 500);
    });
  }

  
  private updateDisplayedVideos(): void {
    const width = window.innerWidth;
    let visibleCount = 4;

    if (width <= 768) {
      visibleCount = 2;
    } else if (width <= 1200) {
      visibleCount = 3;
    }

    this.displayedVideos = this.videos.slice(this.currentIndex, this.currentIndex + visibleCount);
  }

  private updateCardStyles(visibleCount: number): void {
    const cards = document.querySelectorAll('.video-card') as NodeListOf<HTMLElement>;

    let cardWidth = 'calc(25% - 40px)';
    if (visibleCount === 3) {
      cardWidth = 'calc(33.333% - 40px)';
    } else if (visibleCount === 2) {
      cardWidth = '44%';
    }

    cards.forEach((card) => {
      card.style.width = cardWidth;
    });
  }

  private checkScroll(): void {
    const container = document.querySelector('.videos-container') as HTMLElement;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const scrollY: number = window.scrollY;

    if (scrollY + window.innerHeight >= containerTop + 400) {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    } else {
      container.style.opacity = '0';
      container.style.transform = 'translateY(20px)';
    }
  }
}


