import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { WizardValidationService } from './wizard-validation.service';
import { Router } from '@angular/router';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { TrailstudioService } from '../../trailstudio.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'widgster';
import { ActivatedRoute } from "@angular/router";
//import { AnyARecord } from 'dns';

@Component({
    selector: 'solution-trail-tool',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './solution-trail-tool.component.html',
    styleUrls: ['./solution-trail-tool.component.scss'],
    providers: [WizardValidationService]
})
export class SolutionTrailTool implements OnInit {
    public steps: any[];
    public accountForm: FormGroup;
    public featuresForm: FormGroup;
    public featuresDetailsForm: FormGroup;
    public paymentForm: FormGroup;
    public conformationForm: FormGroup; 
    public details: any = {};
    public showConfirm: boolean;
    $: any;
    jQuery: any;
    list: any;
    customerInfo: any;
    projects: any;
    update: any;
    demo: any;
    trail:any;
    demoDt: any;
    projectName: any;
    projectDt: any;
    q1: any;
    q2: any;
    q3: any;
    q4: any;
    projectDetailsforCust: any;
    items: FormArray;
    endCustDt: FormArray;
    contact: FormArray;
    salesContact:FormArray;
    IPCCContact:FormArray;
    accountManagerContact:FormArray;
    techinicalProjectContact:FormArray;
    features: any;
    mainCategory: any;
    featuresSelectionError: any;
    featuresArr: any;

    platformRedendencyCategoryArr:any;
    SecurityPoliciesArr:any;
    NSGOpsArr:any;
    NATTraversalArr:any;
    ConnectivityArr:any;
    PATtoOverlayArr:any;
    IPSECArr:any;
    BootstrapArr:any;
    formJoin:FormGroup;
    trailsDt:any;


    constructor(private formBuilder: FormBuilder, private router: Router, public toastrService: ToastrService,private trailstudio: TrailstudioService,public route: ActivatedRoute) {


        this.list = 0;


        this.steps = [
            { name: 'Trail Details', icon: 'fa-user', active: true, valid: false, hasError: false, featuresSelectionError: false },
            { name: 'Packages', icon: 'fa-pencil', active: false, valid: false, hasError: false, featuresSelectionError: false },
            { name: 'Features', icon: 'fa-credit-card', active: false, valid: false, hasError: false, featuresSelectionError: false },
            { name: 'Feature Details', icon: 'fa-credit-card', active: false, valid: false, hasError: false, featuresSelectionError: false },
            { name: 'Confirm', icon: 'fa-check-square-o', active: false, valid: false, hasError: false, featuresSelectionError: false }
        ]


        /* this.accountForm = this.formBuilder.group({
             'username': ['', Validators.required],
             'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
             'confirmPassword': ['', Validators.required],
             'email': ['', Validators.compose([Validators.required, WizardValidationService.emailValidator])]            
         }, {validator: WizardValidationService.matchingPasswords('password', 'confirmPassword')});
 */

       

        /*  this.personalForm = this.formBuilder.group({
              'salutation': [''],
              'firstname': ['', Validators.required],
              'lastname': ['', Validators.required],
              'gender': [''],
              'email': ['', Validators.compose([Validators.required, WizardValidationService.emailValidator])],
              'phone': ['', Validators.required],
              'zipcode': ['', Validators.required],
              'country': ['', Validators.required],
              'state': [''],
              'address': ['']
          });*/


        this.features = [
            'Bootstrapping',
            'Bootstrapping + NAT',
            'Security Policies',
            'Platform Redundancy',
            'Overlay Sys Log',
            'Topology',
            'NSG Operations',
            'Gateway Operations - NSG Security',
            'Gateway Operations - Upgrade',
            'NSG UBR',
            'Dual Uplink',
            'NAT Traversal',
            'Secondary IP',
            'CLI Bootstrapping',
            'NSG BR',
            'IPV6',
            'Connectivity (L2/L3)',
            'DHCP on bridge',
            'QoS',
            'PAT to Overlay',
            'Access Resiliency',
            'Service Chaining',
            'DNA',
            'Routing',
            'IPSEC',
            'Web Filtering',
            'VNF',
            'WiFi on NSG'
        ];

        this.mainCategory = [
            'SD-WAN Core Hosting Service',
            'Portal Service for Service Provider and End user',
            'Basic SD-WAN Features (Base Router RTU, VPN router RTU, ACL RTU,NAT/PAT RTU, IPSEC RTU, Business Intelligence RTU, Wifi RTU, LTE RTU)',
            'Advance Features (Border Router RTU, Service Chaining RTU, Hosted VNF RTU)',
            'Web Filtering',
            'Max Number of tenants',
            'MPLS support',
            'Max Number of NSGs supported',
            'Saas Gateway Support',
            'Cloud Gateway Support for AWS, Azure and Legacy DC'
        ]

        this.accountForm = this.formBuilder.group({
            customerId: ['', Validators.required],
            demoId:[''],
            customerName: [''],
            project: [''],
            SCRMNumber: [''],
            expectedPOValue: [''],
            CPEType: [''],
            CPENumber: [''],
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
            OtherAppReq: [''],
            internetBreakoutReq: ['Yes'],
            routingReq: ['BGP'],
            cloudFlag: ['public'],
            vendor: [''],
            feedback: [''],
            linkProvider: [''],
            ExistingCustApp: ['Yes'],
            endCustomerFlag: ['Yes'],
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
            endCustDt: this.formBuilder.array([this.createEndCustomer()]),
            salesManagerContact: this.formBuilder.array([this.createSalesContact()]),
            IPCCContact: this.formBuilder.array([this.createIPCCContact()]),
            accountManagerContact: this.formBuilder.array([this.createAccountManagerontact()]),
            techinicalProjectContact: this.formBuilder.array([this.createSalesContact()]),
        });

        this.paymentForm = this.formBuilder.group({
            'cardtype': ['', Validators.required],
            'cardnumber': ['', Validators.compose([Validators.required, WizardValidationService.numberValidator])],
            'cvc': ['', Validators.compose([Validators.required, WizardValidationService.numberValidator])],
            'expirymonth': ['', Validators.required],
            'expiryyear': ['', Validators.required]
        });


        this.featuresForm = this.formBuilder.group({
            'package': [''],
            'SDWANServiceFlag': [false],
            'basicSDWAN': [false],
            'advancedFeaturesFlag': [false],
            'webFilteringFlag': [false],
            'noOfTenentsFlag': [''],
            'noOfNSGFlag': [''],
            'sassgatewayFlag': [false],
            'cloudGateway': [false],
            'portalServiceFlag': [false],
            'MPLSSupport': [false],
            'platformRedendencyQ5':['']
        });

        this.featuresDetailsForm = this.formBuilder.group({
            'feature': [''],
            'SDWANServiceFlag': [false],
            'basicSDWAN': [false],
            'advancedFeaturesFlag': [false],
            'webFilteringFlag': [false],
            'noOfTenentsFlag': [''],
            'noOfNSGFlag': [''],
            'sassgatewayFlag': [false],
            'cloudGateway': [false],
            'portalServiceFlag': [false],
            'MPLSSupport': [false],
            'platformRedendencyQ5':[''],
            'platformRedendencyCategory':['VSD'],
            'GeoDistributedVSDQ6':[''],
            'GeoDistributedVSDCategory':['Geo-Redundancy'],
            'SecurityPoliciesQ3':[''],
            'SecurityPoliciesQ4':[''],
            'SecurityPoliciesCategory':['Security Polices'],
            'TopologyQ7':[],
            'TopologyCategory':['Topology'],
            'NSGOperationsQ8':[''],
            'NSGOperationsCategory':['NSG Operations'],
            'NATTraversalQ12':[''],
            'NATTraversalCategory':['NAT'],
            'NSGBRQ13':[''],
            'NSGBRCategory':[''],
            'ConnectivityQ17':[],
            'Connectivity18':[''],
            'ConnectivityCategory':['L2 Domain'],
            'PATtoOverlayQ20':[''],
            'PATtoOverlayCategory':['Local Breakout'],
            'DNAQ23':[''],
            'DNACategory':['No Wifi'],
            'IPSECQ29':[''],
            'IPSECQ30':[''],
            'IPSECQ31':[''],
            'IPSECQ32':[''],
            'IPSECCategory':['Internet'],
            'WiFionNSGQ35':[''],
            'WiFionNSGQCategory':['Branch services'],
            'NSGUBRCategory':[''],
            'PostalServicesReq':[''],
            'ServiceChainingQ22':[''],
            'ServiceChainingCategory':[''],
            'VNF33':[''],
            'VNF34':[''],
            'VNFCategory':[''],
            'webFilteringCategory':[''],
            'BootstrapQ1':[''],
            'BootstrapQ2':[''],
            'BootstrapQ2_1':[''],
            'BootstrapQ2_2':[''],
            'BootstrapQ2_3':[''],
            'BootstrapQ2_4':[''],
            'BootstrapQ2_5':[''],
            'BootstrapCategory' : ['Single - Static - Internet'],
            'DualUplinkQ11':[''],
            'DualUplinkCategory':['Primary-Primary'],
            'RoutingQ24':[''],
            'RoutingQ25':[''],
            'RoutingQ26':[''],
            'RoutingQ27':[''],
            'RoutingQ28':[''],
            'RoutingCategory':['Application-Aware Routing'],
           


        });

        this.conformationForm = this.formBuilder.group({
            'summary': [''],
            'verifyFlag':['']
        });

//------------------------------------- platformRedendencyCategoryArr-------------------------------------
        this.platformRedendencyCategoryArr = [
            {
                VSD: [
                    'With the 3 node VSD cluster fully operational fail one of the three VSD servers and validate that API requests and traffic continue un-interrupted',
                    'Restore the failed VSD node and validate that the cluster recovers back to fully operational state.'
                ]
            }, {
                ES: [
                    'With the 3 node ES cluster fully operational fail one the three ES servers and validate that API requests and NSG statistics collection continue un-interrupted.',
                    'Restore the failed ES node and validate that the ES cluster recovers back to fully operational state.'
                ]
            }
            , {
                VSC: [
                    'With a ping session running between hosts behind NSGs being managed by the same VSC pair, fail the active VSC and validate that traffic is not impacted.',
                    'With a ping session running between hosts behind NSGs being managed by the same VSC pair, fail the backup VSC and validate that traffic is not impacted.'
                ]
            },
            {
            PlatformRedundancy: [
                    'Restore the active VSC and verify that the NSG connects back to it as the standby and that traffic is not impacted.',
                    'Restore the backup VSC and verify that the NSG connects back to it as the standby and that traffic is not impacted.',
                    'Fail the active SSL Proxy and validate that all endpoints fallback to the standby SSL Proxy. Validate availability of all endpoints on the standby SSL Proxy.',
                    'Fail the active notification APP and validate that the backup motivation APP becomes active and it is possible to bootstrap an NSG using it.'

                ]
            }
        ]


//------------------------------------- SecurityPoliciesArr-------------------------------------
        this.SecurityPoliciesArr = [
            {
                SecurityPolices: [
                    'Create default security policy allowing all traffic and validate bi-directions traffic flow between hosts in the domain.',
                    'Verify that SD-WAN domain to MPLS VPRN traffic can be policed by creating an ingress security rule preventing access to specific MPLS hosts (networks external to the Nuage domain) and validate that these hosts are not reachable. This will require the of network macros groups for MPLS subnets.',
                    'Enable a hit counter for an ingress security policy and then generate traffic that should be blocked by that ACL rule and validate that the hit counter is correctly incremented.',
                    'Validate that two different policy groups can be created. Policy group A is associated with bridge vport A on NSG at site A and policy group B is associated with bridge vport B on NSG at site B. Validate that stateful security policy entries can be created to allow both HTTP and SSH traffic between subnets at both sites.'
                ]
            }, {
                ICMP: [
                    'Create an ingress security policy entry blocking ICMP and validate that ICMP traffic is dropped at source NSG.'
                ]
            }
            , {
                HTTPHTTPS: [
                    'Create a low priority ingress security policy entry blocking HTTP traffic and validate that a web server behind a HQ branch cannot received HTTP requests a client behind a remote branch site. Create a stateful ingress security policy allowing client to server traffic on destination port 80 and also create a stateful egress security policy allowing server to client traffic in source port 80. Originate a client HTTP request to the server and validate that the request now succeeds.'
                ]
            }
        ]

//------------------------------------ NSGOpsArr--------------------------------------
this.NSGOpsArr=[
    {
        NSGOperations: [
            'Validate that new configuration can be pushed to the NSG from VSD using the "Reload Configuration" button in Architect . Check that the LAN port MTU can be changed in this manner.',
            'Verify that an NSG can be instantly deactivated using the "Deactivate" button in Architect.',
            'Verify that a custom SSH password can be setup for an NSG shell access for the special Nuage user.',
            'Verify NSG TPM module is Enabled and operational on NSG.'
        ]
    }, {
        NSGremoteaccess: [
            'Verify that "Nuage" user SSH remote access can be disabled.',
            'Verify that "Nuage" user SSH remote access can be enabled.',
            'Verify certificate based remote SSH access to the NSG using the special "Nuage" user.'
        ]
    }
];


//------------------------------------ NATTraversalArr--------------------------------------
this.NATTraversalArr=[
    {
        NAT: [
            'Validate NAT-T NPM probe creation and bi-directional user traffic flow between NSG1 (behind full-cone NAT) and NSG2 (behind Restricted Cone NAT: source IPv4 address validation).',
            'Validate NAT-T NPM probe creation and bi-directional user traffic flow between NSG1 (behind full-cone NAT) and NSG2 (behind Port Restricted Cone NAT: source IPv4 address and source port validation)',
            'Validate NAT-T NPM probe creation and bi-directional user traffic flow between NSG1 (behind Restricted Cone NAT: source IPv4 address validation) and NSG2 (behind Restricted Cone NAT: source IPv4 address validation)',
            'Validate NAT-T NPM probe creation and bi-directional user traffic flow between NSG1 (behind Port Restricted Cone NAT: source IPv4 address and source port validation) and NSG2 (behind Port Restricted Cone NAT: source IPv4 address and source port validation)'
        ]
    }
];


//------------------------------------- ConnectivityArr-------------------------------------
this.ConnectivityArr = [
    {
        L2Domain: [
            'L2 domain creation',
            'L2 domain deletion',
            'Enable IPSEC for L2 domain',
            'Disable IPSEC for L2 domain',
            'Create Untagged Bridge type vport and attach to subnet ',
            'Create tagged Bridge type vport and attach to subnet ',
            'Create Untagged Host type vport and attach to subnet ',
            'Create Tagged Host type vport and attach to subnet ',
            'Validate customer DNS server assignment.',
            'Traffic between hosts the same subnet (Same site/same subnet)',
            'Traffic between hosts in the same site but different subnets (Same site/different subnets)',
            'Traffic between hosts in different sites/different subnets (NSGs share a common underlay)',
            'Enable vport statistics collection for a domain and verify correct packet and byte statistics are collected by VSD and stored in ES.'
        ]
    }, {
        L3Domain: [
            'L3 domain creation',
            'L3 domain deletion',
            'Enable IPSEC for L3 domain',
            'Disable IPSEC for L3 domain',
            'Zone creation within L3 domain',
            'Zone deletion within L3 domain',
            'Create Untagged Bridge type vport and attach to subnet ',
            'Create tagged Bridge type vport and attach to subnet ',
            'Create Untagged Host type vport and attach to subnet ',
            'Create Tagged Host type vport and attach to subnet ',
            'Validate customer DNS server assignment.',
            'Traffic between hosts the same subnet (Same site/same subnet)',
            'Traffic between hosts in the same site but different subnets (Same site/different subnets)',
            'Traffic between hosts in different sites/different subnets (NSGs share a common underlay)',
            'Enable vport statistics collection for a domain and verify correct packet and byte statistics are collected by VSD and stored in ES.'
        ],
        StaticRouting: [
            'Create subnet specific static route for hosts connected behind router that is connected to LAN port of NSG and validate traffic flow to/from this host from a remote host.',
            'L3 domain deletion',
            'Enable IPSEC for L3 domain',
            'Disable IPSEC for L3 domain',
        ]

    }
    , {
        StaticRouting: [
            'Create a low priority ingress security policy entry blocking HTTP traffic and validate that a web server behind a HQ branch cannot received HTTP requests a client behind a remote branch site. Create a stateful ingress security policy allowing client to server traffic on destination port 80 and also create a stateful egress security policy allowing server to client traffic in source port 80. Originate a client HTTP request to the server and validate that the request now succeeds.',
            'Create default static route for hosts connected behind router that is connected to LAN port of NSG and validate traffic flow to/from this host from a remote host.'
        ]
    }
]

//------------------------------------ PATtoOverlayArr--------------------------------------
this.PATtoOverlayArr=[
    {
        LocalBreakout: [
            'Enable underlay routing and address translation for an L3 domain and validate that non-overlay VPN destined traffic is source NAT-ed out an Internet WAN uplink',
            'Disable underlay routing and address translation for an L3 domain and validate that non-overlay VPN destined traffic is dropped.'
        ]
    }, {
        PATtoOverlay: [
            'With a default static route configured in the overlay, enable PAT to the underlay and add a specific exit route (for example to reach Google DNS) and validate that traffic destined to that specific exit our is source NAT-ed out an Internet uplink. Also validate that traffic not matching that exit route is VxLAN tunneled via the overlay default route.'
        ]
    }
];

//------------------------------------- IPSECArr-------------------------------------
this.IPSECArr = [
    {
        Internet: [
            'Validate IPSEC throughput between two NSGs connected over the Internet with 1500 MTU. Validate this for all combination of NSG models used.',
            'Validate IPSEC throughput between two NSG-Es connected over the Internet with IMIX MTU',
            'Validate IPSEC throughput between two NSG-E200s connected over the Internet with 1500 MTU',
            'Validate IPSEC throughput between two NSG-E200s connected over the Internet with IMIX MTU',
            'Validate IPSEC throughput betweentwo NSG-E200s connected over the Internet with IMIX MTU and with enable Network acceleration',
            'Validate IPSEC throughput betweentwo NSG-E200s connected over the Internet with 1500 MTU and with enable Network acceleration ',
            'Validate IPSEC throughput between two NSG-E300s connected over the Internet with 1500 MTU',
            'Validate IPSEC throughput between two NSG-E300s connected over the Internet with IMIX MTU',
         ]
    }, {
        MPLS: [
            'Validate IPSEC throughput between branch NSG-Es going through NSG-UBR (NSG-X) over Internet then MPLS with 1500 MTU',
            'Validate IPSEC throughput between branch NSG-Es going through NSG-UBR (NSG-X) over Internet then MPLS with IMIX MTU',
            'Validate IPSEC throughput between branch NSG-Es going through NSG-UBR (NSG-X) over MPLS then Internet with 1500 MTU'
       ],
       NSGX200: [
            'Test with 10 eBGP neighbors on NSG-UBR (NSG-X) facing 7750 PE.',
        ]

    }
    , {
        NSG7750PE: [
            'Inject 10000 eBGP routes into Nuage L3 domain from 7750 PE and validate correct routing and forwarding.'
        ]
    },
    {
        VxLANNoIPsec: [
            'Encryption with Group-key  - VxLANNoIPsec'
        ]  
    },
    {
        IKE2IPoESP: [
            'Encryption with IKE -IPoESP encapsulation- No VXLANg.'
        ]  
    }
]

//------------------------------------ BootstrapArr--------------------------------------
this.BootstrapArr=[
    {
        SingleStaticInternet: [
            'Bootstrap NSG with single WAN uplink (port1) connected to Public Internet (Static Public WAN IP/Static GW)',
            'Bootstrap NSG with single WAN uplink (port1) connected to Public Internet (Static Public WAN IP/Static GW) then deactivate the NSG and validate it is successfully deactivated.',
            'Bootstrap NSG with single WAN uplink (port1) connected to Private MPLS VPRN (Static WAN IP/Static GW)',
            'Bootstrap NSG with single WAN uplink (port1) connected to Private MPLS VPRN (Static Public WAN IP/Static GW) then deactivate the NSG and validate it is successfully deactivated.'
        ]
    }, {
        SingleStaticLTE: [
            'Bootstrap NSG with single WAN uplink (port2) connected to integrated LTE Internet (Static Public WAN IP/Static GW)With a default static route configured in the overlay, enable PAT to the underlay and add a specific exit route (for example to reach Google DNS) and validate that traffic destined to that specific exit our is source NAT-ed out an Internet uplink. Also validate that traffic not matching that exit route is VxLAN tunneled via the overlay default route.',
            'Bootstrap NSG with single WAN uplink (port2) connected to integrated LTE Internet (DHCPv4 behind CGNAT GW)',
            'Bootstrap NSG with single WAN uplink (port2) connected to integrated LTE Internet (Static Public WAN IP/Static GW) then deactivate the NSG and validate it is successfully deactivated.',
            'Bootstrap NSG with single WAN uplink (port2) connected to integrated LTE Internet (DHCPv4 behind CGNAT GW) then deactivate the NSG and validate it is successfully deactivated.',
            'Bootstrap NSG with single WAN uplink (port2) connected to integrated LTE Internet (Static Public WAN IP/Static GW) then deactivate the NSG and validate it is successfully deactivated.',
            'Bootstrap NSG with single WAN uplink (port2) connected to integrated LTE Internet (DHCPv4 behind CGGW Router) then deactivate the NSG and validate it is successfully deactivated.'
        ]
    },
    {
        SingleDynamicInternet: [
            'Bootstrap NSG with single WAN uplink (port1) connected to Public Internet (DHCPv4 behind NAT GW)',
            'Bootstrap NSG with single WAN uplink (port1) connected to Public Internet (DHCPv4 behind NAT GW) then deactivate the NSG and validate it is successfully deactivated.',
            'Bootstrap NSG with single WAN uplink (port2) connected to integrated LTE Internet (Static Public WAN IP/Static GW) then deactivate the NSG and validate it is successfully deactivated.',
            'Bootstrap NSG with single WAN uplink (port1) connected to Private MPLS VPRN (DHCPv4 behind GW Router) then deactivate the NSG and validate it is successfully deactivated.'
        ]
    },{
        DualUplinkStaticLTE: [
            'Bootstrap NSG with single WAN uplink (port1) connected to Public Internet (DHCPv4 behind NAT GW)',
            'Bootstrap NSG with single WAN uplink (port1) connected to Public Internet (DHCPv4 behind NAT GW) then deactivate the NSG and validate it is successfully deactivated.',
            'Bootstrap NSG with single WAN uplink (port2) connected to integrated LTE Internet (Static Public WAN IP/Static GW) then deactivate the NSG and validate it is successfully deactivated.',
            'Bootstrap NSG with single WAN uplink (port1) connected to Private MPLS VPRN (DHCPv4 behind GW Router) then deactivate the NSG and validate it is successfully deactivated.'
        ]
    },
    {
        DualUplinkStaticInternet: [
            'Bootstrap NSG with single WAN uplink (port1) connected to Public Internet (Static Public WAN IP/Static GW)',
            'Bootstrap NSG with single WAN uplink (port1) connected to Public Internet (Static Public WAN IP/Static GW) then deactivate the NSG and validate it is successfully deactivated.',
            'Bootstrap NSG with single WAN uplink (port1) connected to Private MPLS VPRN (Static WAN IP/Static GW)',
            'Bootstrap NSG with single WAN uplink (port1) connected to Private MPLS VPRN (Static Public WAN IP/Static GW) then deactivate the NSG and validate it is successfully deactivated.'
        ]
    },
    {
        DualUplinkDynamicInternet: [
            'Bootstrap NSG with single WAN uplink (port1) connected to Public Internet (DHCPv4 behind NAT GW)',
            'Bootstrap NSG with single WAN uplink (port1) connected to Public Internet (DHCPv4 behind NAT GW) then deactivate the NSG and validate it is successfully deactivated.',
            'Bootstrap NSG with single WAN uplink (port2) connected to integrated LTE Internet (Static Public WAN IP/Static GW) then deactivate the NSG and validate it is successfully deactivated.',
            'Bootstrap NSG with single WAN uplink (port1) connected to Private MPLS VPRN (DHCPv4 behind GW Router) then deactivate the NSG and validate it is successfully deactivated.'
        ]
    }
    

];


    }

    ngOnInit() {
        this.featuresArr = ['#SDWANServiceFlag', '#basicSDWANFlag', '#advancesFeaturesFlag', '#webfilteringFlag', '#MPLSSuportFlag', '#sassgatewayFlag', '#cloudGateway', '#portalServiceFlag'];
        this.featuresSelectionError = true;


       /* this.accountForm = this.formBuilder.group({
            customerId: ['', Validators.required],
            customerName: [''],
            project: [''],
            SCRMNumber: [''],
            expectedPOValue: [''],
            CPEType: [''],
            CPENumber: [''],
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
            OtherAppReq: [''],
            internetBreakoutReq: ['Yes'],
            routingReq: ['BGP'],
            cloudFlag: ['public'],
            vendor: [''],
            feedback: [''],
            linkProvider: [''],
            ExistingCustApp: ['Yes'],
            endCustomerFlag: ['Yes'],
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
            endCustDt: this.formBuilder.array([this.createEndCustomer()]),
            salesManagerContact: this.formBuilder.array([this.createSalesContact()]),
            IPCCContact: this.formBuilder.array([this.createIPCCContact()]),
            accountManagerContact: this.formBuilder.array([this.createAccountManagerontact()]),
            techinicalProjectContact: this.formBuilder.array([this.createSalesContact()]),
        });*/

        this.getAllCustomerDetails();

        this.getAllProjects();
        this.findQualifiedOpportunity();

        this.route.queryParams.subscribe(paramsId => {
            this.demo = paramsId.demoid;
            if(!paramsId.demoid && !paramsId.trail){
                this.accountForm = this.formBuilder.group({
                    customerId: ['', Validators.required],
                    customerName: [''],
                    project: [''],
                    SCRMNumber: [''],
                    expectedPOValue: [''],
                    CPEType: [''],
                    CPENumber: [''],
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
                    OtherAppReq: [''],
                    internetBreakoutReq: ['Yes'],
                    routingReq: ['BGP'],
                    cloudFlag: ['public'],
                    vendor: [''],
                    feedback: [''],
                    linkProvider: [''],
                    ExistingCustApp: ['Yes'],
                    endCustomerFlag: ['Yes'],
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
                    endCustDt: this.formBuilder.array([this.createEndCustomer()]),
                    salesManagerContact: this.formBuilder.array([this.createSalesContact()]),
                    IPCCContact: this.formBuilder.array([this.createIPCCContact()]),
                    accountManagerContact: this.formBuilder.array([this.createAccountManagerontact()]),
                    techinicalProjectContact: this.formBuilder.array([this.createSalesContact()]),
                });
            }
            else if (paramsId.demoid) {
              this.trailstudio
                .getDemoDetails(this.demo)
                .subscribe((data) => {
                  this.trailstudio
                    .getDemo()
                    .subscribe((data) => {
                      console.log("This is demo data: ", data);
                      this.demoDt = data;
                      this.accountForm = this.formBuilder.group({
                        demoId:paramsId.demoid,
                        customerId: [this.demoDt[0].customer_id],
                        customerName: [this.demoDt[0].customer_name],
                        project: [this.demoDt[0].project_id],
                        SCRMNumber: [this.demoDt[0].SCRM_number],
                        expectedPOValue: [this.demoDt[0].expected_PO_value],
                        CPEType: [this.demoDt[0].CPE_type],
                        CPENumber: [this.demoDt[0].CPE_number],
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
                          
                      });
                    });
                });
            }else if(paramsId.trail){
                this.trail = paramsId.trail
                console.log("Params : ", paramsId.trail);
                this.trailstudio
                    .getSolutionTrailData(paramsId.trail)
                    .subscribe((data) => {
                       this.trailstudio
                            .getSolutionTrailsDetails()
                            .subscribe((data) => {
                                this.trailsDt = data;
                                console.log("Solution Trails Data: ", this.trailsDt);

                              this.accountForm = this.formBuilder.group({
                                    customerId: [this.trailsDt[0].customer_id],
                                    customerName: [this.trailsDt[0].customer_name],
                                    project: [this.trailsDt[0].project_id],
                                    SCRMNumber: [this.trailsDt[0].SCRM_number],
                                    expectedPOValue: [this.trailsDt[0].expected_PO_value],
                                    CPEType: [this.trailsDt[0].CPE_type],
                                    CPENumber: [this.trailsDt[0].CPE_number],
                                    expectedCPEPrice: [this.trailsDt[0].expected_CPE_price],
                                    CPEYearlyGrowth: [this.trailsDt[0].CPE_yearly_growth],
                                    expectedPOCDate: [this.trailsDt[0].expected_POC_date],
                                    expectedDeploymentDate: [this.trailsDt[0].expected_deployment_date],
                                    VANServiceFlag: [this.trailsDt[0].VAN_service_flag],
                                    CEIntegrationFlag: [this.trailsDt[0].CE_integration_flag],
                                    DCFlag: [this.trailsDt[0].DC_flag],
                                    underlaylink: [this.trailsDt[0].underlink_provider_flag],
                                    interestedProduct: [this.trailsDt[0].interested_product],
                                    demoedProduct: [this.trailsDt[0].demoed_product],
                                    demoDate: [this.trailsDt[0].demo_date],
                                    webExUrl: [this.trailsDt[0].webex_url],
                                    noOfSites: [this.trailsDt[0].no_of_sites],
                                    competitor: [this.trailsDt[0].competitors],
                                    speedUnderlayConn: [this.trailsDt[0].SpeedUnderlayConn],
                                    expectedThroughputReq: [this.trailsDt[0].ExpectedThroughputReq],
                                    OtherAppReq: [this.trailsDt[0].OtherAppReq],
                                    internetBreakoutReq: [this.trailsDt[0].InternetBreakoutReq],
                                    routingReq: [this.trailsDt[0].RoutingReq],
                                    cloudFlag: [this.trailsDt[0].CloudFlag],
                                    vendor: [this.trailsDt[0].Vendor],
                                    feedback: [this.trailsDt[0].feedback],
                                    linkProvider: [this.trailsDt[0].LinkProvider],
                                    ExistingCustApp: [this.trailsDt[0].ExistingCustApp],
                                    endCustomerFlag: [this.trailsDt[0].endCustomerFlag],
                                    WithLTE: [this.trailsDt[0].WithLTE],
                                    WithoutLTE: [this.trailsDt[0].WithoutLTE],
                                    WithWifi: [this.trailsDt[0].WithWifi],
                                    WithoutWifi: [this.trailsDt[0].WithoutWifi],
                                    WithVNF: [this.trailsDt[0].WithVNF],
                                    WithoutVNF: [this.trailsDt[0].WithoutVNF],
                                    WithLTECPENumber: [this.trailsDt[0].WithLTECPENumber],
                                    WithWifiCPENumber: [this.trailsDt[0].WithWifiCPENumber],
                                    WithVNFCPENumber: [this.trailsDt[0].WithVNFCPENumber],
                        
            items: this.formBuilder.array([this.createItem()]),
            endCustDt: this.formBuilder.array([this.createEndCustomer()]),
            salesManagerContact: this.formBuilder.array([this.createSalesContact()]),
            IPCCContact: this.formBuilder.array([this.createIPCCContact()]),
            accountManagerContact: this.formBuilder.array([this.createAccountManagerontact()]),
            techinicalProjectContact: this.formBuilder.array([this.createSalesContact()]),
                                });
                               console.log("Package Details: ",this.trailsDt[0].Package);
                               let v = this.trailsDt[0].SDWANServiceFlag;
                               
                                this.featuresForm = this.formBuilder.group({
                                    'package': [this.trailsDt[0].Package],
                                    'SDWANServiceFlag': [this.trailsDt[0].SDWANServiceFlag==0?0:1],//this.trailsDt[0].SDWANServiceFlag],
                                    'basicSDWAN': [this.trailsDt[0].basicSDWAN==0?0:1],
                                    'advancedFeaturesFlag': [this.trailsDt[0].advancedFeaturesFlag==0?0:1],
                                    'webFilteringFlag': [this.trailsDt[0].webFilteringFlag==0?0:1],
                                    'noOfTenentsFlag': [this.trailsDt[0].noOfNSGFlag==0?0:1],
                                    'noOfNSGFlag': [this.trailsDt[0].noOfNSGFlag==0?0:1],
                                    'sassgatewayFlag': [this.trailsDt[0].sassgatewayFlag==0?0:1],
                                    'cloudGateway': [this.trailsDt[0].cloudGateway==0?0:1],
                                    'portalServiceFlag': [this.trailsDt[0].portalServiceFlag==0?0:1],
                                    'MPLSSupport': [this.trailsDt[0].MPLSSupport==0?0:1],
                                    'platformRedendencyQ5':[this.trailsDt[0].platformRedendencyQ5==0?0:1]
                                });

                                this.featuresDetailsForm = this.formBuilder.group({
                                    'feature': [''],
                                    'DualUplinkCategory':['Primary-Primary'],
                                    'SecurityPoliciesCategory':['Security Polices'],
                                    'GeoDistributedVSDCategory':['Geo-Redundancy'],
                                    'platformRedendencyCategory':['VSD'],
                                    'NSGOperationsCategory':['NSG Operations'],
                                    'TopologyCategory':['Topology'],
                                    'NATTraversalCategory':['NAT'],
                                    'PATtoOverlayCategory':['Local Breakout'],
                                    'DNACategory':['No Wifi'],
                                    'WiFionNSGQCategory':['Branch services'],
                                    'ConnectivityCategory':['L2 Domain'],
                                    'IPSECCategory':['Internet'],
                                    'BootstrapCategory' : ['Single - Static - Internet'],
                                    'RoutingCategory':['Application-Aware Routing'],
                                    'SDWANServiceFlag': [false],
                                    'basicSDWAN': [false],
                                    'advancedFeaturesFlag': [false],
                                    'webFilteringFlag': [false],
                                    'noOfTenentsFlag': [''],
                                    'noOfNSGFlag': [''],
                                    'sassgatewayFlag': [false],
                                    'cloudGateway': [false],
                                    'portalServiceFlag': [false],
                                    'MPLSSupport': [false],
                                    'platformRedendencyQ5':[this.trailsDt[0].platformRedendencyQ5],
                                    'GeoDistributedVSDQ6':[this.trailsDt[0].GeoDistributedVSDQ6],
                                    'SecurityPoliciesQ3':[this.trailsDt[0].SecurityPoliciesQ3],
                                    'SecurityPoliciesQ4':[this.trailsDt[0].SecurityPoliciesQ4],
                                    'TopologyQ7':[this.trailsDt[0].TopologyQ7],
                                    'NSGOperationsQ8':[this.trailsDt[0].NSGOperationsQ8],
                                    'NATTraversalQ12':[this.trailsDt[0].NATTraversalQ12],
                                    'NSGBRQ13':[this.trailsDt[0].NSGBRQ13],
                                    'NSGBRCategory':[this.trailsDt[0].NSGBRCategory],
                                    'ConnectivityQ17':[this.trailsDt[0].ConnectivityQ17],
                                    'Connectivity18':[this.trailsDt[0].Connectivity18],
                                    'PATtoOverlayQ20':[this.trailsDt[0].PATtoOverlayQ20],
                                    'DNAQ23':[this.trailsDt[0].DNAQ23],
                                    'IPSECQ29':[this.trailsDt[0].IPSECQ29],
                                    'IPSECQ30':[this.trailsDt[0].IPSECQ30],
                                    'IPSECQ31':[this.trailsDt[0].IPSECQ31],
                                    'IPSECQ32':[this.trailsDt[0].IPSECQ32],
                                    'WiFionNSGQ35':[this.trailsDt[0].WiFionNSGQ35],
                                    'NSGUBRCategory':[this.trailsDt[0].NSGUBRCategory],
                                    'PostalServicesReq':[this.trailsDt[0].PostalServicesReq],
                                    'ServiceChainingQ22':[this.trailsDt[0].ServiceChainingQ22],
                                    'ServiceChainingCategory':[this.trailsDt[0].ServiceChainingCategory],
                                    'VNF33':[this.trailsDt[0].VNF33],
                                    'VNF34':[this.trailsDt[0].VNF34],
                                    'VNFCategory':[this.trailsDt[0].VNFCategory],
                                    'webFilteringCategory':[this.trailsDt[0].webFilteringCategory],
                                    'BootstrapQ1':[this.trailsDt[0].BootstrapQ1],
                                    'BootstrapQ2':[this.trailsDt[0].BootstrapQ2],
                                    'BootstrapQ2_1':[this.trailsDt[0].BootstrapQ2_1],
                                    'BootstrapQ2_2':[this.trailsDt[0].BootstrapQ2_2],
                                    'BootstrapQ2_3':[this.trailsDt[0].BootstrapQ2_3],
                                    'BootstrapQ2_4':[this.trailsDt[0].BootstrapQ2_4],
                                    'BootstrapQ2_5':[this.trailsDt[0].BootstrapQ2_5],
                                    'DualUplinkQ11':[this.trailsDt[0].DualUplinkQ11],
                                    'RoutingQ24':[this.trailsDt[0].RoutingQ24],
                                    'RoutingQ25':[this.trailsDt[0].RoutingQ25],
                                    'RoutingQ26':[this.trailsDt[0].RoutingQ26],
                                    'RoutingQ27':[this.trailsDt[0].RoutingQ27],
                                    'RoutingQ28':[this.trailsDt[0].RoutingQ28],
                        
                                });   


                            });
                    });
            }
          });
    }

    ngAfterViewInit() {
        /*console.log("I am called from ngAfterViewInit()");
        jQuery('#wifiOnNSGCard').widgster('collapse');

        jQuery('#securityPoliciesCard').widgster('collapse'); //topologyCard
        jQuery('#topologyCard').widgster('collapse');//NSGopsCard
        jQuery('#NSGopsCard').widgster('collapse');//NATTraversalCard
        jQuery('#NATTraversalCard').widgster('collapse');
        jQuery('#NSGBRCard').widgster('collapse');//NSGBRCard
        jQuery('#ConnectivityCard').widgster('collapse');//ConnectivityCard
        jQuery('#PATtoOverlayCard').widgster('collapse');//PATtoOverlayCard
        jQuery('#DNACard').widgster('collapse');//DNACard
        jQuery('#IPSECCard').widgster('collapse');//IPSECCard
        jQuery('#NSGUBRCard').widgster('collapse');//NSGUBRCard
        jQuery('#ServiceChainingCard').widgster('collapse');//ServiceChainingCard
        jQuery('#VNFCard').widgster('collapse');//VNFCard
        jQuery('#platformRedendencyFlag').widgster('collapse');//
        //bootstrappingCard
        jQuery('#bootstrappingCard').widgster('collapse');
        //dualUplinkCard
        jQuery('#dualUplinkCard').widgster('collapse');
        //routingCard
        jQuery('#routingCard').widgster('collapse');*/

        jQuery('#advancesFeaturesFlag').widgster('collapse');
        jQuery('#webfilteringFlag').widgster('collapse');
        jQuery('#MPLSSuportFlag').widgster('collapse');
        jQuery('#basicSDWANFlag').widgster('collapse');
        jQuery('#SDWANServiceFlag').widgster('collapse');
        jQuery('#sassgatewayFlag').widgster('collapse');
        jQuery('#cloudGateway').widgster('collapse');
        jQuery('#portalServiceFlag').widgster('collapse');
    }



    openAccordian(acc) {
        console.log(acc);
        //if(acc==='SDWANServiceFlag'){
        jQuery(acc).widgster('expand');
        //this.featuresArr.remove(acc);
        this.featuresArr.splice(this.featuresArr.indexOf(acc), 1);
        for (var i = 0; i < this.featuresArr.length; i++) {
            jQuery(this.featuresArr[i]).widgster('collapse');
        }
        this.featuresArr.push(acc);
        //}
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

  findQualifiedOpportunity() {
    this.trailstudio
      .getAllProjects()
      .subscribe((data) => {
        this.getAllProjects();
      });
  }


  getAllProjects() {
    this.trailstudio
      .getQualifiedOpportunities()
      .subscribe((data) => {
        console.log(data);
        this.projects = data;
        console.log("I am called again for projects..", this.projects);
      });
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
    this.accountForm.value.customerName = newArray[0].customername;
  }

  // Default Customer Details
  defaultProjectDetails(proj) {
    var newArray123 = this.projects.filter(function (item) {
      return item.projectid == proj;
    });
    this.accountForm.value.customerName = newArray123[0].customername;
    this.accountForm.value.customerId = newArray123[0].customerid;
    this.accountForm.value.demoedProduct = newArray123[0].interestedproduct
    console.log("these are the project details", newArray123[0].interestedproduct);
    /* this.productDemosForm.patchValue({
       customerName: [newArray123[0].customername],
       customerId: [newArray123[0].customerid],
       demoedProduct:[newArray123[0].interestedproduct],
     });*/
  }


    //-------------------------------Sales Manger Contact Function ----------------------------------
    createSalesContact() {
        return this.formBuilder.group({
            name: '',
            jobTitle: '',
            contactEmail: '',
            contactPhone: ''
        });
    }
    addSalesContact(item) {
        this.salesContact = this.accountForm.get('salesManagerContact') as FormArray;
        this.salesContact.push(this.createSalesContact());
    }


    removeSalesContact(index) {
        if (index != 0) {
            (this.accountForm.controls.salesManagerContact as FormArray).controls.splice(index, 1);
            this.accountForm.value.salesManagerContact.splice(index, 1);
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
            contactPhone: ''
        });
    }
    addIPCCContact(item) {
        this.IPCCContact = this.accountForm.get('IPCCContact') as FormArray;
        this.IPCCContact.push(this.createIPCCContact());
    }


    removeIPCCContact(index) {
        if (index != 0) {
            (this.accountForm.controls.IPCCContact as FormArray).controls.splice(index, 1);
            this.accountForm.value.IPCCContact.splice(index, 1);
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
            contactPhone: ''
        });
    }
    addAccountManagerContact(item) {
        this.accountManagerContact = this.accountForm.get('accountManagerContact') as FormArray;
        this.accountManagerContact.push(this.createAccountManagerontact());
    }


    removeAccountManagerContact(index) {
        if (index != 0) {
            (this.accountForm.controls.accountManagerContact as FormArray).controls.splice(index, 1);
            this.accountForm.value.accountManagerContact.splice(index, 1);
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
            contactPhone: ''
        });
    }
    addTechnicalProjectManagerContact(item) {
        this.techinicalProjectContact = this.accountForm.get('techinicalProjectContact') as FormArray;
        this.techinicalProjectContact.push(this.createTechnicalProjectManagerontact());
    }


    removeTechnicalProjectmanagerContact(index) {
        if (index != 0) {
            (this.accountForm.controls.techinicalProjectContact as FormArray).controls.splice(index, 1);
            this.accountForm.value.techinicalProjectContact.splice(index, 1);
        } else {
            alert("Please enter atleast one customer contact..");
        }
    }



// End Customer Contact Functions
    createEndCustomer() {
        return this.formBuilder.group({
            endCustomerName: '',
            jobTitle: '',
        });
    }

    addEndCustomer(item) {
        this.endCustDt = this.accountForm.get('endCustDt') as FormArray;
        this.endCustDt.push(this.createEndCustomer());
    }

    removeEndCustomer(index) {
        // remove the row specified in index
        if (index != 0) {
            (this.accountForm.controls.endCustDt as FormArray).controls.splice(index, 1);
            this.accountForm.value.endCustDt.splice(index, 1);
        } else {
            alert("Please enter atleast one customer contact..");
        }
    }

// Customer Contact Functions
    createItem() {
        return this.formBuilder.group({
            name: '',
            jobTitle: '',
            contactEmail: '',
            contactPhone: ''
        });
    }


    addContacts(item) {
        this.items = this.accountForm.get('items') as FormArray;
        this.items.push(this.createItem());



    }

    removeContact(index) {
        // remove the row specified in index
        if (index != 0) {
            (this.accountForm.controls.items as FormArray).controls.splice(index, 1);
            this.accountForm.value.items.splice(index, 1);
        } else {
            alert("Please enter atleast one customer contact..");
        }
    }


    selectPackage(pkg){
        this.featuresForm.value.package = pkg;
        //this.next();
    }


    public next() {
        let accountForm = this.accountForm;
        let personalForm = this.featuresForm;
        let paymentForm = this.paymentForm;
        let featuresForm = this.featuresForm;
        let toastrService = this.toastrService;

        if (this.steps[this.steps.length - 1].active)
            return false;
        //this.toastrService.error('Please fill the detals of the subcategory by clicking  icon', 'Thank you :)');
        this.steps.some(function (step, index, steps) {
            if (index < steps.length - 1) {
                if (step.active) {
                    if (step.name == 'Trail Details') {
                        /* if (accountForm.valid) {
                             step.active = false;
                             step.valid = true;
                             steps[index+1].active=true;
                             return true;
                         }
                         else{
                             step.hasError = true;
                         }  */
                      
console.log(accountForm.value);
                        step.valid = true;
                        step.active = false;
                        steps[index + 1].active = true;
                        return true;
                    }
                    if (step.name == 'Packages') {
                        /* if (personalForm.valid) {
                             step.active = false;
                             step.valid = true;
                             steps[index+1].active=true;
                             return true;
                         }
                         else{
                             step.hasError = true;
                         }  */
                        step.active = false;
                        step.valid = true;
                        steps[index + 1].active = true;
                        return true;
                    }
                    if (step.name == 'Selected Features') {
                        if (paymentForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index + 1].active = true;
                            return true;
                        }
                        else {
                            step.hasError = true;
                        }
                    }
                    if (step.name == 'Features') {
                        if (!featuresForm.value.SDWANServiceFlag &&
                            !featuresForm.value.basicSDWAN
                            && !featuresForm.value.advancedFeaturesFlag
                            && !featuresForm.value.webFilteringFlag
                            && !featuresForm.value.sassgatewayFlag
                            && !featuresForm.value.cloudGateway
                            && !featuresForm.value.portalServiceFlag
                            && !featuresForm.value.MPLSSupport
                        ) {
                            toastrService.error('Please select atlest one feature to continue....', 'Missing Features');
                            step.hasError = true;
                        } else {
                            jQuery('#advancesFeaturesFlag').widgster('collapse');
                            jQuery('#webfilteringFlag').widgster('collapse');
                            jQuery('#MPLSSuportFlag').widgster('collapse');
                            jQuery('#basicSDWANFlag').widgster('collapse');
                            jQuery('#SDWANServiceFlag').widgster('collapse');

                            jQuery('#sassgatewayFlag').widgster('collapse');

                            jQuery('#cloudGateway').widgster('collapse');
                            jQuery('#portalServiceFlag').widgster('collapse');

                            toastrService.warning('Please select click on the "V" icon to fill the details of the festures selected');
                            step.active = false;
                            step.valid = true;
                            steps[index + 1].active = true;
                            return true;
                        }
                    }
                    if (step.name == 'Feature Details') {
                        console.log("This is for the confirmation....");
                        step.active = false;
                        step.valid = true;
                        steps[index + 1].active = true;
                        return true;
                    }


                }
            }
        });



        /*   this.details.username = this.accountForm.value.username;
           this.details.fullname = this.personalForm.value.firstname + " " + this.personalForm.value.lastname;
           this.details.gender = this.personalForm.value.gender;
           this.details.email = this.personalForm.value.email;
           this.details.phone = this.personalForm.value.phone;
           this.details.country = this.personalForm.value.country;
           this.details.zipcode = this.personalForm.value.zipcode;
           this.details.address = this.personalForm.value.address;
           this.details.cardtype = this.paymentForm.value.cardtype;
           this.details.cardnumber = this.paymentForm.value.cardnumber;  */
    }

    public prev() {
        let featuresForm = this.featuresForm;
        if (this.steps[0].active) {
            //console.log("This the first step....");
            this.router.navigate(['/pages/trail-details']);
            return false;
        }
        this.steps.some(function (step, index, steps) {
            if (index != 0) {
                if (step.active) {
                    step.active = false;
                    steps[index - 1].active = true;
                    return true;
                }
            }
        });
        console.log(featuresForm.value);
    }

    public confirm() {
        this.toastrService.success('Trail Requested succcessfully.', 'Thank You :)');
        this.steps.forEach(step => step.valid = true);
        // this.formJoin =new FormGroup({form1:this.accountForm,
        //    form2:this.featuresForm})

       this.defaultCustomerDetails(this.accountForm.value.customerId);
        var merged = Object.assign(this.accountForm.value, this.featuresDetailsForm.value, this.featuresForm.value, this.conformationForm.value);
        console.log(merged);

        if (this.trail) {
            console.log("Calling Update..");
            this.router.navigate(['/pages/thankyou']);
        } else {
            console.log("Final Merged: ",merged);
        this.trailstudio.insertSolutionTrail(merged);
        this.router.navigate(['/pages/thankyou']);
        }


       /*.subscribe((data) => {
          console.log("Saved Successfully...", data);
        });*/
    }

}

