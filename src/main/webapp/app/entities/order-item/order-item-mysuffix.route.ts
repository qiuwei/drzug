import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OrderItemMysuffixComponent } from './order-item-mysuffix.component';
import { OrderItemMysuffixDetailComponent } from './order-item-mysuffix-detail.component';
import { OrderItemMysuffixPopupComponent } from './order-item-mysuffix-dialog.component';
import { OrderItemMysuffixDeletePopupComponent } from './order-item-mysuffix-delete-dialog.component';

@Injectable()
export class OrderItemMysuffixResolvePagingParams implements Resolve<any> {

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

export const orderItemRoute: Routes = [
    {
        path: 'order-item-mysuffix',
        component: OrderItemMysuffixComponent,
        resolve: {
            'pagingParams': OrderItemMysuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-item-mysuffix/:id',
        component: OrderItemMysuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderItemPopupRoute: Routes = [
    {
        path: 'order-item-mysuffix-new',
        component: OrderItemMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-item-mysuffix/:id/edit',
        component: OrderItemMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-item-mysuffix/:id/delete',
        component: OrderItemMysuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.orderItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
