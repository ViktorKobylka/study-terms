import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AiService } from '../../services/ai.service';
import { finalize } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-ai-page',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './ai-page.component.html',
  styleUrls: ['./ai-page.component.scss'],
})
export class AiPageComponent implements OnInit {
  termInput: string = ''; // input field for the search term
  generatedResult: string = ''; // the AI response
  isLoading: boolean = false; // loading state
  showSaveButton: boolean = false; // show the Save button

  constructor(private aiService: AiService, private toastController: ToastController) {}

  ngOnInit() {
    this.generatedResult = 'Ask me anything...'; // default message
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'danger',
    });
    toast.present();
  }

  send() {
    if (!this.termInput || !this.termInput.trim()) {
      this.generatedResult = 'Please enter a term to search'; // check if input is empty
      this.showSaveButton = false;
      return;
    }

    try {
      this.isLoading = true;
      this.generatedResult = 'Thinking...'; // show loading text
      this.showSaveButton = false;

      this.aiService.getAiResponse(this.termInput)
        .pipe(finalize(() => {
          this.isLoading = false; // end loading state
          console.log('Request completed');
        }))
        .subscribe({
          next: (response) => {
            console.log('Received response:', response);
            this.generatedResult = response || 'No response received'; // show AI response
            this.showSaveButton = true;
          },
          error: (error) => {
            console.error('Error in component:', error);
            this.generatedResult = 'Sorry, there was an error processing your request'; // handle error
            this.showSaveButton = false;
          }
        });
    } catch (e) {
      console.error('Unexpected error:', e);
      this.isLoading = false;
      this.generatedResult = 'An unexpected error occurred'; // handle unexpected errors
      this.showSaveButton = false;
    }
  }

  async saveResult() {
    if (this.generatedResult && this.generatedResult.trim()) {
      const { value } = await Storage.get({ key: 'savedResults' });
      const savedResults = value ? JSON.parse(value) : [];
  
      savedResults.push({
        term: this.termInput,
        result: this.generatedResult,
        date: new Date() // save AI-generated result
      });
  
      await Storage.set({
        key: 'savedResults',
        value: JSON.stringify(savedResults), // save updated results
      });
  
      console.log('Result saved to Capacitor Storage.');
  
      this.termInput = ''; // clear input
      this.generatedResult = ''; // clear result
      this.showSaveButton = false;
    } else {
      console.warn('No result to save.'); // warn if no result to save
    }
  }

  onTermInputChange() {
    if (!this.termInput.trim()) {
      this.generatedResult = ''; // clear result when input is empty
      this.showSaveButton = false;
    }
  }
}


