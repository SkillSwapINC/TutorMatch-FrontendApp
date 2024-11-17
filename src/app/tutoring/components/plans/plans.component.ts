import { Component } from '@angular/core';
import { PaymentComponent } from '../payment/payment.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";
import {LanguageSwitcherComponent} from "../../../public/components/language-switcher/language-switcher.component";

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, PaymentComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent {
  showPayment = false;
  selectedPlan = '';
  selectedPrice = 0;

  constructor(private router: Router) {}

  /**
   * @method togglePayment
   * @description This method toggles the payment form
   * @returns void
   */

  togglePayment() {
    this.showPayment = !this.showPayment;
  }

  /**
   * @method selectPlan
   * @description This method selects the plan and sets the selected plan and price
   * @param planName
   * @param price
   * @returns void
   */

  selectPlan(planName: string, price: number) {
    this.selectedPlan = planName;
    this.selectedPrice = price;
    this.togglePayment();
  }

  /**
   * @method onLogin
   * @description This method navigates to the login page
   * @returns void
   */

  onLogin() {
    this.router.navigate(['LogIn']);
  }

  /**
   * @method onSignUp
   * @description This method navigates to the register page
   * @returns void
   */

  onSignUp() {
    this.router.navigate(['Register']);
  }
}
