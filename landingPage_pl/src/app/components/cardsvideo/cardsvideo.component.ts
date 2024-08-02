import { Component, OnInit } from '@angular/core';
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
export class VideosPoliticoComponent implements OnInit {
  videos = [
    { img: 'https://scontent.cdninstagram.com/v/t51.29350-15/450797851_326907813825175_1322703573910487675_n.heic?stp=c216.0.648.648a_dst-jpg_s640x640&_nc_cat=110&ccb=1-7&_nc_sid=18de74&_nc_ohc=UaqT4DCsidsQ7kNvgHoKHNa&_nc_ht=scontent.cdninstagram.com&gid=A7aaLaXSKh6-lqXzYqeL9Td&oh=00_AYAv70VX_vAkMBkOiqW1SekLmII4ew90l-FNqksOU8rVoA&oe=66B0E986', url: 'https://www.instagram.com/p/C9Yc75XxR1H/?igsh=ZzNmNWl5ajV2bmow' },
    { img: 'https://scontent.cdninstagram.com/v/t51.29350-15/449419238_760854452910887_2211884414539953147_n.heic?stp=c216.0.648.648a_dst-jpg_s640x640&_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=_BYbePHR1XoQ7kNvgG6CNVo&_nc_ht=scontent.cdninstagram.com&oh=00_AYCm8D3lZcujPIDTOb6dLxEWqpL3ChiaokCJUn_gNFRE1w&oe=66B0E464', url: 'https://www.instagram.com/p/C8z3RUmxOUL/?igsh=cGQwNHozcW1tcGV3' },
    { img: 'https://scontent.cdninstagram.com/v/t51.29350-15/448475324_8058190330931235_6228326501508532952_n.heic?stp=c216.0.648.648a_dst-jpg_s640x640&_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=gDe1IyRRTloQ7kNvgEq340k&_nc_ht=scontent.cdninstagram.com&oh=00_AYDxGzRKzxOQx5mpvelmeKLYho37Nja3EzyKwhQTqAeuUA&oe=66B0EE0D', url: 'https://www.instagram.com/p/C8TFS3RN7NY/?igsh=YzJveGNlaDR5eTM2' },
    { img: 'https://scontent.cdninstagram.com/v/t51.29350-15/447917819_1521210822162911_2581206446229681887_n.heic?stp=c216.0.648.648a_dst-jpg_s640x640&_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=ky_GdSCDBlcQ7kNvgFZFT_P&_nc_ht=scontent.cdninstagram.com&gid=AnHH6-UHXZ6uBt9Yl1GON_k&oh=00_AYDfi4bPPPigzB4_pLmbC8aveneu3hNBeAnDC95A1ZwZSQ&oe=66B0E318', url: 'https://www.instagram.com/p/C7475WnA2_A/?igsh=ZmE4cDBuaHpodzVk%27' },

  ];

  displayedVideos = this.videos.slice(0, 4); // Initially display all videos

  ngOnInit(): void {
    this.updateDisplayedVideos();
    this.checkScroll();

    fromEvent(window, 'scroll')
      .pipe(debounceTime(100))
      .subscribe(() => this.updateDisplayedVideos());

    fromEvent(window, 'scroll')
      .pipe(debounceTime(100))
      .subscribe(() => this.checkScroll());
  }

  private updateDisplayedVideos(): void {
    const width = window.innerWidth;
    if (width <= 768) {
      this.displayedVideos = this.videos.slice(0, 2);
    //change css too
    const cards = document.querySelectorAll('.video-card') as NodeListOf<HTMLElement>;
   for (let i = 0; i < cards.length; i++) {
      cards[i].style.width = '50%';
    }
} else if (width <= 1200) {
      this.displayedVideos = this.videos.slice(0, 3);
      const cards = document.querySelectorAll('.video-card') as NodeListOf<HTMLElement>;

     for (let i = 0; i < cards.length; i++) {
        cards[i].style.width = 'calc(33.333% - 40px)';
      }
    } else {
      this.displayedVideos = this.videos.slice(0, 4);
      const cards = document.querySelectorAll('.video-card') as NodeListOf<HTMLElement>;

     for (let i = 0; i < cards.length; i++) {
        cards[i].style.width = 'calc(33.333% - 40px)';
      }
    }
  }

 
private checkScroll(): void {
    const container = document.querySelector('.videos-container') as HTMLElement;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const scrollY: number = window.scrollY;
  
    if (scrollY + window.innerHeight >= containerTop+400) {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    } else {
      container.style.opacity = '0';
      container.style.transform = 'translateY(20px)';
    }
  }
}