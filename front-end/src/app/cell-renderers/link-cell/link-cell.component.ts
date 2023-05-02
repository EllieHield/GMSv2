import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
    template: `<a [routerLink]="[params.inRouterLink,params.value]">{{params.value}}</a>`
})
export class LinkRendererComponent implements AgRendererComponent {    
    params: any;    

    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        return false;
    }    
}