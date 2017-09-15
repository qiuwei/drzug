import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    OrderMysuffixService,
    OrderMysuffixPopupService,
    OrderMysuffixComponent,
    OrderMysuffixDetailComponent,
    OrderMysuffixDialogComponent,
    OrderMysuffixPopupComponent,
    OrderMysuffixDeletePopupComponent,
    OrderMysuffixDeleteDialogComponent,
    orderRoute,
    orderPopupRoute,
    OrderMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...orderRoute,
    ...orderPopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OrderMysuffixComponent,
        OrderMysuffixDetailComponent,
        OrderMysuffixDialogComponent,
        OrderMysuffixDeleteDialogComponent,
        OrderMysuffixPopupComponent,
        OrderMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        OrderMysuffixComponent,
        OrderMysuffixDialogComponent,
        OrderMysuffixPopupComponent,
        OrderMysuffixDeleteDialogComponent,
        OrderMysuffixDeletePopupComponent,
    ],
    providers: [
        OrderMysuffixService,
        OrderMysuffixPopupService,
        OrderMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugOrderMysuffixModule {}
