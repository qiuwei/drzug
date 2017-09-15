/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PaymentMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/payment/payment-mysuffix-detail.component';
import { PaymentMysuffixService } from '../../../../../../main/webapp/app/entities/payment/payment-mysuffix.service';
import { PaymentMysuffix } from '../../../../../../main/webapp/app/entities/payment/payment-mysuffix.model';

describe('Component Tests', () => {

    describe('PaymentMysuffix Management Detail Component', () => {
        let comp: PaymentMysuffixDetailComponent;
        let fixture: ComponentFixture<PaymentMysuffixDetailComponent>;
        let service: PaymentMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [PaymentMysuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PaymentMysuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(PaymentMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentMysuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PaymentMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.payment).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
