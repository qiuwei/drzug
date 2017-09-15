package es.qiu.drzug.web.rest;

import es.qiu.drzug.DrzugApp;

import es.qiu.drzug.domain.InvoiceItem;
import es.qiu.drzug.repository.InvoiceItemRepository;
import es.qiu.drzug.service.InvoiceItemService;
import es.qiu.drzug.service.dto.InvoiceItemDTO;
import es.qiu.drzug.service.mapper.InvoiceItemMapper;
import es.qiu.drzug.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the InvoiceItemResource REST controller.
 *
 * @see InvoiceItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DrzugApp.class)
public class InvoiceItemResourceIntTest {

    private static final Long DEFAULT_COUNT = 1L;
    private static final Long UPDATED_COUNT = 2L;

    private static final BigDecimal DEFAULT_DISCOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_DISCOUNT = new BigDecimal(2);

    @Autowired
    private InvoiceItemRepository invoiceItemRepository;

    @Autowired
    private InvoiceItemMapper invoiceItemMapper;

    @Autowired
    private InvoiceItemService invoiceItemService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInvoiceItemMockMvc;

    private InvoiceItem invoiceItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InvoiceItemResource invoiceItemResource = new InvoiceItemResource(invoiceItemService);
        this.restInvoiceItemMockMvc = MockMvcBuilders.standaloneSetup(invoiceItemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InvoiceItem createEntity(EntityManager em) {
        InvoiceItem invoiceItem = new InvoiceItem()
            .count(DEFAULT_COUNT)
            .discount(DEFAULT_DISCOUNT);
        return invoiceItem;
    }

    @Before
    public void initTest() {
        invoiceItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createInvoiceItem() throws Exception {
        int databaseSizeBeforeCreate = invoiceItemRepository.findAll().size();

        // Create the InvoiceItem
        InvoiceItemDTO invoiceItemDTO = invoiceItemMapper.toDto(invoiceItem);
        restInvoiceItemMockMvc.perform(post("/api/invoice-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoiceItemDTO)))
            .andExpect(status().isCreated());

        // Validate the InvoiceItem in the database
        List<InvoiceItem> invoiceItemList = invoiceItemRepository.findAll();
        assertThat(invoiceItemList).hasSize(databaseSizeBeforeCreate + 1);
        InvoiceItem testInvoiceItem = invoiceItemList.get(invoiceItemList.size() - 1);
        assertThat(testInvoiceItem.getCount()).isEqualTo(DEFAULT_COUNT);
        assertThat(testInvoiceItem.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);
    }

    @Test
    @Transactional
    public void createInvoiceItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = invoiceItemRepository.findAll().size();

        // Create the InvoiceItem with an existing ID
        invoiceItem.setId(1L);
        InvoiceItemDTO invoiceItemDTO = invoiceItemMapper.toDto(invoiceItem);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInvoiceItemMockMvc.perform(post("/api/invoice-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoiceItemDTO)))
            .andExpect(status().isBadRequest());

        // Validate the InvoiceItem in the database
        List<InvoiceItem> invoiceItemList = invoiceItemRepository.findAll();
        assertThat(invoiceItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCountIsRequired() throws Exception {
        int databaseSizeBeforeTest = invoiceItemRepository.findAll().size();
        // set the field null
        invoiceItem.setCount(null);

        // Create the InvoiceItem, which fails.
        InvoiceItemDTO invoiceItemDTO = invoiceItemMapper.toDto(invoiceItem);

        restInvoiceItemMockMvc.perform(post("/api/invoice-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoiceItemDTO)))
            .andExpect(status().isBadRequest());

        List<InvoiceItem> invoiceItemList = invoiceItemRepository.findAll();
        assertThat(invoiceItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInvoiceItems() throws Exception {
        // Initialize the database
        invoiceItemRepository.saveAndFlush(invoiceItem);

        // Get all the invoiceItemList
        restInvoiceItemMockMvc.perform(get("/api/invoice-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(invoiceItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].count").value(hasItem(DEFAULT_COUNT.intValue())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT.intValue())));
    }

    @Test
    @Transactional
    public void getInvoiceItem() throws Exception {
        // Initialize the database
        invoiceItemRepository.saveAndFlush(invoiceItem);

        // Get the invoiceItem
        restInvoiceItemMockMvc.perform(get("/api/invoice-items/{id}", invoiceItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(invoiceItem.getId().intValue()))
            .andExpect(jsonPath("$.count").value(DEFAULT_COUNT.intValue()))
            .andExpect(jsonPath("$.discount").value(DEFAULT_DISCOUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingInvoiceItem() throws Exception {
        // Get the invoiceItem
        restInvoiceItemMockMvc.perform(get("/api/invoice-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInvoiceItem() throws Exception {
        // Initialize the database
        invoiceItemRepository.saveAndFlush(invoiceItem);
        int databaseSizeBeforeUpdate = invoiceItemRepository.findAll().size();

        // Update the invoiceItem
        InvoiceItem updatedInvoiceItem = invoiceItemRepository.findOne(invoiceItem.getId());
        updatedInvoiceItem
            .count(UPDATED_COUNT)
            .discount(UPDATED_DISCOUNT);
        InvoiceItemDTO invoiceItemDTO = invoiceItemMapper.toDto(updatedInvoiceItem);

        restInvoiceItemMockMvc.perform(put("/api/invoice-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoiceItemDTO)))
            .andExpect(status().isOk());

        // Validate the InvoiceItem in the database
        List<InvoiceItem> invoiceItemList = invoiceItemRepository.findAll();
        assertThat(invoiceItemList).hasSize(databaseSizeBeforeUpdate);
        InvoiceItem testInvoiceItem = invoiceItemList.get(invoiceItemList.size() - 1);
        assertThat(testInvoiceItem.getCount()).isEqualTo(UPDATED_COUNT);
        assertThat(testInvoiceItem.getDiscount()).isEqualTo(UPDATED_DISCOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingInvoiceItem() throws Exception {
        int databaseSizeBeforeUpdate = invoiceItemRepository.findAll().size();

        // Create the InvoiceItem
        InvoiceItemDTO invoiceItemDTO = invoiceItemMapper.toDto(invoiceItem);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInvoiceItemMockMvc.perform(put("/api/invoice-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invoiceItemDTO)))
            .andExpect(status().isCreated());

        // Validate the InvoiceItem in the database
        List<InvoiceItem> invoiceItemList = invoiceItemRepository.findAll();
        assertThat(invoiceItemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInvoiceItem() throws Exception {
        // Initialize the database
        invoiceItemRepository.saveAndFlush(invoiceItem);
        int databaseSizeBeforeDelete = invoiceItemRepository.findAll().size();

        // Get the invoiceItem
        restInvoiceItemMockMvc.perform(delete("/api/invoice-items/{id}", invoiceItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InvoiceItem> invoiceItemList = invoiceItemRepository.findAll();
        assertThat(invoiceItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InvoiceItem.class);
        InvoiceItem invoiceItem1 = new InvoiceItem();
        invoiceItem1.setId(1L);
        InvoiceItem invoiceItem2 = new InvoiceItem();
        invoiceItem2.setId(invoiceItem1.getId());
        assertThat(invoiceItem1).isEqualTo(invoiceItem2);
        invoiceItem2.setId(2L);
        assertThat(invoiceItem1).isNotEqualTo(invoiceItem2);
        invoiceItem1.setId(null);
        assertThat(invoiceItem1).isNotEqualTo(invoiceItem2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InvoiceItemDTO.class);
        InvoiceItemDTO invoiceItemDTO1 = new InvoiceItemDTO();
        invoiceItemDTO1.setId(1L);
        InvoiceItemDTO invoiceItemDTO2 = new InvoiceItemDTO();
        assertThat(invoiceItemDTO1).isNotEqualTo(invoiceItemDTO2);
        invoiceItemDTO2.setId(invoiceItemDTO1.getId());
        assertThat(invoiceItemDTO1).isEqualTo(invoiceItemDTO2);
        invoiceItemDTO2.setId(2L);
        assertThat(invoiceItemDTO1).isNotEqualTo(invoiceItemDTO2);
        invoiceItemDTO1.setId(null);
        assertThat(invoiceItemDTO1).isNotEqualTo(invoiceItemDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(invoiceItemMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(invoiceItemMapper.fromId(null)).isNull();
    }
}
