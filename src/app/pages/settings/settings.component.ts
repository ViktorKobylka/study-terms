import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

  constructor(private toastController: ToastController) {}

  async clearLocalStorage() {
    localStorage.clear();
    console.log('Local storage cleared.');
    const toast = await this.toastController.create({
      message: 'Local storage cleared successfully!',
      duration: 1000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }
}
