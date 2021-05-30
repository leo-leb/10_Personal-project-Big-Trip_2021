import AbstractView from '@view/abstract';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getUniqItems, countEventPriceByTypes, countEventsByType, countEventDurationByTypes} from '@utils/stats';
import {transformDurationToString} from '@utils/transform';

const renderMoneyChart = (moneyCtxElement, events, types) => {
  const priceByEventType = types.map((type) => countEventPriceByTypes(events, type));
  let data = [];
  const getPriceOfTypes = () => {
    for (const type of types) {
      data.push({
        type: type,
        price: priceByEventType[types.indexOf(type)],
      });
    }
    return data;
  };
  const result = getPriceOfTypes().sort((firstItem, secondItem) => {
    return secondItem.price - firstItem.price;
  });
  data = result;

  return new Chart (moneyCtxElement, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: data.map((item) => item.type.toUpperCase()),
      datasets: [{
        data: data.map((item) => item.price),
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

const renderTypeChart = (typeCtxElement, events, types) => {
  const eventByTypeCounts = types.map((type) => countEventsByType(events, type));
  let data = [];
  const getCountOfTypes = () => {
    for (const type of types) {
      data.push({
        type: type,
        count: eventByTypeCounts[types.indexOf(type)],
      });
    }
    return data;
  };
  const result = getCountOfTypes().sort((firstItem, secondItem) => {
    return secondItem.count - firstItem.count;
  });
  data = result;

  return new Chart (typeCtxElement, {
    plugins: types,
    type: 'horizontalBar',
    data: {
      labels: data.map((item) => item.type.toUpperCase()),
      datasets: [{
        data: data.map((item) => item.count),
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
            fontSize: 15,
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

const renderTimeSpendChart = (daysCtxElement, events, types) => {
  const eventByTimeDuration = types.map((type) => countEventDurationByTypes(events, type));
  let data = [];
  const getDurationOfTypes = () => {
    for (const type of types) {
      data.push({
        type: type,
        duration: eventByTimeDuration[types.indexOf(type)],
      });
    }
    return data;
  };
  const result = getDurationOfTypes().sort((firstItem, secondItem) => {
    return secondItem.duration - firstItem.duration;
  });
  data = result;

  return new Chart (daysCtxElement, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: data.map((item) => item.type.toUpperCase()),
      datasets: [{
        data: data.map((item) => item.duration),
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
            fontSize: 15,
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

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._uniqTypes = getUniqItems(this._data.map((event) => event.type));

    this._setCharts();
  }

  getTemplate() {
    return createStatsTemplate();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCtxElement = this.getElement().querySelector('.statistics__chart--money');
    const typeCtxElement = this.getElement().querySelector('.statistics__chart--transport');
    const daysCtxElement = this.getElement().querySelector('.statistics__chart--time');

    this._moneyChart = renderMoneyChart(moneyCtxElement, this._data, this._uniqTypes);
    this._typeChart = renderTypeChart(typeCtxElement, this._data, this._uniqTypes);
    this._timeChart = renderTimeSpendChart(daysCtxElement, this._data, this._uniqTypes);
  }
}
