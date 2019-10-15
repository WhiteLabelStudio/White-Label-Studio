import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { DirectivesModule } from '../../theme/directives/directives.module';
/*import { InputsComponent } from './inputs/inputs.component';
import { FileUploaderComponent } from './inputs/file-uploader/file-uploader.component';
import { ImageUploaderComponent } from './inputs/image-uploader/image-uploader.component';
import { MultipleImageUploaderComponent } from './inputs/multiple-image-uploader/multiple-image-uploader.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ValidationsComponent } from './validations/validations.component';
import { WizardComponent } from './wizard/wizard.component';
*/

import { SolutionTrailTool } from './solution-trail-tool/solution-trail-tool.component';


export const routes = [
  { path: '', redirectTo: 'solution-trail-tool', pathMatch: 'full'},
  { path: 'solution-trail-tool', component: SolutionTrailTool, data: { breadcrumb: 'Solution Trail Tool' } }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    DirectivesModule,    
    RouterModule.forChild(routes)
  ],
  declarations: [
    SolutionTrailTool
  ]
})
export class SolutionTrailRequestToolModule { }
