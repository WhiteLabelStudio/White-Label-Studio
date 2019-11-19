import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from '../../../app.state';
import { SidebarService } from '../sidebar/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'az-navbar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [ SidebarService ]
})

export class NavbarComponent {
    public router: Router;
    public isMenuCollapsed:boolean = false;
    item:any;

    constructor(private _state:AppState, private _sidebarService:SidebarService,router:Router) {
        this.router = router;
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
        this.item = JSON.parse(localStorage.getItem('UserDt'));
        console.log("I am in top navigation bar",this.item);
        console.log("My First Name",this.item);
    }

    public closeSubMenus(){
       /* when using <az-sidebar> instead of <az-menu> uncomment this line */
      // this._sidebarService.closeAllSubMenus();
    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed; 
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);        
    }

    logout(){
        localStorage.removeItem('UserDt');
        console.log("You are logging out...");
        this.router.navigate(['/login']);
    }

}
