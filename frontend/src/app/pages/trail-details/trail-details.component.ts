import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { TrailstudioService } from '../../trailstudio.service';
import { Router } from '@angular/router';


@Component({
    selector: 'trail-details',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './trail-details.component.html',
    styleUrls: ['./trail-details.component.scss']
})
export class TrailDetailsComponent implements OnInit {

    public detailsForm: FormGroup;
    customerInfo: any;
    qualifiedOpp: any;
    demoDt:any;
    contacts:any;
    searchFlag:any;



    constructor(private formBuilder: FormBuilder, private trailstudio: TrailstudioService, public toastrService: ToastrService,private router: Router) {


        this.getAllCustomerDetails();
    }

    ngOnInit() {
        
        this.searchFlag=false;
        this.detailsForm = this.formBuilder.group({
            'customerId': ['', Validators.required],
            'interestedProduct': ['', Validators.required],
            'verifyFlag': ['', Validators.required]
        });

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


    defaultDemoDetails(){
        if(this.demoDt && this.demoDt.demoid)
        this.router.navigate(['/pages/solutiontrailrequesttool'],{ queryParams: { demoid: this.demoDt.demoid} });
        else
        this.router.navigate(['/pages/solutiontrailrequesttool']);
      }


    //get Details for the customer and demoed product


    getTrail() {
        console.log("I am called..");
        this.trailstudio
            .getTrail()
            .subscribe((data) => {
                this.qualifiedOpp = data[0];
                this.contacts = data[0].items;
                console.log(this.contacts);
                console.log(this.qualifiedOpp);
            });
    }




    getTrailforDemo() {
        console.log("I am called..");
        this.trailstudio
            .getTrailforDemo()
            .subscribe((data) => {
                this.demoDt = data[0];
            });
    }
   


    getProjectDetails() {

        if (!this.detailsForm.value.customerId) {
            this.toastrService.error('Please select the Customer', 'Missing Values');
        } else if (!this.detailsForm.value.interestedProduct) {
            this.toastrService.error('Please select the Demoed Product', 'Missing Values');
        } else {
            this.searchFlag=true;
            this.trailstudio
                .getOpportunityTrailDetails(this.detailsForm.value)
                .subscribe((data) => {
                    this.getTrail();
                });
                this.trailstudio
                .getDemoTrailDetails(this.detailsForm.value)
                .subscribe((data) => {
                    this.getTrailforDemo();
                });
        }
    }

}
