import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    PacketMysuffixService,
    PacketMysuffixPopupService,
    PacketMysuffixComponent,
    PacketMysuffixDetailComponent,
    PacketMysuffixDialogComponent,
    PacketMysuffixPopupComponent,
    PacketMysuffixDeletePopupComponent,
    PacketMysuffixDeleteDialogComponent,
    packetRoute,
    packetPopupRoute,
    PacketMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...packetRoute,
    ...packetPopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PacketMysuffixComponent,
        PacketMysuffixDetailComponent,
        PacketMysuffixDialogComponent,
        PacketMysuffixDeleteDialogComponent,
        PacketMysuffixPopupComponent,
        PacketMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        PacketMysuffixComponent,
        PacketMysuffixDialogComponent,
        PacketMysuffixPopupComponent,
        PacketMysuffixDeleteDialogComponent,
        PacketMysuffixDeletePopupComponent,
    ],
    providers: [
        PacketMysuffixService,
        PacketMysuffixPopupService,
        PacketMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugPacketMysuffixModule {}
