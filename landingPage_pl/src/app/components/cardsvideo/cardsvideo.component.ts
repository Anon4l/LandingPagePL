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
    { img: 'https://scontent.cdninstagram.com/v/t51.29350-15/450797851_326907813825175_1322703573910487675_n.heic?stp=c216.0.648.648a_dst-jpg_s640x640&_nc_cat=110&cb=51254e2e-4fc41369&ccb=1-7&_nc_sid=18de74&_nc_ohc=V4ugOE6LxEgQ7kNvgEaGBso&_nc_ht=scontent.cdninstagram.com&oh=00_AYAe-oGVnzgVTz1A1dV0oM3iIXL68zFKZcJFjFS2vFOjiw&oe=66C94D46', url: 'https://www.instagram.com/p/C9Yc75XxR1H/?igsh=ZzNmNWl5ajV2bmow' },
    { img: 'https://scontent.cdninstagram.com/v/t51.29350-15/449419238_760854452910887_2211884414539953147_n.heic?stp=c216.0.648.648a_dst-jpg_s640x640&_nc_cat=100&cb=51254e2e-4fc41369&ccb=1-7&_nc_sid=18de74&_nc_ohc=jQV65zaCLsQQ7kNvgH4rvpx&_nc_ht=scontent.cdninstagram.com&oh=00_AYBk1_x5DISgB_7S4s74lewhxpCiHoL9uqgSxKj8YHDsAA&oe=66C94824', url: 'https://www.instagram.com/p/C8z3RUmxOUL/?igsh=cGQwNHozcW1tcGV3' },
    { img: 'https://scontent.cdninstagram.com/v/t51.29350-15/448475324_8058190330931235_6228326501508532952_n.heic?stp=c216.0.648.648a_dst-jpg_s640x640&_nc_cat=100&ccb=1-7&_nc_sid=18de74&_nc_ohc=uhMW8nZd2aQQ7kNvgEAxotp&_nc_ht=scontent.cdninstagram.com&oh=00_AYCYw0hwqZYZOvx5yBoYgRC-7TSn_4EM948i1VQjlFbGnQ&oe=66C9198D', url: 'https://www.instagram.com/p/C8TFS3RN7NY/?igsh=YzJveGNlaDR5eTM2' },
    { img: 'https://scontent.cdninstagram.com/v/t51.29350-15/447917819_1521210822162911_2581206446229681887_n.heic?stp=c216.0.648.648a_dst-jpg_s640x640&_nc_cat=111&cb=51254e2e-4fc41369&ccb=1-7&_nc_sid=18de74&_nc_ohc=8o_1XWGtT7wQ7kNvgFVGyYq&_nc_ht=scontent.cdninstagram.com&oh=00_AYAnspVomt7CxjiToIbhZPvKbMTY0xZMY8It24VpO8ZmeQ&oe=66C946D8' },

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
      cards[i].style.width = '44%';
      cards[i].style.height = 'auto';
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