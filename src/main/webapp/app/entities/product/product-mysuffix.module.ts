import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    ProductMysuffixService,
    ProductMysuffixPopupService,
    ProductMysuffixComponent,
    ProductMysuffixDetailComponent,
    ProductMysuffixDialogComponent,
    ProductMysuffixPopupComponent,
    ProductMysuffixDeletePopupComponent,
    ProductMysuffixDeleteDialogComponent,
    productRoute,
    productPopupRoute,
    ProductMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...productRoute,
    ...productPopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProductMysuffixComponent,
        ProductMysuffixDetailComponent,
        ProductMysuffixDialogComponent,
        ProductMysuffixDeleteDialogComponent,
        ProductMysuffixPopupComponent,
        ProductMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        ProductMysuffixComponent,
        ProductMysuffixDialogComponent,
        ProductMysuffixPopupComponent,
        ProductMysuffixDeleteDialogComponent,
        ProductMysuffixDeletePopupComponent,
    ],
    providers: [
        ProductMysuffixService,
        ProductMysuffixPopupService,
        ProductMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugProductMysuffixModule {}
