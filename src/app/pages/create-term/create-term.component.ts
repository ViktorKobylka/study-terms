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
  termInput: string = ''; // input field for the term
  definitionInput: string = ''; // input field for the definition

  constructor() {}

  async saveTerm() {
    if (!this.termInput.trim() || !this.definitionInput.trim()) {
      console.warn('Term and definition are required'); // check if inputs are not empty
      return;
    }
  
    const { value } = await Storage.get({ key: 'savedResults' }); // read saved data
    const savedResults = value ? JSON.parse(value) : [];
  
    savedResults.push({
      term: this.termInput,
      result: this.definitionInput,
      date: new Date() // save the new entry with the current date
    });
  
    await Storage.set({
      key: 'savedResults',
      value: JSON.stringify(savedResults), // save the updated data
    });
  
    console.log('Term saved successfully!');
  
    this.termInput = ''; // clear input fields
    this.definitionInput = '';
  }
}



