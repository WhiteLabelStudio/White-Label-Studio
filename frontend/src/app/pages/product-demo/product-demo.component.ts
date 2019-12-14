import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

import { TrailstudioService } from '../../trailstudio.service'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { ActivatedRoute } from "@angular/router";
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'product-demo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './product-demo.component.html',
  styleUrls: ['./product-demo.component.scss']
})
export class ProductDemoComponent implements OnInit {

  productDemosForm: FormGroup;
  customerInfo: any;
  projects: any;
  update: any;
  demo: any;
  demoDt: any;
  projectName: any;
  projectDt: any;
  q1: any;
  q2: any;
  q3: any;
  q4: any;
  projectDetailsforCust: any;
  items: FormArray;
  endCustDt : FormArray;
  contact : FormArray;
  product:any;
  
  salesContact:FormArray;
  IPCCContact:FormArray;
  accountManagerContact:FormArray;
  techinicalProjectContact:FormArray;



  constructor(private trailstudio: TrailstudioService, private formBuilder: FormBuilder, public toastrService: ToastrService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.update = false;
    this.initilizeProductDemos();
    this.getAllCustomerDetails();
    this.getAllProjects();
    this.getDemo();
    this.route.queryParams.subscribe(paramsId => {
      this.demo = paramsId.demoid;
      if (paramsId.demoid) {
        this.trailstudio
          .getDemoDetails(this.demo)
          .subscribe((data) => {
            this.trailstudio
              .getDemo()
              .subscribe((data) => {
                console.log("This is demo data: ", data);
                this.demoDt = data;
                this.productDemosForm = this.formBuilder.group({
                  demoId:paramsId.demoid,
                  customerId: [this.demoDt[0].customer_id],
                  customerName: [this.demoDt[0].customer_name],
                  project: [this.demoDt[0].projectid],
                  SCRMNumber: [this.demoDt[0].SCRM_number],
                  expectedPOValue: [this.demoDt[0].expected_PO_value],
                  expectedCPEPrice: [this.demoDt[0].expected_CPE_price],
                  CPEYearlyGrowth: [this.demoDt[0].CPE_yearly_growth],
                  expectedPOCDate: [this.demoDt[0].expected_POC_date],
                  expectedDeploymentDate: [this.demoDt[0].expected_deployment_date],
                  VANServiceFlag: [this.demoDt[0].VAN_service_flag],
                  CEIntegrationFlag: [this.demoDt[0].CE_integration_flag],
                  DCFlag: [this.demoDt[0].DC_flag],
                  underlaylink: [this.demoDt[0].underlink_provider_flag],
                  interestedProduct: [this.demoDt[0].interested_product],
                  demoedProduct: [this.demoDt[0].demoed_product],
                  demoDate: [this.demoDt[0].demo_date],
                  webExUrl: [this.demoDt[0].webex_url],
                  noOfSites: [this.demoDt[0].no_of_sites],
                  competitor: [this.demoDt[0].competitor],
                  speedUnderlayConn: [this.demoDt[0].SpeedUnderlayConn],
                  expectedThroughputReq: [this.demoDt[0].ExpectedThroughputReq],
                  OtherAppReq: [this.demoDt[0].OtherAppReq],
                  internetBreakoutReq: [this.demoDt[0].InternetBreakoutReq],
                  routingReq: [this.demoDt[0].RoutingReq],
                  cloudFlag: [this.demoDt[0].CloudFlag],
                  vendor: [this.demoDt[0].Vendor],
                  feedback: [this.demoDt[0].feedback],
                  linkProvider: [this.demoDt[0].LinkProvider],
                  ExistingCustApp: [this.demoDt[0].ExistingCustApp],
                  endCustomerFlag: [this.demoDt[0].endCustomerFlag],
                  WithLTE: [this.demoDt[0].WithLTE],
                  WithoutLTE: [this.demoDt[0].WithoutLTE],
                  WithWifi: [this.demoDt[0].WithWifi],
                  WithoutWifi: [this.demoDt[0].WithoutWifi],
                  WithVNF: [this.demoDt[0].WithVNF],
                  WithoutVNF: [this.demoDt[0].WithoutVNF],
                  WithLTECPENumber: [this.demoDt[0].WithLTECPENumber],
                  WithWifiCPENumber: [this.demoDt[0].WithWifiCPENumber],
                  WithVNFCPENumber: [this.demoDt[0].WithVNFCPENumber],
                  salesManagerContact: this.formBuilder.array(this.demoDt[0].salesContact.length > 0?  
                    this.getAllItems(this.demoDt[0].salesContact):[this.createSalesContact()]),
                    accountManagerContact: this.formBuilder.array(this.demoDt[0].AccMgr.length > 0? this.getAllItems(this.demoDt[0].AccMgr):[this.createAccountManagerontact()]),
                    items: this.formBuilder.array(this.demoDt[0].item.length > 0? this.getAllItems(this.demoDt[0].item):[this.createItem()]),
                    IPCCContact: this.formBuilder.array(this.demoDt[0].IPCC.length > 0? this.getAllItems(this.demoDt[0].IPCC): [this.createIPCCContact()]),
                    techinicalProjectContact: this.formBuilder.array(this.demoDt[0].TPM.length > 0?this.getAllItems(this.demoDt[0].TPM):[this.createTechnicalProjectManagerontact()])
                   // IPCCContact: this.formBuilder.array(this.getAllItems(this.demoDt[0].IPCC)),
                   // items: this.formBuilder.array(this.getAllItems(this.demoDt[0].IPCC)),
                   // accountManagerContact: this.formBuilder.array(this.getAllItems(this.demoDt[0].AccMgr)),
                   // techinicalProjectContact: this.formBuilder.array(this.getAllItems(this.demoDt[0].item))
                });
              });
          });
      }
    });
  }



    //this.projectInfo[0].
    getAllItems(arr) {
      if(arr){
      var contactsArr = [];
      for (var i = 0; i < arr.length; i++) {
        var contactObj = this.formBuilder.group({
          name: arr[i].name,
          contactPhone: arr[i].phone,
          jobTitle: arr[i].title,
          contactEmail: arr[i].email
        })
        contactsArr.push(contactObj);
      }
      return contactsArr;
    }
    }



  getDemo() {
    this.route.queryParams.subscribe(paramsId => {
      this.demo = paramsId.demoid;
      if (this.demo)
        this.update = true;
    });
  }

  initilizeProductDemos() {
    this.productDemosForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      customerName: [''],
      project: [''],
      SCRMNumber: [''],
      expectedPOValue: [''],
      expectedCPEPrice: [''],
      CPEYearlyGrowth: [''],
      expectedPOCDate: [''],
      expectedDeploymentDate: [''],
      VANServiceFlag: ['Yes'],
      CEIntegrationFlag: ['Yes'],
      DCFlag: ['Yes'],
      underlaylink: ['Yes'],
      interestedProduct: ['Yes'],
      demoedProduct: [''],
      demoDate: [''],
      webExUrl: [''],
      noOfSites: [''],
      demoSalesEngineer: [''],
      competitor: [''],
      speedUnderlayConn: [''],
      expectedThroughputReq: [''],
      OtherAppReq:[''],
      internetBreakoutReq: ['Yes'],
      routingReq: ['BGP'],
      cloudFlag:['public'],
      vendor:[''],
      feedback: [''],
      linkProvider:[''],
      ExistingCustApp:['Yes'],
      endCustomerFlag:['Yes'],
      WithLTE:[''],
      WithoutLTE:[''],
      WithWifi:[''],
      WithoutWifi:[''],
      WithVNF:[''],
      WithoutVNF:[''],
      WithLTECPENumber:[''],
      WithWifiCPENumber:[''],
      WithVNFCPENumber:[''],
      items: this.formBuilder.array([this.createItem()]),
      IPCCContact: this.formBuilder.array([this.createIPCCContact()]),
      salesManagerContact: this.formBuilder.array([this.createSalesContact()]),
      accountManagerContact: this.formBuilder.array([this.createAccountManagerontact()]),
      techinicalProjectContact: this.formBuilder.array([this.createTechnicalProjectManagerontact()])
     /* endCustDt:this.formBuilder.array([this.createEndCustomer()]),

      contact:this.formBuilder.array([this.createSalesContact()]),
   
    
     */
    });
  }

   //-------------------------------Sales Manger Contact Function ----------------------------------
   createSalesContact() {
    return this.formBuilder.group({
        name: '',
        jobTitle: '',
        contactEmail: '',
        contactPhone: '',
        type:'Sales Engineer'
    });
}
addSalesContact(item) {
    this.salesContact = this.productDemosForm.get('salesManagerContact') as FormArray;
    this.salesContact.push(this.createSalesContact());
}


removeSalesContact(index) {
    if (index != 0) {
        (this.productDemosForm.controls.salesManagerContact as FormArray).controls.splice(index, 1);
        this.productDemosForm.value.salesManagerContact.splice(index, 1);
    } else {
        alert("Please enter atleast one sales contact..");
    }
}

//---------------------------------------IPCC Contact Function----------------------------------------
createIPCCContact() {
    return this.formBuilder.group({
        name: '',
        jobTitle: '',
        contactEmail: '',
        contactPhone: '',
        type:'IPCC'
    });
}
addIPCCContact(item) {
    this.IPCCContact = this.productDemosForm.get('IPCCContact') as FormArray;
    this.IPCCContact.push(this.createIPCCContact());
}


removeIPCCContact(index) {
    if (index != 0) {
        (this.productDemosForm.controls.IPCCContact as FormArray).controls.splice(index, 1);
        this.productDemosForm.value.IPCCContact.splice(index, 1);
    } else {
        alert("Please enter atleast one IPCC contact..");
    }
}
  //--------------------------------------Account Manger Contact Function-----------------------------------
  createAccountManagerontact() {
    return this.formBuilder.group({
        name: '',
        jobTitle: '',
        contactEmail: '',
        contactPhone: '',
        type:'Account Manager'
    });
}
addAccountManagerContact(item) {
    this.accountManagerContact = this.productDemosForm.get('accountManagerContact') as FormArray;
    this.accountManagerContact.push(this.createAccountManagerontact());
}


removeAccountManagerContact(index) {
    if (index != 0) {
        (this.productDemosForm.controls.accountManagerContact as FormArray).controls.splice(index, 1);
        this.productDemosForm.value.accountManagerContact.splice(index, 1);
    } else {
        alert("Please enter atleast one Account Manager contact..");
    }
}

  //----------------------- Technical Project Manger Contact Function ---------------------------------------
  createTechnicalProjectManagerontact() {
    return this.formBuilder.group({
        name: '',
        jobTitle: '',
        contactEmail: '',
        contactPhone: '',
        type:'TPM'
    });
}
addTechnicalProjectManagerContact(item) {
    this.techinicalProjectContact = this.productDemosForm.get('techinicalProjectContact') as FormArray;
    this.techinicalProjectContact.push(this.createTechnicalProjectManagerontact());
}


removeTechnicalProjectmanagerContact(index) {
    if (index != 0) {
        (this.productDemosForm.controls.techinicalProjectContact as FormArray).controls.splice(index, 1);
        this.productDemosForm.value.techinicalProjectContact.splice(index, 1);
    } else {
        alert("Please enter atleast one customer contact..");
    }
}



  createEndCustomer(){
    return this.formBuilder.group({
      endCustomerName: '',
      jobTitle: '',
    });
  }

  addEndCustomer(item) {
    this.endCustDt = this.productDemosForm.get('endCustDt') as FormArray;
    this.endCustDt.push(this.createEndCustomer());
  }

  removeEndCustomer(index) {
    // remove the row specified in index
    if (index != 0) {
      (this.productDemosForm.controls.endCustDt as FormArray).controls.splice(index, 1);
      this.productDemosForm.value.endCustDt.splice(index, 1);
    } else {
      alert("Please enter atleast one customer contact..");
    }
  }


  createItem() {
    return this.formBuilder.group({
      name: '',
      jobTitle: '',
      contactEmail: '',
      contactPhone: '',
      type:'contact'
    });
  }

  
  addContacts(item) {
    this.items = this.productDemosForm.get('items') as FormArray;
    this.items.push(this.createItem());



  }

  removeContact(index) {
    // remove the row specified in index
    if (index != 0) {
      (this.productDemosForm.controls.items as FormArray).controls.splice(index, 1);
      this.productDemosForm.value.items.splice(index, 1);
    } else {
      alert("Please enter atleast one customer contact..");
    }
  }



  defaultCustomerDetails(cust) {
    var newArray = this.customerInfo.filter(function (item) {
      return item.customerid == cust;
    });
    console.log("These are the project details:......", this.projects);
    this.projectDetailsforCust = this.projects.filter(function (item) {
      return item.customerid == cust;
    });
    console.log("Getting all customer details", this.projectDetailsforCust[0]);
    this.productDemosForm.value.customerName = newArray[0].customername;
  }

  defaultProjectDetails(proj) {
    var newArray123 = this.projects.filter(function (item) {
      return item.projectid == proj;
    });
    this.productDemosForm.value.customerName = newArray123[0].customername;
    this.productDemosForm.value.customerId = newArray123[0].customerid;
    this.productDemosForm.value.demoedProduct = newArray123[0].interestedproduct;
    this.product = newArray123[0].interestedproduct;
    console.log("these are the project details", newArray123[0]);
    console.log("these are the project details", newArray123[0].interestedproduct);
     this.productDemosForm.patchValue({
       customerName: [newArray123[0].customername],
       customerId: [newArray123[0].customerid],
       demoedProduct:[newArray123[0].interestedproduct],
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

  //Get All Project(Qualified Opportunities)
  //Get All Customer Details
  getAllProjects() {
    this.trailstudio
      .getQualifiedOpportunities()
      .subscribe((data) => {
        console.log(data);
        this.projects = data;
        console.log("I am called again for projects..", this.projects);
      });
  }


  findQualifiedOpportunity() {
    this.trailstudio
      .getAllQualifiedOpportunities()
      .subscribe((data) => {
        this.getQualifiedOpprtunity();
      });
  }



  saveProductDemo() {
    console.log("saveProductDemo() function in Opportunity Details.....",this.productDemosForm.value);
    console.log("saveProductDemo() function check for update...",this.update);
    if (this.update) {
      this.toastrService.success('Product Demos updated succcessfully.', 'Thank You :)');
      this.productDemosForm.value.demoid = this.demo;
      console.log("This from product-demo.ts file: ");
      console.log(this.productDemosForm.value);
      //update code
      this.trailstudio
        .updateProductDemo(this.productDemosForm.value)
        .subscribe((data) => {
          console.log("Saved Successfully...", data);
        });
    } else {
      this.toastrService.success('Product Demos submitted succcessfully.', 'Thank You :)');
      console.log("saveProductDemo() function in Opportunity Details Demoed product Value:",this.productDemosForm.value.demoedProduct);
      this.productDemosForm.value.demoedProduct = this.product;
      console.log("Final Save:",this.productDemosForm.value);
     this.trailstudio
        .insertProductDemos(this.productDemosForm.value)
        .subscribe((data) => {
          console.log("Saved Successfully...", data);
        });
     // this.initilizeProductDemos();
    }
  }

  /* public file:any;
   fileData: File = null;
   
     fileChange(input){
         const reader = new FileReader();
         if (input.files.length) {       
             this.file = input.files[0].name;  
             this.fileData = <File>input.files[0];          
         }
         console.log(this.fileData);
     }
 
     removeFile():void{
         this.file = '';
     }
   */



}
