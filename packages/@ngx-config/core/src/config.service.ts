// angular
import { Injectable } from '@angular/core';

// module
import { ConfigLoader } from './config.loader';

function mergeSetting(oldSetting: any, extraSetting: any, key: string): any {
  let newExtraSetting = extraSetting;
  // tslint:disable-next-line:curly
  if (key) { newExtraSetting = { [key]: extraSetting }; }
  // tslint:disable-next-line:curly
  if (oldSetting) { return { ...oldSetting, ...newExtraSetting }; } else {
    return newExtraSetting;
  }
}
@Injectable()
export class ConfigService {
  protected settings: any;

  constructor(public readonly loader: ConfigLoader) {
  }

  init(): any {
    return this.loader.loadSettings()
      .then((res: any) => this.settings = res);
  }
  load(loader: ConfigLoader, mergeHandler?: (oldSetting: any, extraSetting: any, key: string) => any): any {
    return loader.loadSettings()
      .then((res: any) => {
        if (!res) return;
        const extraSetting = res;
        const key = loader.key || '';
        const mergeFunction = (typeof mergeHandler === 'function') ? mergeHandler : mergeSetting;
        this.settings = mergeFunction(this.settings, extraSetting, key);
      });
  }

  getSettings(key?: string | Array<string>, defaultValue?: any): any {
    if (!key || (Array.isArray(key) && !key[0]))
      return this.settings;

    if (!Array.isArray(key))
      key = key.split('.');

    let result = key
      .reduce((acc: any, current: string) => acc && acc[current], this.settings);

    if (result === undefined) {
      result = defaultValue;

      if (result === undefined)
        throw new Error(`No setting found with the specified key [${key.join('/')}]!`);
    }

    return result;
  }
  
}
