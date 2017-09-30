export abstract class ConfigLoader {
  key?: string;
  abstract loadSettings(): any;
}

export class ConfigStaticLoader implements ConfigLoader {
  constructor(private readonly providedSettings?: any) {
  }

  loadSettings(): any {
    return Promise.resolve(this.providedSettings);
  }
}
