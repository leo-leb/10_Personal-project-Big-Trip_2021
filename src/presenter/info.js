import InfoView from '@view/info/info';
import {render, replace, remove} from '@utils/render';
import {RenderPosition} from 'consts';

export default class Info {
  constructor(parrent, eventsModel) {
    this._parrent = parrent;
    this._eventsModel = eventsModel;

    this._infoComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevInfoComponent = this._infoComponent;

    this._infoComponent = new InfoView(this._eventsModel.getEvents());

    if (prevInfoComponent === null) {
      render(this._parrent, this._infoComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
