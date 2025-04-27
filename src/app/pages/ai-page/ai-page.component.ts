import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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

  constructor(private aiService: AiService) {}

  sendResult() {
    if (!this.termInput || !this.termInput.trim()) {
      this.generatedResult = 'Please enter a term to search.';
      return;
    }
    
    try {
      this.isLoading = true;
      this.generatedResult = 'Thinking...';
      
      this.aiService.getAiResponse(this.termInput)
        .pipe(finalize(() => {
          this.isLoading = false;
          console.log('Request completed');
        }))
        .subscribe({
          next: (response) => {
            console.log('Received response:', response);
            this.generatedResult = response || 'No response received';
          },
          error: (error) => {
            console.error('Error in component:', error);
            this.generatedResult = 'Sorry, there was an error processing your request.';
          }
        });
    } catch (e) {
      console.error('Unexpected error:', e);
      this.isLoading = false;
      this.generatedResult = 'An unexpected error occurred.';
    }
  }

  ngOnInit() {
    this.generatedResult = 'Ask me anything...';
  }
}