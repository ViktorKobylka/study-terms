import { Routes } from '@angular/router';
import { AiPageComponent } from './pages/ai-page/ai-page.component';
import { CreateTermComponent } from './pages/create-term/create-term.component';
import { TermsComponent } from './pages/terms/terms.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'ai', pathMatch: 'full' },
  { path: 'ai', component: AiPageComponent },
  { path: 'create-term', component: CreateTermComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'settings', component: SettingsComponent },
];
