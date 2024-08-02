import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
  selector: 'app-subfooter',
  templateUrl: './subfooter.component.html',
  styleUrls: ['./subfooter.component.css']
})
export class SubfooterComponent implements OnInit {
  ngOnInit(): void {
    this.checkScroll();
  }

  private checkScroll(): void {
    // Your checkScroll logic here
  }
}
