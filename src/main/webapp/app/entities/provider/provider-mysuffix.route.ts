import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ProviderMysuffixComponent } from './provider-mysuffix.component';
import { ProviderMysuffixDetailComponent } from './provider-mysuffix-detail.component';
import { ProviderMysuffixPopupComponent } from './provider-mysuffix-dialog.component';
import { ProviderMysuffixDeletePopupComponent } from './provider-mysuffix-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ProviderMysuffixResolvePagingParams implements Resolve<any> {

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

export const providerRoute: Routes = [
    {
        path: 'provider-mysuffix',
        component: ProviderMysuffixComponent,
        resolve: {
            'pagingParams': ProviderMysuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'provider-mysuffix/:id',
        component: ProviderMysuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const providerPopupRoute: Routes = [
    {
        path: 'provider-mysuffix-new',
        component: ProviderMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'provider-mysuffix/:id/edit',
        component: ProviderMysuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'provider-mysuffix/:id/delete',
        component: ProviderMysuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'drzugApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
