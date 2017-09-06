import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DrzugTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CustomerMysuffixDetailComponent } from '../../../../../../main/webapp/app/entities/customer/customer-mysuffix-detail.component';
import { CustomerMysuffixService } from '../../../../../../main/webapp/app/entities/customer/customer-mysuffix.service';
import { CustomerMysuffix } from '../../../../../../main/webapp/app/entities/customer/customer-mysuffix.model';

describe('Component Tests', () => {

    describe('CustomerMysuffix Management Detail Component', () => {
        let comp: CustomerMysuffixDetailComponent;
        let fixture: ComponentFixture<CustomerMysuffixDetailComponent>;
        let service: CustomerMysuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DrzugTestModule],
                declarations: [CustomerMysuffixDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CustomerMysuffixService,
                    EventManager
                ]
            }).overrideTemplate(CustomerMysuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerMysuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerMysuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CustomerMysuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.customer).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
