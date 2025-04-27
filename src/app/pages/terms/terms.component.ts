import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
  savedResults: any[] = [];

  constructor() {}

  ngOnInit() {
    this.loadSavedResults();
  }

  loadSavedResults() {
    const saved = localStorage.getItem('savedResults');
    this.savedResults = saved ? JSON.parse(saved) : [];
  }

  deleteResult(index: number) {
    this.savedResults.splice(index, 1); // remove item at index
    localStorage.setItem('savedResults', JSON.stringify(this.savedResults));
  }

  refreshPage() {
    this.loadSavedResults();
  }
  
}
