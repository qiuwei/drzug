import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DrzugSharedModule } from '../../shared';
import {
    PacketItemMysuffixService,
    PacketItemMysuffixPopupService,
    PacketItemMysuffixComponent,
    PacketItemMysuffixDetailComponent,
    PacketItemMysuffixDialogComponent,
    PacketItemMysuffixPopupComponent,
    PacketItemMysuffixDeletePopupComponent,
    PacketItemMysuffixDeleteDialogComponent,
    packetItemRoute,
    packetItemPopupRoute,
    PacketItemMysuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...packetItemRoute,
    ...packetItemPopupRoute,
];

@NgModule({
    imports: [
        DrzugSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PacketItemMysuffixComponent,
        PacketItemMysuffixDetailComponent,
        PacketItemMysuffixDialogComponent,
        PacketItemMysuffixDeleteDialogComponent,
        PacketItemMysuffixPopupComponent,
        PacketItemMysuffixDeletePopupComponent,
    ],
    entryComponents: [
        PacketItemMysuffixComponent,
        PacketItemMysuffixDialogComponent,
        PacketItemMysuffixPopupComponent,
        PacketItemMysuffixDeleteDialogComponent,
        PacketItemMysuffixDeletePopupComponent,
    ],
    providers: [
        PacketItemMysuffixService,
        PacketItemMysuffixPopupService,
        PacketItemMysuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugPacketItemMysuffixModule {}
