import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/angular';

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

  handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    this.loadSavedResults();

    const from = event.detail.from;
    const to = event.detail.to;

    const movedItem = this.savedResults.splice(from, 1)[0];
    this.savedResults.splice(to, 0, movedItem);

    localStorage.setItem('savedResults', JSON.stringify(this.savedResults));

    event.detail.complete();
  }

  deleteResult(index: number) {
    this.loadSavedResults();
    
    this.savedResults.splice(index, 1);
    localStorage.setItem('savedResults', JSON.stringify(this.savedResults));
  }

  refreshPage() {
    this.loadSavedResults();
  }
}
