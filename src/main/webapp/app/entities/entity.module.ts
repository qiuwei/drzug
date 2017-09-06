import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DrzugProductMysuffixModule } from './product/product-mysuffix.module';
import { DrzugPurchaseMysuffixModule } from './purchase/purchase-mysuffix.module';
import { DrzugPurchaseItemMysuffixModule } from './purchase-item/purchase-item-mysuffix.module';
import { DrzugInvoiceMysuffixModule } from './invoice/invoice-mysuffix.module';
import { DrzugInvoiceItemMysuffixModule } from './invoice-item/invoice-item-mysuffix.module';
import { DrzugOrderItemMysuffixModule } from './order-item/order-item-mysuffix.module';
import { DrzugOrderMysuffixModule } from './order/order-mysuffix.module';
import { DrzugPacketMysuffixModule } from './packet/packet-mysuffix.module';
import { DrzugPaymentMysuffixModule } from './payment/payment-mysuffix.module';
import { DrzugPacketItemMysuffixModule } from './packet-item/packet-item-mysuffix.module';
import { DrzugStorageMysuffixModule } from './storage/storage-mysuffix.module';
import { DrzugProviderMysuffixModule } from './provider/provider-mysuffix.module';
import { DrzugCustomerMysuffixModule } from './customer/customer-mysuffix.module';
import { DrzugTaxMysuffixModule } from './tax/tax-mysuffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DrzugProductMysuffixModule,
        DrzugPurchaseMysuffixModule,
        DrzugPurchaseItemMysuffixModule,
        DrzugInvoiceMysuffixModule,
        DrzugInvoiceItemMysuffixModule,
        DrzugOrderItemMysuffixModule,
        DrzugOrderMysuffixModule,
        DrzugPacketMysuffixModule,
        DrzugPaymentMysuffixModule,
        DrzugPacketItemMysuffixModule,
        DrzugStorageMysuffixModule,
        DrzugProviderMysuffixModule,
        DrzugCustomerMysuffixModule,
        DrzugTaxMysuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrzugEntityModule {}
