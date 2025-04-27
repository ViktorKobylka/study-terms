import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Storage } from '@capacitor/storage';

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
    await Storage.clear();
    console.log('Capacitor Storage cleared.');
  
    const toast = await this.toastController.create({
      message: 'Storage cleared successfully!',
      duration: 1000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }
}
