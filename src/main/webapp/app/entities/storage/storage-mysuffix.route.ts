import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { StorageMysuffixComponent } from './storage-mysuffix.component';
import { StorageMysuffixDetailComponent } from './storage-mysuffix-detail.component';
import { StorageMysuffixPopupComponent } from './storage-mysuffix-dialog.component';
import { StorageMysuffixDeletePopupComponent } from './storage-mysuffix-delete-dialog.component';

@Injectable()
export class StorageMysuffixResolvePagingParams implements Resolve<any> {

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

export const storageRoute: Routes = [
    {
        path: 'storage-mysuffix',
        component: StorageMysuffixComponent,
        resolve: {
            'pagingParams': StorageMysuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.storage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'storage-mysuffix/:id',
        component: StorageMysuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.storage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const storagePopupRoute: Routes = [
    {
        path: 'storage-mysuffix-new',
        component: StorageMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.storage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'storage-mysuffix/:id/edit',
        component: StorageMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.storage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'storage-mysuffix/:id/delete',
        component: StorageMysuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.storage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
