import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
//import { IonInput, IonItem} from '@ionic/angular/standalone';

@Component({
  selector: 'app-ai-page',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './ai-page.component.html',
  styleUrls: ['./ai-page.component.scss'],
})
export class AiPageComponent  implements OnInit {
  termInput: string = '';
  generatedResult: string = '';

  saveResult() {
    this.generatedResult = this.termInput;
  }

  ngOnInit() {
    // Initialization logic (optional)
  }

}
