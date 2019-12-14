import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TrailstudioService } from '../../trailstudio.service'
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'Trail-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './Trail-home.component.html',
  styleUrls: ['./Trail-home.component.scss']
})

export class TrailComponent implements OnInit {

  qo:any;
  searchForm: FormGroup;
  constructor(private trailstudio: TrailstudioService,private router: Router,private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchTxt: [''],
      orderBy: ['asc'],
      customerAttr: [''],
    });
 this.getSolutionTrail();
  }


  getSolutionTrail(){
    this.trailstudio
    .getAllTrailsDetails()
    .subscribe((data) => {
      this.getAllTrailsDt();
    });
  }

  getAllTrailsDt(){
    this.trailstudio
    .getSolutionTrails()
    .subscribe((data) => {
      console.log(data);
      this.qo = data;
      console.log("I am called again..",this.qo);
    });
  }


  cardClicked(qo){
    this.router.navigate(['/pages/solutiontrailrequesttool'],{ queryParams: { trail: qo.trailid} });
  }
}
