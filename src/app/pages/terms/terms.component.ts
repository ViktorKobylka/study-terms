import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

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

  ionViewWillEnter() {
    this.loadSavedResults();
  }

  async loadSavedResults() {
    const saved = await Storage.get({ key: 'savedResults' });
    this.savedResults = saved.value ? JSON.parse(saved.value) : [];
  }

  async handleReorder(event: CustomEvent) {
    const from = event.detail.from;
    const to = event.detail.to;

    const movedItem = this.savedResults.splice(from, 1)[0];
    this.savedResults.splice(to, 0, movedItem);

    this.savedResults = [...this.savedResults];

    await this.saveResultsToStorage();

    event.detail.complete();
  }

  async deleteResult(index: number) {
    this.savedResults.splice(index, 1);
    await this.saveResultsToStorage();
  }

  async addTerm(term: string, definition: string) {
    const newTerm = { term, result: definition, date: new Date() };
    this.savedResults.push(newTerm);
    await this.saveResultsToStorage();
  }

  private async saveResultsToStorage() {
    await Storage.set({
      key: 'savedResults',
      value: JSON.stringify(this.savedResults),
    });
  }

  refreshPage() {
    this.loadSavedResults();
  }
}





