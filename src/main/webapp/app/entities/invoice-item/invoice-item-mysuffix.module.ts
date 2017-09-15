import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    InvoiceItemMysuffixService,
    InvoiceItemMysuffixPopupService,
    InvoiceItemMysuffixComponent,
    InvoiceItemMysuffixDetailComponent,
    InvoiceItemMysuffixDialogComponent,
    InvoiceItemMysuffixPopupComponent,
    InvoiceItemMysuffixDeletePopupComponent,
    InvoiceItemMysuffixDeleteDialogComponent,
    invoiceItemRoute,
    invoiceItemPopupRoute,
    InvoiceItemMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...invoiceItemRoute,
    ...invoiceItemPopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        InvoiceItemMysuffixComponent,
        InvoiceItemMysuffixDetailComponent,
        InvoiceItemMysuffixDialogComponent,
        InvoiceItemMysuffixDeleteDialogComponent,
        InvoiceItemMysuffixPopupComponent,
        InvoiceItemMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceItemMysuffixComponent,
        InvoiceItemMysuffixDialogComponent,
        InvoiceItemMysuffixPopupComponent,
        InvoiceItemMysuffixDeleteDialogComponent,
        InvoiceItemMysuffixDeletePopupComponent,
    ],
    providers: [
        InvoiceItemMysuffixService,
        InvoiceItemMysuffixPopupService,
        InvoiceItemMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugInvoiceItemMysuffixModule {}
