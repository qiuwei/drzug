import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    PurchaseItemMysuffixService,
    PurchaseItemMysuffixPopupService,
    PurchaseItemMysuffixComponent,
    PurchaseItemMysuffixDetailComponent,
    PurchaseItemMysuffixDialogComponent,
    PurchaseItemMysuffixPopupComponent,
    PurchaseItemMysuffixDeletePopupComponent,
    PurchaseItemMysuffixDeleteDialogComponent,
    purchaseItemRoute,
    purchaseItemPopupRoute,
    PurchaseItemMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...purchaseItemRoute,
    ...purchaseItemPopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PurchaseItemMysuffixComponent,
        PurchaseItemMysuffixDetailComponent,
        PurchaseItemMysuffixDialogComponent,
        PurchaseItemMysuffixDeleteDialogComponent,
        PurchaseItemMysuffixPopupComponent,
        PurchaseItemMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        PurchaseItemMysuffixComponent,
        PurchaseItemMysuffixDialogComponent,
        PurchaseItemMysuffixPopupComponent,
        PurchaseItemMysuffixDeleteDialogComponent,
        PurchaseItemMysuffixDeletePopupComponent,
    ],
    providers: [
        PurchaseItemMysuffixService,
        PurchaseItemMysuffixPopupService,
        PurchaseItemMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugPurchaseItemMysuffixModule {}
