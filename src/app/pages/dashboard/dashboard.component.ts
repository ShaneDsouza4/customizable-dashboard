import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget.component';
import { Widget } from '../../models/dashboard';
import { SubscribersComponent } from './widgets/subscribers/subscribers.component';
import { DashboardService } from '../../services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { wrapGrid } from 'animate-css-grid';
import { CdkDragDrop, CdkDropList, CdkDropListGroup, DragDropModule } from "@angular/cdk/drag-drop"

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, WidgetComponent, MatButtonModule, MatIcon, MatMenuModule, CdkDropList, CdkDropListGroup, DragDropModule],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  store = inject(DashboardService)

  dashboard = viewChild.required<ElementRef>('dashboard');

  ngOnInit() {
    wrapGrid(this.dashboard().nativeElement, { duration: 300 })
  }

  drop(event: CdkDragDrop<number, any>) {
    const { previousContainer, container } = event;
    this.store.updateWidgetPosition(previousContainer.data, container.data)
  }
}
