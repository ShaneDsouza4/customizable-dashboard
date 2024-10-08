import { computed, effect, Injectable, signal } from '@angular/core';
import { Widget } from '../models/dashboard';
import { SubscribersComponent } from '../pages/dashboard/widgets/subscribers/subscribers.component';
import { ViewsComponent } from '../pages/dashboard/widgets/views/views.component';
import { WatchTimeComponent } from '../pages/dashboard/widgets/watch-time/watch-time.component';
import { RevenueComponent } from '../pages/dashboard/widgets/revenue/revenue.component';
import { AnalyticsComponent } from '../pages/dashboard/widgets/analytics/analytics.component';
import { PieChartComponent } from '../pages/dashboard/widgets/pie-chart/pie-chart.component';
import { BarChartComponent } from '../pages/dashboard/widgets/bar-chart/bar-chart.component';
import { IncomeComponent } from '../pages/dashboard/widgets/income/income.component';

@Injectable()
export class DashboardService {

  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Total Budget',
      content: SubscribersComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#B61B1B',
      color: 'whitesmoke'
    },
    {
      id: 2,
      label: 'Expenses This Month',
      content: ViewsComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#B61B1B',
      color: 'whitesmoke'
    },
    {
      id: 3,
      label: 'Remaining Budget',
      content: WatchTimeComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#B61B1B',
      color: 'whitesmoke'
    },
    {
      id: 4,
      label: 'Largest Expense Category',
      content: RevenueComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#B61B1B',
      color: 'whitesmoke'
    },
    {
      id: 5,
      label: 'Analytics',
      content: AnalyticsComponent,
      rows: 2,
      columns: 2
    },
    {
      id: 6,
      label: 'Spending Categories',
      content: PieChartComponent,
      rows: 2,
      columns: 2
    },
    {
      id: 7,
      label: 'Monthly Expenses',
      content: BarChartComponent,
      rows: 2,
      columns: 2
    },
    {
      id: 8,
      label: 'Income This Month',
      content: IncomeComponent,
      rows: 1,
      columns: 1,
      backgroundColor: '#B61B1B',
      color: 'whitesmoke'
    },
  ])

  addedWidgets = signal<Widget[]>([]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map(w => w.id)
    return this.widgets().filter(w => !addedIds.includes(w.id));

  })


  addWidget(w: Widget) {
    this.addedWidgets.set([...this.addedWidgets(), { ...w }]) //Original stays untoched
  }

  updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = { ...newWidgets[index], ...widget }
      this.addedWidgets.set(newWidgets)
    }
  }

  moveWidgetToRight(id: number) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index == this.addedWidgets().length - 1) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index + 1]] = [{ ...newWidgets[index + 1] }, { ...newWidgets[index] }];

    this.addedWidgets.set(newWidgets)
  }

  moveWidgetToLeft(id: number) {
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index == 0) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index - 1]] = [{ ...newWidgets[index - 1] }, { ...newWidgets[index] }];

    this.addedWidgets.set(newWidgets)
  }

  removeWidget(id: number) {
    this.addedWidgets.set(this.addedWidgets().filter(w => w.id !== id))
  }

  fetchWidgets() {
    const widgetsAsString = localStorage.getItem('dashboardWidgets');
    if (widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as Widget[];
      widgets.forEach(widget => {
        const content = this.widgets().find(w => w.id === widget.id)?.content;
        if (content) {
          widget.content = content;
        }
      })

      this.addedWidgets.set(widgets)
    }
  }


  constructor() {
    this.fetchWidgets()
  }


  savedWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(w => ({ ...w }));
    widgetsWithoutContent.forEach(w => {
      delete w.content;
    })

    localStorage.setItem('dashboardWidgets', JSON.stringify(widgetsWithoutContent))

  })

  updateWidgetPosition(sourceWidgetId: number, targetWidgetId: number) {
    const sourceIndex = this.addedWidgets().findIndex(
      (w) => w.id === sourceWidgetId
    );

    if (sourceIndex === -1) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    const sourceWidget = newWidgets.splice(sourceIndex, 1)[0];

    const targerIndex = newWidgets.findIndex((w) => w.id == targetWidgetId);
    if (targerIndex == 1) {
      return;
    }

    const insertAt = targerIndex == sourceIndex ? targerIndex + 1 : targerIndex;



    //Insert source widget, in target index positon
    newWidgets.splice(insertAt, 0, sourceWidget)
    this.addedWidgets.set(newWidgets)

  }
}
