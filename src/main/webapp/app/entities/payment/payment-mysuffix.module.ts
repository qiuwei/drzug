import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    PaymentMysuffixService,
    PaymentMysuffixPopupService,
    PaymentMysuffixComponent,
    PaymentMysuffixDetailComponent,
    PaymentMysuffixDialogComponent,
    PaymentMysuffixPopupComponent,
    PaymentMysuffixDeletePopupComponent,
    PaymentMysuffixDeleteDialogComponent,
    paymentRoute,
    paymentPopupRoute,
    PaymentMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...paymentRoute,
    ...paymentPopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PaymentMysuffixComponent,
        PaymentMysuffixDetailComponent,
        PaymentMysuffixDialogComponent,
        PaymentMysuffixDeleteDialogComponent,
        PaymentMysuffixPopupComponent,
        PaymentMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        PaymentMysuffixComponent,
        PaymentMysuffixDialogComponent,
        PaymentMysuffixPopupComponent,
        PaymentMysuffixDeleteDialogComponent,
        PaymentMysuffixDeletePopupComponent,
    ],
    providers: [
        PaymentMysuffixService,
        PaymentMysuffixPopupService,
        PaymentMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugPaymentMysuffixModule {}
