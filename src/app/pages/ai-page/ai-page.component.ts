import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AiService } from '../../services/ai.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-ai-page',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './ai-page.component.html',
  styleUrls: ['./ai-page.component.scss'],
})
export class AiPageComponent implements OnInit {
  termInput: string = '';
  generatedResult: string = '';
  isLoading: boolean = false;
  showSaveButton: boolean = false;

  constructor(private aiService: AiService, private toastController: ToastController) {}

  ngOnInit() {
    this.generatedResult = 'Ask me anything...';
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
      this.generatedResult = 'Please enter a term to search';
      this.showSaveButton = false;
      return;
    }

    try {
      this.isLoading = true;
      this.generatedResult = 'Thinking...';
      this.showSaveButton = false;

      this.aiService.getAiResponse(this.termInput)
        .pipe(finalize(() => {
          this.isLoading = false;
          console.log('Request completed');
        }))
        .subscribe({
          next: (response) => {
            console.log('Received response:', response);
            this.generatedResult = response || 'No response received';
            this.showSaveButton = true;
          },
          error: (error) => {
            console.error('Error in component:', error);
            this.generatedResult = 'Sorry, there was an error processing your request';
            this.showSaveButton = false;
          }
        });
    } catch (e) {
      console.error('Unexpected error:', e);
      this.isLoading = false;
      this.generatedResult = 'An unexpected error occurred';
      this.showSaveButton = false;
    }
  }

  saveResult() {
    if (this.generatedResult && this.generatedResult.trim()) {
      const savedResults = JSON.parse(localStorage.getItem('savedResults') || '[]');
      savedResults.push({
        term: this.termInput,
        result: this.generatedResult,
        date: new Date()
      });
      localStorage.setItem('savedResults', JSON.stringify(savedResults));
      console.log('Result saved to local storage.');

      this.termInput = '';
      this.generatedResult = '';
      this.showSaveButton = false;
    } else {
      console.warn('No result to save.');
    }
  }

  onTermInputChange() {
    if (!this.termInput.trim()) {
      this.generatedResult = '';
      this.showSaveButton = false;
    }
  }
}

