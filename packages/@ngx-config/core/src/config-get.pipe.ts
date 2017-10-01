// angular
import { Injectable, Pipe, PipeTransform } from '@angular/core';

// module
import { ConfigService } from './config.service';

@Injectable()
@Pipe({
  name: 'configGet'
})
export class ConfigGetPipe implements PipeTransform {
  constructor(private readonly config: ConfigService) {
  }
  transform(id: any, args?: any): any {
    if (!id) { return undefined; }
    if (Array.isArray(args) && typeof args !== 'string') { return id; }
    const configKey = args;
    const host = this.config.getSettings(configKey);
    const key = 'id';
    const field = 'name';

    if (Array.isArray(host)) {
      // tslint:disable-next-line:triple-equals
      const obj = host.find(item => item[key] == id);

      return (!!obj && !!obj[field]) ? obj[field] : undefined;
    }

    return id;

  }
}
