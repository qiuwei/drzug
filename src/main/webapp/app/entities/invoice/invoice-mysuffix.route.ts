import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { InvoiceMysuffixComponent } from './invoice-mysuffix.component';
import { InvoiceMysuffixDetailComponent } from './invoice-mysuffix-detail.component';
import { InvoiceMysuffixPopupComponent } from './invoice-mysuffix-dialog.component';
import { InvoiceMysuffixDeletePopupComponent } from './invoice-mysuffix-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class InvoiceMysuffixResolvePagingParams implements Resolve<any> {

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

export const invoiceRoute: Routes = [
    {
        path: 'invoice-mysuffix',
        component: InvoiceMysuffixComponent,
        resolve: {
            'pagingParams': InvoiceMysuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'invoice-mysuffix/:id',
        component: InvoiceMysuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoicePopupRoute: Routes = [
    {
        path: 'invoice-mysuffix-new',
        component: InvoiceMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-mysuffix/:id/edit',
        component: InvoiceMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-mysuffix/:id/delete',
        component: InvoiceMysuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.invoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
