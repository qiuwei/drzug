import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    OrderItemMysuffixService,
    OrderItemMysuffixPopupService,
    OrderItemMysuffixComponent,
    OrderItemMysuffixDetailComponent,
    OrderItemMysuffixDialogComponent,
    OrderItemMysuffixPopupComponent,
    OrderItemMysuffixDeletePopupComponent,
    OrderItemMysuffixDeleteDialogComponent,
    orderItemRoute,
    orderItemPopupRoute,
    OrderItemMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...orderItemRoute,
    ...orderItemPopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OrderItemMysuffixComponent,
        OrderItemMysuffixDetailComponent,
        OrderItemMysuffixDialogComponent,
        OrderItemMysuffixDeleteDialogComponent,
        OrderItemMysuffixPopupComponent,
        OrderItemMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        OrderItemMysuffixComponent,
        OrderItemMysuffixDialogComponent,
        OrderItemMysuffixPopupComponent,
        OrderItemMysuffixDeleteDialogComponent,
        OrderItemMysuffixDeletePopupComponent,
    ],
    providers: [
        OrderItemMysuffixService,
        OrderItemMysuffixPopupService,
        OrderItemMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugOrderItemMysuffixModule {}
