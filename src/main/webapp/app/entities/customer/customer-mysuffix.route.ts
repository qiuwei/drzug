import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { CustomerMysuffixComponent } from './customer-mysuffix.component';
import { CustomerMysuffixDetailComponent } from './customer-mysuffix-detail.component';
import { CustomerMysuffixPopupComponent } from './customer-mysuffix-dialog.component';
import { CustomerMysuffixDeletePopupComponent } from './customer-mysuffix-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class CustomerMysuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: PaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const customerRoute: Routes = [
    {
        path: 'customer-mysuffix',
        component: CustomerMysuffixComponent,
        resolve: {
            'pagingParams': CustomerMysuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-mysuffix/:id',
        component: CustomerMysuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerPopupRoute: Routes = [
    {
        path: 'customer-mysuffix-new',
        component: CustomerMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-mysuffix/:id/edit',
        component: CustomerMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-mysuffix/:id/delete',
        component: CustomerMysuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
