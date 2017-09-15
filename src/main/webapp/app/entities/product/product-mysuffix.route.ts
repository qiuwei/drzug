import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ProductMysuffixComponent } from './product-mysuffix.component';
import { ProductMysuffixDetailComponent } from './product-mysuffix-detail.component';
import { ProductMysuffixPopupComponent } from './product-mysuffix-dialog.component';
import { ProductMysuffixDeletePopupComponent } from './product-mysuffix-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ProductMysuffixResolvePagingParams implements Resolve<any> {

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

export const productRoute: Routes = [
    {
        path: 'product-mysuffix',
        component: ProductMysuffixComponent,
        resolve: {
            'pagingParams': ProductMysuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-mysuffix/:id',
        component: ProductMysuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productPopupRoute: Routes = [
    {
        path: 'product-mysuffix-new',
        component: ProductMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-mysuffix/:id/edit',
        component: ProductMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-mysuffix/:id/delete',
        component: ProductMysuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
