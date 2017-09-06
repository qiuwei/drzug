import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    CustomerMysuffixService,
    CustomerMysuffixPopupService,
    CustomerMysuffixComponent,
    CustomerMysuffixDetailComponent,
    CustomerMysuffixDialogComponent,
    CustomerMysuffixPopupComponent,
    CustomerMysuffixDeletePopupComponent,
    CustomerMysuffixDeleteDialogComponent,
    customerRoute,
    customerPopupRoute,
    CustomerMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...customerRoute,
    ...customerPopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CustomerMysuffixComponent,
        CustomerMysuffixDetailComponent,
        CustomerMysuffixDialogComponent,
        CustomerMysuffixDeleteDialogComponent,
        CustomerMysuffixPopupComponent,
        CustomerMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        CustomerMysuffixComponent,
        CustomerMysuffixDialogComponent,
        CustomerMysuffixPopupComponent,
        CustomerMysuffixDeleteDialogComponent,
        CustomerMysuffixDeletePopupComponent,
    ],
    providers: [
        CustomerMysuffixService,
        CustomerMysuffixPopupService,
        CustomerMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugCustomerMysuffixModule {}
