import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { DirectivesModule } from '../theme/directives/directives.module';
import { PipesModule } from '../theme/pipes/pipes.module';
import { routing } from './pages.routing';
import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';
import { MenuComponent } from '../theme/components/menu/menu.component';
import { SidebarComponent } from '../theme/components/sidebar/sidebar.component';
import { NavbarComponent } from '../theme/components/navbar/navbar.component';
import { MessagesComponent } from '../theme/components/messages/messages.component';
import { BreadcrumbComponent } from '../theme/components/breadcrumb/breadcrumb.component';
import { BackTopComponent } from '../theme/components/back-top/back-top.component';
import { SearchComponent } from './search/search.component';

import { OpportunityDetailsComponent } from './opportunity-details/opportunity-details.component';
import { ProductDemoComponent } from './product-demo/product-demo.component';
import { AboutComponent } from './about/about.component';
import { FileUploaderComponent } from './product-demo/file-uploader/file-uploader.component';
import { SolutionTrailTool } from './solution-trail-tool/solution-trail-tool.component';
import { QOComponent } from './qo-home/qo-home.component';
import { PDComponent } from './pd-home/pd-home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FilterPipe} from './qo-home/filter.pipe';
import { SortByPipe} from './qo-home/sortBy.pipe';

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,   
    DirectivesModule,
    PipesModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule
  ],
  declarations: [ 
    PagesComponent,
    BlankComponent,
    MenuComponent,
    SidebarComponent,
    NavbarComponent,
    MessagesComponent,
    BreadcrumbComponent,
    BackTopComponent,
    SearchComponent,
    OpportunityDetailsComponent,
    ProductDemoComponent,
    AboutComponent,
    FileUploaderComponent,
    SolutionTrailTool,
    QOComponent,
    PDComponent,
    FilterPipe,
    SortByPipe
  ],
  providers:[
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class PagesModule { }
