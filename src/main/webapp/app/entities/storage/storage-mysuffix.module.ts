import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    StorageMysuffixService,
    StorageMysuffixPopupService,
    StorageMysuffixComponent,
    StorageMysuffixDetailComponent,
    StorageMysuffixDialogComponent,
    StorageMysuffixPopupComponent,
    StorageMysuffixDeletePopupComponent,
    StorageMysuffixDeleteDialogComponent,
    storageRoute,
    storagePopupRoute,
    StorageMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...storageRoute,
    ...storagePopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        StorageMysuffixComponent,
        StorageMysuffixDetailComponent,
        StorageMysuffixDialogComponent,
        StorageMysuffixDeleteDialogComponent,
        StorageMysuffixPopupComponent,
        StorageMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        StorageMysuffixComponent,
        StorageMysuffixDialogComponent,
        StorageMysuffixPopupComponent,
        StorageMysuffixDeleteDialogComponent,
        StorageMysuffixDeletePopupComponent,
    ],
    providers: [
        StorageMysuffixService,
        StorageMysuffixPopupService,
        StorageMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugStorageMysuffixModule {}
