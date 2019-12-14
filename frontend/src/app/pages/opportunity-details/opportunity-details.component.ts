import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CountriesService } from '../../../countries.service';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

import { TrailstudioService } from '../../trailstudio.service'
import { NgForm } from '@angular/forms';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'opportunity-details',
  templateUrl: './opportunity-details.component.html',
  styleUrls: ['./opportunity-details.component.scss']
})
export class OpportunityDetailsComponent implements OnInit {

  contacts: any[];
  customerInfo: any;
  update: any;
  qualifiedOpportunitiesForm: FormGroup;
  customerForm: FormGroup;
  contactsForm: FormGroup;
  stateInfo: any;
  stateInfoArr: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  submitted: any;
  projectInfo: any;
  saveCustomerFlag: any;
  project: any;
  contactItems: {
    name: string;
    jobTitle: string;
    contactEmail: string;
    contactPhone: string;
  }[];


  items: FormArray;
  constructor(private country: CountriesService, private trailstudio: TrailstudioService, private formBuilder: FormBuilder, public toastrService: ToastrService,
    public route: ActivatedRoute) {
    this.contactItems = [{ name: "", jobTitle: "", contactEmail: "", contactPhone: "" }
    ];
  }

  /* getCountryName(n) {
     //this.qualifiedOpportunitiesForm.value.countryName = this.countryInfo[n].CountryName;
     return this.countryInfo[n].CountryName;
   }
 
 
   getStateName(n) {
     // this.qualifiedOpportunitiesForm.value.stateName = this.stateInfo[n].StateName;
     return this.stateInfo[n].StateName;
   }*/


  ngOnInit() {
    this.submitted = false;
    this.update = false;
    this.saveCustomerFlag = false;
    jQuery('[data-toggle="tooltip"]').tooltip({
      sanitize: false,
      sanitizeFn: function (content) {
        return null;
      }
    });
    jQuery('[data-toggle="popover"]').popover({
      sanitize: false,
      sanitizeFn: function (content) {
        return null;
      }
    });

    this.getCountries();
    this.getAllCustomerDetails();
    this.initilizeQualifiedOpportunity();
    this.initilizeCustomerDetails();
    this.getProject();

    this.route.queryParams.subscribe(paramsId => {
      this.project = paramsId.projectid;
      if (paramsId.projectid) {
        this.trailstudio
          .getProjectDetails(this.project)
          .subscribe((data) => {
            this.trailstudio
              .getProject()
              .subscribe((data) => {
                this.projectInfo = data;
                console.log(this.projectInfo[0]);
                this.qualifiedOpportunitiesForm = this.formBuilder.group({
                  customerId: [this.projectInfo[0].customerid],
                  customerName: [this.projectInfo[0].customername],
                  customerType: [this.projectInfo[0].customertype],
                  interestedProduct: [this.projectInfo[0].interestedproduct],
                  probability: [this.projectInfo[0].probability],
                  region: [this.projectInfo[0].region],
                  q1: [this.projectInfo[0].q1],
                  q2: [this.projectInfo[0].q2],
                  q3: [this.projectInfo[0].q3],
                  q4: [this.projectInfo[0].q4],
                  endCustomerFlag: [this.projectInfo[0].endCustomerFlag],
                  qualifiedOpportunity: [this.projectInfo[0].qualifiedOpportunity],
                  endCustomerName: [this.projectInfo[0].endCustomerName],
                  country: [this.projectInfo[0].country],
                  state: [this.projectInfo[0].state],
                  year: [this.projectInfo[0].year],
                  status: [this.projectInfo[0].status],
                  revenue: [this.projectInfo[0].revenue],
                  salesEngineer: [this.projectInfo[0].salesEngineer],
                  items: this.formBuilder.array(
                    this.getAllItems(this.projectInfo[0].items))
                });
              });
          });
      }
    });
  }
  //this.projectInfo[0].
  getAllItems(arr) {
    var contactsArr = [];
    for (var i = 0; i < arr.length; i++) {
      var contactObj = this.formBuilder.group({
        name: arr[i].name,
        contactPhone: arr[i].contactPhone,
        jobTitle: arr[i].jobTitle,
        contactEmail: arr[i].contactEmail
      })
      contactsArr.push(contactObj);
    }
    return contactsArr;
  }



  initilizeCustomerDetails() {
    this.customerForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerType: [''],
      region: [''],
      status: [''],
      country: [''],
      state: [''],
    });
  }


  initilizeQualifiedOpportunity() {
    this.qualifiedOpportunitiesForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      customerName: [''],
      customerType: [''],
      interestedProduct: [''],
      probability: [''],
      region: [''],
      q1: [''],
      q2: [''],
      q3: [''],
      q4: [''],
      endCustomerFlag: ['Yes'],
      qualifiedOpportunity: ['Yes'],
      endCustomerName: [''],
      country: [''],
      state: [],
      year: ['2019'],
      status: [''],
      endCustomerInfrastructure: [''],
      revenue: [''],
      salesEngineer:[''],
      items: this.formBuilder.array([this.createItem()])
    });
  }


  createItem() {
    return this.formBuilder.group({
      name: '',
      jobTitle: '',
      contactEmail: '',
      contactPhone: ''
    });
  }


  //---------------------------------- Get all Data ----------------------------------------

  getProject() {
    this.route.queryParams.subscribe(paramsId => {
      this.project = paramsId.projectid;
      if (this.project)
        this.update = true;
    });
  }

  /* //Get Project
   getProject(){
     this.route.queryParams.subscribe(paramsId => {
       this.project = paramsId.projectid;
       return this.project;
   }
 
   //Get Project Details
   getProj(){
     this.trailstudio
     .getProject()
     .subscribe((data) => {
       console.log(data);
       this.projectInfo = data;
      // this.qualifiedOpportunitiesForm.value.customerId = this.projectInfo.customerid;
       //this.qualifiedOpportunitiesForm.value.customerName = this.projectInfo.customername;
     //  this.qualifiedOpportunitiesForm.value.customerName = this.projectInfo.customername;
       this.qualifiedOpportunitiesForm = this.formBuilder.group({
         customerId: [this.projectInfo.customerid],
         customerName: [this.projectInfo.customername],
         customerType: [''],
         interestedProduct: [''],
         probability: [''],
         region: [''],
         q1: [''],
         q2: [''],
         q3: [''],
         q4: [''],
         endCustomerFlag: ['Yes'],
         qualifiedOpportunity: ['Yes'],
         endCustomerName: [''],
         country: [''],
         state: [],
         year: ['2019'],
         status: [''],
         endCustomerInfrastructure: [''],
         items: this.formBuilder.array([this.createItem()])
       });
       console.log("These are project Details",this.projectInfo);
     });
   }
 
   getProjectDt(){
     //getting project details.....
     this.trailstudio
     .getProjectDetails(this.project)
     .subscribe((data) => {
       this.getProj();
     });
   }*/

  //Get Countries and State Data
  getCountries() {
    this.country.allCountries().
      subscribe(
        data2 => {
          this.countryInfo = data2.Countries;
          var newArray = data2.Countries.filter(function (item) {
            return item.CountryName == "United States";
          });
          this.stateInfo = newArray[0].States;
          this.stateInfoArr = newArray[0].States;
        },
        err => console.log(err),
        () => console.log('complete')
      )
  }

  onChangeCountry(countryValue) {
    var newArray = this.countryInfo.filter(function (item) {
      return item.CountryName == countryValue;
    });
    console.log(newArray[0].States);
    this.stateInfo = newArray[0].States;

  }

  onChangeCountryModel(countryValue) {
    var newArray = this.countryInfo.filter(function (item) {
      return item.CountryName == countryValue;
    });
    this.stateInfoArr = newArray[0].States;
  }


  //Get All Customer Details
  getQualifiedOpprtunity() {
    this.trailstudio
      .getCustomer()
      .subscribe((data) => {
        this.customerInfo = data;
      });
  }


  getAllCustomerDetails() {
    this.trailstudio
      .getCustomerDetails()
      .subscribe((data) => {
        this.getQualifiedOpprtunity();
      });
  }




  //------------------------ Add multiple Contacts -----------------------------------------------

  get demoArray() {
    return this.contactsForm.get('demoArray') as FormArray;
  }

  addContacts(item) {
    this.items = this.qualifiedOpportunitiesForm.get('items') as FormArray;
    this.items.push(this.createItem());



  }

  removeContact(index) {
    // remove the row specified in index
    if (index != 0) {
      (this.qualifiedOpportunitiesForm.controls.items as FormArray).controls.splice(index, 1);
      this.qualifiedOpportunitiesForm.value.items.splice(index, 1);
    } else {
      alert("Please enter atleast one customer contact..");
    }
  }



  defaultCustomerDetails(cust) {
    var newArray = this.customerInfo.filter(function (item) {
      return item.customerid == cust;
    });
    var items = this.qualifiedOpportunitiesForm.value.items;
    this.qualifiedOpportunitiesForm = this.formBuilder.group({
      customerId: [newArray[0].customerid],
      customerName: [newArray[0].customername],
      customerType: [newArray[0].customertype],
      interestedProduct: ['VNS'],
      probability: ['High'],
      region: [newArray[0].region],
      q1: [''],
      q2: [''],
      q3: [''],
      q4: [''],
      endCustomerFlag: ['Yes'],
      qualifiedOpportunity: ['Yes'],
      endCustomerName: [''],
      country: [newArray[0].country],
      state: [newArray[0].state],
      year: ['2019'],
      status: ['Active'],
      endCustomerInfrastructure: [''],
      revenue: [''],
      salesEngineer:[''],
      items: this.formBuilder.array([this.createItem()])
    });
  }


  endCustomerChange() {
    if (this.qualifiedOpportunitiesForm.value.endCustomerFlag === "Yes") {
      this.qualifiedOpportunitiesForm.value.endCustomerName = '';
      this.qualifiedOpportunitiesForm.value.endCustomerInfrastructure = '';
    }
  }



  //----------------------------------- Saving Data to DB -----------------------------------------------

  // Save Customer
  saveCustomer() {
    //this.customerForm.value.stateName = this.getStateName(this.customerForm.value.state);
    //this.customerForm.value.countryName = this.getCountryName(this.customerForm.value.country);
    this.saveCustomerFlag = true;
    jQuery("#primary-modal").modal("hide");
    this.trailstudio
      .saveCustomerContact(this.customerForm.value)
      .subscribe((data) => {
        //this.getAllCustomerDetails();
        // this.customerInfo=[];
      });
    this.customerInfo = [];
    this.getAllCustomerDetails();
    jQuery("#primary-modal").modal("hide");
  }

  itemsValidation() {
    console.log(this.qualifiedOpportunitiesForm.value.items);
    for (var i = 0; i < this.qualifiedOpportunitiesForm.value.items.length; i++) {
      if (!this.qualifiedOpportunitiesForm.value.items[i].name) {
        return true;
      }
    }
  }
  //Save Qualified Opportunity
  saveQualifiedOpportunity() {
    console.log("saveQualifiedOpportunity() called.....");
      this.submitted = true;
      if (this.qualifiedOpportunitiesForm.value.endCustomerFlag === "Yes") {
        this.qualifiedOpportunitiesForm.value.endCustomerName = '';
        this.qualifiedOpportunitiesForm.value.endCustomerInfrastructure = '';
      }
      if (!this.qualifiedOpportunitiesForm.value.customerName) {
        this.toastrService.error('Please select customer name.', 'Missing Values');
      } else if (this.itemsValidation()) {
        this.toastrService.error('Please fill all customer contact name Details.', 'Missing Values');
      } else {
        if (this.update) {
          console.log("this.qualifiedOpportunitiesForm.value:",this.qualifiedOpportunitiesForm.value);
          this.toastrService.success('Qualified Opportunity updated succcessfully.', 'Thank You :)');
          this.qualifiedOpportunitiesForm.value.projectid = this.project;
          //update code
          this.trailstudio
          .updateQualifiedOpportunity(this.qualifiedOpportunitiesForm.value)
          .subscribe((data) => {
            console.log("Saved Successfully...", data);
          });
        } else {
        this.toastrService.success('Qualified Opportunity submitted succcessfully.', 'Thank You :)');
        console.log(this.qualifiedOpportunitiesForm.value);
        this.trailstudio
          .insertQualifiedOpportynity(this.qualifiedOpportunitiesForm.value);
        /*  .subscribe((data) => {
            console.log("Saved Successfully...", data);
          });*/
        this.initilizeQualifiedOpportunity();
        }
      }
    }

  


}
