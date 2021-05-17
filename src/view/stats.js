import AbstractView from '@view/abstract';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getUniqItems, countEventPriceByTypes, countEventsByType, countEventDurationByTypes} from '@utils/stats';
import {transformDurationToString} from '@utils/transform';

const renderMoneyChart = (moneyCtx, events, types) => {
  const priceByEventType = types.map((type) => countEventPriceByTypes(events, type));

  return new Chart (moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types.map((item) => item.toUpperCase()),
      datasets: [{
        data: priceByEventType,
        backgroundColor: '#158deb',
        hoverBackgroundColor: '#158deb',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 15,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 15,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
          padding: 5,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, events, types) => {
  const eventByTypeCounts = types.map((type) => countEventsByType(events, type));

  return new Chart (typeCtx, {
    plugins: types,
    type: 'horizontalBar',
    data: {
      labels: types.map((item) => item.toUpperCase()),
      datasets: [{
        data: eventByTypeCounts,
        backgroundColor: '#158deb',
        hoverBackgroundColor: '#158deb',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeSpendChart = (daysCtx, events, types) => {
  const eventByTimeDuration = types.map((type) => countEventDurationByTypes(events, type));

  return new Chart (daysCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types.map((item) => item.toUpperCase()),
      datasets: [{
        data: eventByTimeDuration,
        backgroundColor: '#158deb',
        hoverBackgroundColor: '#158deb',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => transformDurationToString(val),
        },
      },
      title: {
        display: true,
        text: 'TIME-SPEND',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsTemplate = () => {
  return `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>
  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>
  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>
  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>`;
};

export default class Stats extends AbstractView {
  constructor(events) {
    super();

    this._data = events;

    this._moneyCart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._uniqTypes = getUniqItems(this._data.map((event) => event.type));

    this._setCharts();
  }

  getTemplate() {
    return createStatsTemplate();
  }

  _setCharts() {
    if (this._moneyCart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyCart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    const daysCtx = this.getElement().querySelector('.statistics__chart--time');

    this._moneyCart = renderMoneyChart(moneyCtx, this._data, this._uniqTypes);
    this._typeChart = renderTypeChart(typeCtx, this._data, this._uniqTypes);
    this._timeChart = renderTimeSpendChart(daysCtx, this._data, this._uniqTypes);
  }
}
