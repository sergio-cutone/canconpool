import { Component, OnInit } from '@angular/core';
import { Config, ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ConfigService],
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  constructor(private configService: ConfigService) {}

  headers: string[] = [];
  config: Config | undefined;

  showConfig() {
    this.configService
      .getConfig()
      // clone the data object, using its known Config shape
      .subscribe(
        (data:Config) =>
          (this.config = {
            playerUrl: data.playerUrl,
          })
      );
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
  
        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body! };
      });
  }

}
