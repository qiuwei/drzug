import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    ProviderMysuffixService,
    ProviderMysuffixPopupService,
    ProviderMysuffixComponent,
    ProviderMysuffixDetailComponent,
    ProviderMysuffixDialogComponent,
    ProviderMysuffixPopupComponent,
    ProviderMysuffixDeletePopupComponent,
    ProviderMysuffixDeleteDialogComponent,
    providerRoute,
    providerPopupRoute,
    ProviderMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...providerRoute,
    ...providerPopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProviderMysuffixComponent,
        ProviderMysuffixDetailComponent,
        ProviderMysuffixDialogComponent,
        ProviderMysuffixDeleteDialogComponent,
        ProviderMysuffixPopupComponent,
        ProviderMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        ProviderMysuffixComponent,
        ProviderMysuffixDialogComponent,
        ProviderMysuffixPopupComponent,
        ProviderMysuffixDeleteDialogComponent,
        ProviderMysuffixDeletePopupComponent,
    ],
    providers: [
        ProviderMysuffixService,
        ProviderMysuffixPopupService,
        ProviderMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugProviderMysuffixModule {}
