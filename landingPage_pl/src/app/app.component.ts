import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ContatoComponent } from './components/contato/contato.component';
import { DepoimentosComponent } from './components/depoimentos/depoimentos.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { PropostasComponent } from './components/propostas/propostas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, ContatoComponent, DepoimentosComponent, SobreComponent, PropostasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landingPage_pl';
}
