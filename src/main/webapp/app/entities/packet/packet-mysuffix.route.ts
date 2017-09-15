import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PacketMysuffixComponent } from './packet-mysuffix.component';
import { PacketMysuffixDetailComponent } from './packet-mysuffix-detail.component';
import { PacketMysuffixPopupComponent } from './packet-mysuffix-dialog.component';
import { PacketMysuffixDeletePopupComponent } from './packet-mysuffix-delete-dialog.component';

@Injectable()
export class PacketMysuffixResolvePagingParams implements Resolve<any> {

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

export const packetRoute: Routes = [
    {
        path: 'packet-mysuffix',
        component: PacketMysuffixComponent,
        resolve: {
            'pagingParams': PacketMysuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.packet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'packet-mysuffix/:id',
        component: PacketMysuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.packet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const packetPopupRoute: Routes = [
    {
        path: 'packet-mysuffix-new',
        component: PacketMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.packet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'packet-mysuffix/:id/edit',
        component: PacketMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.packet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'packet-mysuffix/:id/delete',
        component: PacketMysuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.packet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
