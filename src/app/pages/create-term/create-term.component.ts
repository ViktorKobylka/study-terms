import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

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

  async saveTerm() {
    if (!this.termInput.trim() || !this.definitionInput.trim()) {
      console.warn('Term and definition are required');
      return;
    }
  
    const { value } = await Storage.get({ key: 'savedResults' });
    const savedResults = value ? JSON.parse(value) : [];
  
    savedResults.push({
      term: this.termInput,
      result: this.definitionInput,
      date: new Date()
    });
  
    await Storage.set({
      key: 'savedResults',
      value: JSON.stringify(savedResults),
    });
  
    console.log('Term saved successfully!');
  
    this.termInput = '';
    this.definitionInput = '';
  }
}


