import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    PurchaseMysuffixService,
    PurchaseMysuffixPopupService,
    PurchaseMysuffixComponent,
    PurchaseMysuffixDetailComponent,
    PurchaseMysuffixDialogComponent,
    PurchaseMysuffixPopupComponent,
    PurchaseMysuffixDeletePopupComponent,
    PurchaseMysuffixDeleteDialogComponent,
    purchaseRoute,
    purchasePopupRoute,
    PurchaseMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...purchaseRoute,
    ...purchasePopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PurchaseMysuffixComponent,
        PurchaseMysuffixDetailComponent,
        PurchaseMysuffixDialogComponent,
        PurchaseMysuffixDeleteDialogComponent,
        PurchaseMysuffixPopupComponent,
        PurchaseMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        PurchaseMysuffixComponent,
        PurchaseMysuffixDialogComponent,
        PurchaseMysuffixPopupComponent,
        PurchaseMysuffixDeleteDialogComponent,
        PurchaseMysuffixDeletePopupComponent,
    ],
    providers: [
        PurchaseMysuffixService,
        PurchaseMysuffixPopupService,
        PurchaseMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugPurchaseMysuffixModule {}
