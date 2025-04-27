import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import OpenAI from 'openai';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private client: OpenAI;
  private endpoint = 'https://models.github.ai/inference';
  private model = 'openai/gpt-4.1';
  private githubToken = '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'; //token

  constructor() {
    // initialize with dangerouslyAllowBrowser flag
    this.client = new OpenAI({
      baseURL: this.endpoint,
      apiKey: this.githubToken,
      dangerouslyAllowBrowser: true // enable browser usage 
    });
  }

  /**
   * Send user input to the AI model and get a response
   * @param userInput - The text input from the user
   * @returns An Observable with the AI response
   */
  getAiResponse(userInput: string): Observable<string> {
    return from(this.processAiRequest(userInput));
  }

  /**
   * Process the AI request using the OpenAI client
   * @param userInput - The text input from the user
   * @returns Promise with the AI response text
   */
  private async processAiRequest(userInput: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant providing clear and short definitions." },
          { role: "user", content: userInput }
        ],
        temperature: 1,
        top_p: 1,
        model: this.model
      });

      return response.choices[0].message.content || 'No response generated';
    } catch (error) {
      console.error('Detailed API error:', error);
      throw error;
    }
  }
}