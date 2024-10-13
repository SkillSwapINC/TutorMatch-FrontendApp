import { Component } from '@angular/core';
import { PaymentComponent } from '../payment/payment.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, PaymentComponent, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent {
  showPayment = false;

  constructor(private router: Router) {}

  togglePayment() {
    this.showPayment = !this.showPayment;
  }

  onLogin() {
    this.router.navigate(['LogIn']);
  }

  onSignUp() {
    this.router.navigate(['Register']);
  }
}
