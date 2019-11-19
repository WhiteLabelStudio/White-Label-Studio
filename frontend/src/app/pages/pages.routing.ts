import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';
import { SearchComponent } from './search/search.component';

import { OpportunityDetailsComponent } from './opportunity-details/opportunity-details.component';
import { ProductDemoComponent } from './product-demo/product-demo.component';
import { AboutComponent } from './about/about.component';
import { SolutionTrailTool } from './solution-trail-tool/solution-trail-tool.component';
import { QOComponent } from './qo-home/qo-home.component';
import { PDComponent } from './pd-home/pd-home.component';
import { TrailComponent } from './Trail-home/Trail-home.component';
import { TrailDetailsComponent } from './trail-details/trail-details.component';

export const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'about', pathMatch:'full' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' }  },
            { path: 'maps', loadChildren: './maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
            { path: 'charts', loadChildren: './charting/charting.module#ChartingModule', data: { breadcrumb: 'Charts' } },
            { path: 'ui', loadChildren: './ui/ui.module#UiModule', data: { breadcrumb: 'UI' } },
            { path: 'tools', loadChildren: './tools/tools.module#ToolsModule', data: { breadcrumb: 'Tools' } },
            { path: 'mail', loadChildren: './mail/mail.module#MailModule', data: { breadcrumb: 'Mail' } },
            { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarModule', data: { breadcrumb: 'Calendar' } },
            { path: 'form-elements', loadChildren: './form-elements/form-elements.module#FormElementsModule', data: { breadcrumb: 'Form Elements' } },
           
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
            { path: 'editors', loadChildren: './editors/editors.module#EditorsModule', data: { breadcrumb: 'Editors' } },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule', data: { breadcrumb: 'Profile' }  }, 
            
           // { path: 'solution-trail-request-tool', loadChildren: './solution-trail-request-tool/solution-trail-request-tool.module#SolutionTrailRequestToolModule', data: { breadcrumb: 'Solution Trail request tool' } },  
         //   { path: 'solution-trail-tool', loadChildren: './solution-trail-tool/solution-trail-tool.module#SolutionTrailTool', data: { breadcrumb: 'solution-trail-tool' }  },  
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
            { path: 'qualifiedopportunities', component: OpportunityDetailsComponent, data: { breadcrumb: '1' }},
            { path: 'solutiontrailrequesttool', component: SolutionTrailTool},
            { path: 'productdemo', component: ProductDemoComponent},
            { path: 'about', component: AboutComponent},
            { path: 'qo-home', component: QOComponent},
            { path: 'trail-home', component: TrailComponent},
            { path: 'trail-details', component: TrailDetailsComponent},
            { path: 'pd-home', component: PDComponent}
            
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);