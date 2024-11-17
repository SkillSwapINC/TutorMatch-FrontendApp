import { Component } from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-footer-content',
  standalone: true,
  imports: [
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './footer-content.component.html',
  styleUrl: './footer-content.component.css'
})
export class FooterContentComponent {
  constructor(private translate: TranslateService)
  {

    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');


    const browserLang = translate.getBrowserLang() || 'en';


    translate.use(browserLang);
  }

  changeLanguage() {
    this.translate.use(this.translate.currentLang === 'en' ? 'es' : 'en');
  }
}
