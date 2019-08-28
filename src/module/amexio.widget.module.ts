import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AmexioTabPillComponent } from '../index';

import { AmexioRuntimeModule } from './arc/amexio.arc.module';
import { AmexioBaseContextMenuModule } from './base/base.contextmenu.component.module';
import { AmexioCreativeModule } from './creative/amexio.creative.module';
import { AmexioDataModule } from './data/amexio.data.module';
import { AmexioFormsModule } from './forms/amexio.forms.module';
import { AmexioLayoutModule } from './layout/amexio.layout.module';
import { AmexioMediaModule } from './media/amexio.media.module';
import { AmexioNavModule } from './navigation/amexio.nav.module';
import { AmexioPaneModule } from './panes/amexio.pane.module';

import { CommonDataService } from './services/data/common.data.service';
import { DeviceQueryService } from './services/device/device.query.service';
import { IconLoaderService } from './services/icon/icon.service';
import { RouterService } from './services/routing/routing.service';

import { ColorPaletteDirective } from './directive/color-palette.directive';
import { AmexioFullScreenDirective } from './directive/full-screen.directive';
import { RoundEdgesDirective } from './directive/round-edge.directive';
import { RoutedirDirective } from './directive/router-animation.directive';

export * from './services/data/common.data.service';
export * from './services/device/device.query.service';
export * from './services/icon/icon.service';
export * from './services/icon/icon.mapping.config';
export * from '../models/creditcardmodel.component';
export * from '../models/GridConfig';
export * from '../models/GridConstants';
export * from '../models/googlemap.model';
export * from '../models/availableslots.model';
export * from '../models/day.model';
export * from '../models/time.model';
export * from '../models/time.util';
export * from '../models/propertyGridModel';
export * from './directive/router-animation.directive';
export * from './services/routing/routing.service';

@NgModule({
  imports: [
    CommonModule,
    AmexioFormsModule,
    AmexioNavModule,
    AmexioDataModule,
    AmexioLayoutModule,
    AmexioMediaModule,
    AmexioPaneModule,
    HttpClientModule,
    AmexioCreativeModule,
    AmexioBaseContextMenuModule,
    RouterModule,
  ],
  entryComponents: [AmexioTabPillComponent],
  exports: [
    AmexioFormsModule,
    AmexioNavModule,
    AmexioDataModule,
    AmexioLayoutModule,
    AmexioMediaModule,
    AmexioPaneModule,
    AmexioBaseContextMenuModule,
    AmexioCreativeModule,
    AmexioRuntimeModule,
    ColorPaletteDirective,
    RoundEdgesDirective,
    AmexioFullScreenDirective,
    RoutedirDirective,
  ],
  declarations: [ColorPaletteDirective, RoutedirDirective, RoundEdgesDirective, AmexioFullScreenDirective],
  providers: [CommonDataService, DeviceQueryService, IconLoaderService, RouterService],
})
export class AmexioWidgetModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioWidgetModule,
      providers: [CommonDataService, DeviceQueryService, IconLoaderService, RouterService],
    };
  }
}
