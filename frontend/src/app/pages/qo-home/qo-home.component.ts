import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TrailstudioService } from '../../trailstudio.service'
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'qo-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './qo-home.component.html',
  styleUrls: ['./qo-home.component.scss']
})

export class QOComponent implements OnInit {

  qo: any;
  searchForm: FormGroup;
  quater: any;
  constructor(private trailstudio: TrailstudioService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchTxt: [''],
      orderBy: ['asc'],
      customerAttr: [''],
    });
    this.findQualifiedOpportunity();
  }


  //Get All Customer Details
  getQualifiedOpprtunity() {
    this.trailstudio
      .getQualifiedOpportunities()
      .subscribe((data) => {
        console.log(data);
        this.qo = data;
        //var q = data;
        for (var i = 0; i < this.qo.length; i++) {
          if (this.qo[i].q1 && this.qo[i].q2 && this.qo[i].q3 && this.qo[i].q4) {
            this.qo[i].q1 = (this.qo[i].q1) === 'Yes' ? 'Q1' : '';
            this.qo[i].q2 = (this.qo[i].q2) === 'Yes' ? 'Q2' : '';
            this.qo[i].q3 = (this.qo[i].q3) === 'Yes' ? 'Q3' : '';
            this.qo[i].q4 = (this.qo[i].q4) === 'Yes' ? 'Q4' : '';
            var text = [this.qo[i].q1, this.qo[i].q2, this.qo[i].q3, this.qo[i].q4].filter(Boolean).join(", ");

            this.qo[i].quater = text;
          }
        }
      });
  }


  findQualifiedOpportunity() {
    this.trailstudio
      .getAllQualifiedOpportunities()
      .subscribe((data) => {
        this.getQualifiedOpprtunity();
      });
  }

  cardClicked(qo) {
    this.router.navigate(['/pages/qualifiedopportunities'], { queryParams: { projectid: qo.projectid } });
  }

  public firstControlModel: number[];
  public firstControlOptions: IMultiSelectOption[] = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ];

  public secondControlModel: number[];
  public secondControlSettings: IMultiSelectSettings = {
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-secondary btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true,
    showCheckAll: true,
    showUncheckAll: true
  };
  public secondControlTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    defaultTitle: 'Select countries',
    allSelected: 'All selected',
  };
  public secondControlOptions: IMultiSelectOption[] = [
    { id: 1, name: 'Sweden' },
    { id: 2, name: 'Norway' },
    { id: 3, name: 'Canada' },
    { id: 4, name: 'USA' }
  ];


  public thirdControlModel: number[];
  public thirdControlSettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-secondary btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
  };
  public thirdControlTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find...',
    defaultTitle: 'Select countries',
    allSelected: 'All selected',
  };
  public thirdControlOptions: IMultiSelectOption[] = [
    { id: 1, name: 'Sweden' },
    { id: 2, name: 'Norway' },
    { id: 3, name: 'Canada' },
    { id: 4, name: 'USA' }
  ];


  public changeOrderBy() {
    console.log(this.firstControlModel);
  }
}
