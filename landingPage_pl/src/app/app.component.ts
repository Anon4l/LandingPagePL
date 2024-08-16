import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardsComponent } from './components/cards/cards.component';
import { VideosPoliticoComponent } from './components/cardsvideo/cardsvideo.component';
import { CompromissoComponent } from './compromisso/compromisso.component';
import { SubfooterComponent } from './components/subfooter/subfooter.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SubfooterComponent,VideosPoliticoComponent, CardsComponent, FooterComponent, RouterOutlet, HeaderComponent, HomeComponent, SobreComponent, CompromissoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landingPage_pl';
}
