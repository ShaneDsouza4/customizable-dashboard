import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget.component';
import { Widget } from '../../models/dashboard';
import { SubscribersComponent } from './widgets/subscribers/subscribers.component';
import { DashboardService } from '../../services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, WidgetComponent, MatButtonModule, MatIcon, MatMenuModule],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  store = inject(DashboardService)
}
