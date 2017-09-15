import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PurchaseMysuffixComponent } from './purchase-mysuffix.component';
import { PurchaseMysuffixDetailComponent } from './purchase-mysuffix-detail.component';
import { PurchaseMysuffixPopupComponent } from './purchase-mysuffix-dialog.component';
import { PurchaseMysuffixDeletePopupComponent } from './purchase-mysuffix-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class PurchaseMysuffixResolvePagingParams implements Resolve<any> {

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

export const purchaseRoute: Routes = [
    {
        path: 'purchase-mysuffix',
        component: PurchaseMysuffixComponent,
        resolve: {
            'pagingParams': PurchaseMysuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.purchase.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'purchase-mysuffix/:id',
        component: PurchaseMysuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.purchase.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const purchasePopupRoute: Routes = [
    {
        path: 'purchase-mysuffix-new',
        component: PurchaseMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.purchase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'purchase-mysuffix/:id/edit',
        component: PurchaseMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.purchase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'purchase-mysuffix/:id/delete',
        component: PurchaseMysuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.purchase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
