import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-create-term',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './create-term.component.html',
  styleUrls: ['./create-term.component.scss'],
})
export class CreateTermComponent {
  termInput: string = '';
  definitionInput: string = '';

  constructor() {}

  saveTerm() {
    if (!this.termInput.trim() || !this.definitionInput.trim()) {
      console.warn('Term and definition are required');
      return;
    }

    const savedResults = JSON.parse(localStorage.getItem('savedResults') || '[]');

    savedResults.push({
      term: this.termInput,
      result: this.definitionInput,
      date: new Date()
    });

    localStorage.setItem('savedResults', JSON.stringify(savedResults));

    console.log('Term saved successfully!');

    this.termInput = '';
    this.definitionInput = '';
  }
}


