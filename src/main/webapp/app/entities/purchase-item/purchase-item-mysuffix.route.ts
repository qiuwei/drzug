import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PurchaseItemMysuffixComponent } from './purchase-item-mysuffix.component';
import { PurchaseItemMysuffixDetailComponent } from './purchase-item-mysuffix-detail.component';
import { PurchaseItemMysuffixPopupComponent } from './purchase-item-mysuffix-dialog.component';
import { PurchaseItemMysuffixDeletePopupComponent } from './purchase-item-mysuffix-delete-dialog.component';

@Injectable()
export class PurchaseItemMysuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

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

export const purchaseItemRoute: Routes = [
    {
        path: 'purchase-item-mysuffix',
        component: PurchaseItemMysuffixComponent,
        resolve: {
            'pagingParams': PurchaseItemMysuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.purchaseItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'purchase-item-mysuffix/:id',
        component: PurchaseItemMysuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.purchaseItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const purchaseItemPopupRoute: Routes = [
    {
        path: 'purchase-item-mysuffix-new',
        component: PurchaseItemMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.purchaseItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'purchase-item-mysuffix/:id/edit',
        component: PurchaseItemMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.purchaseItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'purchase-item-mysuffix/:id/delete',
        component: PurchaseItemMysuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.purchaseItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
