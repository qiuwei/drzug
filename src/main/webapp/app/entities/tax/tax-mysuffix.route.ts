import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TaxMysuffixComponent } from './tax-mysuffix.component';
import { TaxMysuffixDetailComponent } from './tax-mysuffix-detail.component';
import { TaxMysuffixPopupComponent } from './tax-mysuffix-dialog.component';
import { TaxMysuffixDeletePopupComponent } from './tax-mysuffix-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class TaxMysuffixResolvePagingParams implements Resolve<any> {

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

export const taxRoute: Routes = [
    {
        path: 'tax-mysuffix',
        component: TaxMysuffixComponent,
        resolve: {
            'pagingParams': TaxMysuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tax-mysuffix/:id',
        component: TaxMysuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taxPopupRoute: Routes = [
    {
        path: 'tax-mysuffix-new',
        component: TaxMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tax-mysuffix/:id/edit',
        component: TaxMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tax-mysuffix/:id/delete',
        component: TaxMysuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
