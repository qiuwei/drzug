import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    TaxMysuffixService,
    TaxMysuffixPopupService,
    TaxMysuffixComponent,
    TaxMysuffixDetailComponent,
    TaxMysuffixDialogComponent,
    TaxMysuffixPopupComponent,
    TaxMysuffixDeletePopupComponent,
    TaxMysuffixDeleteDialogComponent,
    taxRoute,
    taxPopupRoute,
    TaxMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...taxRoute,
    ...taxPopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TaxMysuffixComponent,
        TaxMysuffixDetailComponent,
        TaxMysuffixDialogComponent,
        TaxMysuffixDeleteDialogComponent,
        TaxMysuffixPopupComponent,
        TaxMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        TaxMysuffixComponent,
        TaxMysuffixDialogComponent,
        TaxMysuffixPopupComponent,
        TaxMysuffixDeleteDialogComponent,
        TaxMysuffixDeletePopupComponent,
    ],
    providers: [
        TaxMysuffixService,
        TaxMysuffixPopupService,
        TaxMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugTaxMysuffixModule {}
