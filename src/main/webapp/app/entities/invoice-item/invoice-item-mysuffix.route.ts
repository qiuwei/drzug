import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { InvoiceItemMysuffixComponent } from './invoice-item-mysuffix.component';
import { InvoiceItemMysuffixDetailComponent } from './invoice-item-mysuffix-detail.component';
import { InvoiceItemMysuffixPopupComponent } from './invoice-item-mysuffix-dialog.component';
import { InvoiceItemMysuffixDeletePopupComponent } from './invoice-item-mysuffix-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class InvoiceItemMysuffixResolvePagingParams implements Resolve<any> {

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

export const invoiceItemRoute: Routes = [
    {
        path: 'invoice-item-mysuffix',
        component: InvoiceItemMysuffixComponent,
        resolve: {
            'pagingParams': InvoiceItemMysuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.invoiceItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'invoice-item-mysuffix/:id',
        component: InvoiceItemMysuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.invoiceItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoiceItemPopupRoute: Routes = [
    {
        path: 'invoice-item-mysuffix-new',
        component: InvoiceItemMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.invoiceItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-item-mysuffix/:id/edit',
        component: InvoiceItemMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.invoiceItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-item-mysuffix/:id/delete',
        component: InvoiceItemMysuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.invoiceItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
