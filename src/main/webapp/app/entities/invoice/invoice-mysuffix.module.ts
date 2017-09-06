import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    InvoiceMysuffixService,
    InvoiceMysuffixPopupService,
    InvoiceMysuffixComponent,
    InvoiceMysuffixDetailComponent,
    InvoiceMysuffixDialogComponent,
    InvoiceMysuffixPopupComponent,
    InvoiceMysuffixDeletePopupComponent,
    InvoiceMysuffixDeleteDialogComponent,
    invoiceRoute,
    invoicePopupRoute,
    InvoiceMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...invoiceRoute,
    ...invoicePopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        InvoiceMysuffixComponent,
        InvoiceMysuffixDetailComponent,
        InvoiceMysuffixDialogComponent,
        InvoiceMysuffixDeleteDialogComponent,
        InvoiceMysuffixPopupComponent,
        InvoiceMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceMysuffixComponent,
        InvoiceMysuffixDialogComponent,
        InvoiceMysuffixPopupComponent,
        InvoiceMysuffixDeleteDialogComponent,
        InvoiceMysuffixDeletePopupComponent,
    ],
    providers: [
        InvoiceMysuffixService,
        InvoiceMysuffixPopupService,
        InvoiceMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugInvoiceMysuffixModule {}
