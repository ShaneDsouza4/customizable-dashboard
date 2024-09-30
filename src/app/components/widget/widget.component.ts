import { Component, input, signal } from '@angular/core';
import { Widget } from '../../models/dashboard';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { WidgetOptionsComponent } from './widget-options/widget-options.component';
import { CdkDrag, DragDropModule, CdkDragPlaceholder } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [CommonModule, NgComponentOutlet, MatButtonModule, MatIcon, WidgetOptionsComponent, CdkDrag, DragDropModule, CdkDragPlaceholder],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
  host: {
    '[style.grid-area]': '"span " + (data().rows ?? 1) + "/ span " + (data().columns ?? 1)'
  }
})
export class WidgetComponent {
  data = input.required<Widget>()

  showOptions = signal(false)
}
