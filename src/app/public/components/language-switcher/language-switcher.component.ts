import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MatMenuItem} from "@angular/material/menu";
@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [MatMenuItem],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  constructor(private translate: TranslateService) { }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }
}
