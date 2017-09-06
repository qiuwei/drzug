import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PacketItemMysuffixComponent } from './packet-item-mysuffix.component';
import { PacketItemMysuffixDetailComponent } from './packet-item-mysuffix-detail.component';
import { PacketItemMysuffixPopupComponent } from './packet-item-mysuffix-dialog.component';
import { PacketItemMysuffixDeletePopupComponent } from './packet-item-mysuffix-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class PacketItemMysuffixResolvePagingParams implements Resolve<any> {

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

export const packetItemRoute: Routes = [
    {
        path: 'packet-item-mysuffix',
        component: PacketItemMysuffixComponent,
        resolve: {
            'pagingParams': PacketItemMysuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.packetItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'packet-item-mysuffix/:id',
        component: PacketItemMysuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.packetItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const packetItemPopupRoute: Routes = [
    {
        path: 'packet-item-mysuffix-new',
        component: PacketItemMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.packetItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'packet-item-mysuffix/:id/edit',
        component: PacketItemMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.packetItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'packet-item-mysuffix/:id/delete',
        component: PacketItemMysuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.packetItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
