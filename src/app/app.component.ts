import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterContentComponent} from "./public/components/footer-content/footer-content.component";
import {DashboardModule} from "./tutoring/components/dashboard/dashboard.module";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DashboardModule, FooterContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TutorMatch-FrontendApp';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('es');
    translate.use('en');
  }
}
