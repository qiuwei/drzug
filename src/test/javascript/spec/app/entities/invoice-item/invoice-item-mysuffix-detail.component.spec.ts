import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { InvoiceItemMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/invoice-item/invoice-item-mysuffix-detail.component';
import { InvoiceItemMysuffixService } from '../../../../../../main/webapp/app/entities/invoice-item/invoice-item-mysuffix.service';
import { InvoiceItemMysuffix } from '../../../../../../main/webapp/app/entities/invoice-item/invoice-item-mysuffix.model';

describe('Component Tests', () => {

    describe('InvoiceItemMysuffix Management Detail Component', () => {
        let comp: InvoiceItemMysuffixDetailComponent;
        let fixture: ComponentFixture<InvoiceItemMysuffixDetailComponent>;
        let service: InvoiceItemMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [InvoiceItemMysuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    InvoiceItemMysuffixService,
                    EventManager
                ]
            }).overrideTemplate(InvoiceItemMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InvoiceItemMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InvoiceItemMysuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new InvoiceItemMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.invoiceItem).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
