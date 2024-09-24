import { computed, Injectable, signal } from '@angular/core';
import { Widget } from '../models/dashboard';
import { SubscribersComponent } from '../pages/dashboard/widgets/subscribers/subscribers.component';
import { ViewsComponent } from '../pages/dashboard/widgets/views/views.component';

@Injectable()
export class DashboardService {

  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Subscribers',
      content: SubscribersComponent
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent
    }
  ])

  addedWidgets = signal<Widget[]>([]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map(w => w.id)
    return this.widgets().filter(w => !addedIds.includes(w.id))

  })

  addWidget(w: Widget) {
    this.addedWidgets.set([...this.addedWidgets(), { ...w }]) //Original stays untoched
  }

  constructor() { }
}
