import {Collection, Model, Events} from 'backbone';
import {extend} from 'underscore';
import {SelectableCollection} from './selectable.collection';
import {SelectableModel} from '../models/selectable.model';

export class Selectable {
  private _collection: SelectableCollection<SelectableModel>;
  private _options: any;
  private _modelHasDisabledFn: boolean = true;
  private _isSingleSelection: boolean;
  private _addPreSelectedToCollection: boolean;
  private _unSelectOnRemove: boolean;
  private _preSelected: SelectableCollection<SelectableModel> | SelectableModel;
  private _hasPreSelectedItems: boolean;
  private _selected: SelectableCollection<SelectableModel>;
  public trigger: (name: string, options: any, context?: any)=>{};
  public on: (name: string, callback: Function, context?: any)=>{};
  public off: (name: string, callback: Function, context?: any)=>{};

  constructor(collectionInstance: SelectableCollection<SelectableModel>, options: any = {}) {
    this._collection = collectionInstance;
    this._options = options;
    this._isSingleSelection = options.isSingleSelection || false;
    this._addPreSelectedToCollection = options.addPreSelectedToCollection || false;
    this._unSelectOnRemove = options.unSelectOnRemove || false;
    this._preSelected = options.preSelected;
    this._hasPreSelectedItems = !!options.preSelected;
    this._selected = new SelectableCollection(null, {selectable: false});

    if (!(this._collection instanceof SelectableCollection)) {
      throw new Error('The first parameter has to be from type Backbone.Collection');
    }

    this._collection.each((model: SelectableModel)=>{
      this._modelHasDisabledFn = model.selectable.hasDisabledFn;
      this._setModelSelectableOptions.call(this, model);
      this._updateSelectedModel.call(this, model);
    });

    this._collection.on('add', (model: SelectableModel) => {
      this._modelHasDisabledFn = model.selectable.hasDisabledFn;
      this._setModelSelectableOptions.call(this, model);
      this._updateSelectedModel.call(this, model);
    }, this);

    this._collection.on('remove', (model: SelectableModel) => {
      if (this._unSelectOnRemove) {
        this.unSelect(model);
      } else {
        this._setModelSelectableOptions.call(this, model);
      }
    }, this);

    this._collection.on('reset', () => {
      if (this._unSelectOnRemove) {
        this.unSelectAll();
      } else {
        this.getSelected().each((model) => {
          this._setModelSelectableOptions.call(this, model);
        }, this);
      }
    }, this);

    if (this._hasPreSelectedItems) {
      this._preselect.call(this);
    }
  }


  private _preselect() {
    if (this._preSelected instanceof SelectableModel) {
      this._isSingleSelection = true;
      this.preSelectModel(this._preSelected);
    } else if (this._preSelected instanceof SelectableCollection) {
      this._isSingleSelection = false;
      this.preSelectCollection(this._preSelected);
    } else {
      throw new Error('The option preSelected has to be either a Backbone Model or Collection');
    }
  };

  private _selectWhenModelIsSelected(model: SelectableModel) {
    if (!this._selected.get(model)) {
      this.select(model);
    }
  };

  private _unSelectWhenModelIsUnSelected(model: SelectableModel) {
    if (this._selected.get(model)) {
      this.unSelect(model);
    }
  };

  private _unSelectWhenModelIsUnset(model: SelectableModel, opts: any = {}) {
    if (opts.unset || !model.id || model.id.length < 1) {
      this.unSelect(model);
    }
  };

  private _bindModelOnSelectListener(model: SelectableModel) {
    model.selectable.off('change:select', this._selectWhenModelIsSelected, this);
    model.selectable.on('change:select', this._selectWhenModelIsSelected, this);
  };

  private _bindModelOnUnSelectListener(model: SelectableModel) {
    model.selectable.off('change:unselect', this._unSelectWhenModelIsUnSelected, this);
    model.selectable.on('change:unselect', this._unSelectWhenModelIsUnSelected, this);
  };

  private _setModelSelectableOptions(model: SelectableModel, options: any = {}) {
    if (model && model.selectable) {
      let selectedModel = this._selected.get(model);

      if (selectedModel) {
        if (this._collection.get(model)) {
          model.selectable.isInCollection = true;
          selectedModel.selectable.isInCollection = true;
        } else {
          model.selectable.isInCollection = false;
          selectedModel.selectable.isInCollection = false;
        }
        model.selectable.select(options);
        selectedModel.selectable.select(options);
      } else {
        model.selectable.unSelect(options);
      }

      this._bindModelOnSelectListener.call(this, model);
      this._bindModelOnUnSelectListener.call(this, model);
    }
  };

  private _updatePreSelectedModel(preSelectedModel: SelectableModel, model: SelectableModel) {
    if (this._hasPreSelectedItems) {
      if (this._preSelected instanceof SelectableModel) {
        this._preSelected = model;
      } else if (this._preSelected instanceof SelectableCollection) {
        this._preSelected.remove(preSelectedModel, {silent: true});
        this._preSelected.add(model, {silent: true});
      }
    }
  };

  private _updateSelectedModel(model: SelectableModel) {
    var selectedModel = this.getSelected().get(model);
    if (selectedModel) {
      this.unSelect(selectedModel, {silent: true});
      this.select(model, {silent: true});
      this._updatePreSelectedModel.call(this, selectedModel, model);
      this._setModelSelectableOptions.call(this, selectedModel, {silent: true});
    }
  };

  public getSelected(): SelectableCollection<SelectableModel> {
    return this._selected;
  };

  public getDisabled(): SelectableCollection<SelectableModel> {
    var disabled = new SelectableCollection(null, {selectable: false});
    if (this._modelHasDisabledFn) {
      this._collection.each(function (model) {
        if (model.selectable && model.selectable.isDisabled()) {
          disabled.add(model);
        }
      });
    }

    return disabled;
  };

  public select(model: SelectableModel, options: any = {}) {
    if (model instanceof SelectableModel) {
      if (!(model instanceof this._collection.model)) {
        model = new this._collection.model(model.toJSON());
      }

      if (!model.selectable || (model.selectable.isDisabled() && !options.force)) {
        return;
      }

      if (this._isSingleSelection) {
        this.unSelectAll();
      }

      if (this._collection.get(model)) {
        model = this._collection.get(model);
      }

      model.on('change', this._unSelectWhenModelIsUnset, this);

      this._selected.add(model, options);
      this._setModelSelectableOptions.call(this, model, options);
      if (!options.silent) {
        this.trigger('change change:add', model, this);
      }
    } else {
      throw new Error('The first argument has to be a Backbone Model');
    }
  };

  public selectAll() {
    this._collection.each(function (model: SelectableModel) {
      this.select(model);
    }, this);
  };

  public unSelect(model: SelectableModel, options: any = {}) {
    options = options || {};
    model.off('change', this._unSelectWhenModelIsUnset, this);
    this._selected.remove(model, options);
    this._setModelSelectableOptions.call(this, model, options);
    if (!options.silent) {
      this.trigger('change change:remove', model, this);
    }
  };

  public unSelectAll() {
    this.getSelected().each((model: SelectableModel) => {
      if((model instanceof SelectableModel)){
        this.unSelect(model);
      }
    }, this);
  };

  public toggleSelectAll() {
    if (this.allSelected()) {
      this.unSelectAll();
    } else {
      this.selectAll();
    }
  };

  public allSelected() {
    var disabledModelsAmount = this.getDisabled().length;

    return this.getSelected().length === this._collection.length - disabledModelsAmount;
  };

  public allDisabled() {
    return this.getDisabled().length === this._collection.length;
  };

  public isSingleSelection() {
    return this._isSingleSelection;
  };

  public reset = function () {
    this.unSelectAll();
    this._preselect.call(this);
  };

  public preSelectModel(model: SelectableModel) {
    if (model.id) {

      this._hasPreSelectedItems = true;

      if (!this._collection.get(model) && this._addPreSelectedToCollection) {
        this._collection.add(model);
      } else if (this._collection.get(model)) {
        model = this._collection.get(model);
      }

      this.select(model, {force: true, silent: true});
    }
  };

  public preSelectCollection(collection: SelectableCollection<SelectableModel>) {
    collection.each((model: SelectableModel) => {
      this.preSelectModel(model);
    }, this);

    collection.on('add', (model: SelectableModel) => {
      this.preSelectModel(model);
    }, this);

    collection.on('remove', (model: SelectableModel) => {
      this.unSelect(model);
    }, this);

  };

  public setCollectionFromSelection(collection: SelectableCollection<SelectableModel>) {
    let selected = this.getSelected();
    if (collection instanceof SelectableCollection) {
      collection.reset(selected.toJSON());
    } else {
      throw new Error('[Selectable] The passed collection is not an instance of mwUI.Backbone.Collection');
    }
    return collection;
  };

  public setModelFromSelection(model: SelectableModel) {
    let selected = this.getSelected();
    if (model instanceof SelectableModel) {
      if (selected.length === 0) {
        model.clear();
      } else {
        model.set(selected.first().toJSON());
      }
    } else {
      throw new Error('[Selectable] The passed model is not an instance of Backbone.Model');
    }
    return model;
  };

  public useSelectionFor = function (modelOrCollection: SelectableModel | SelectableCollection<SelectableModel>) {
    if (modelOrCollection instanceof SelectableModel) {
      return this.setModelFromSelection(modelOrCollection);
    } else if (modelOrCollection instanceof SelectableCollection) {
      return this.setCollectionFromSelection(modelOrCollection);
    }
  };
}

extend(Selectable.prototype, Events);
