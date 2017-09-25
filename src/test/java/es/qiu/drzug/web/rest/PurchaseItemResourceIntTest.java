package es.qiu.drzug.web.rest;

import es.qiu.drzug.DrzugApp;

import es.qiu.drzug.domain.PurchaseItem;
import es.qiu.drzug.repository.PurchaseItemRepository;
import es.qiu.drzug.service.PurchaseItemService;
import es.qiu.drzug.service.dto.PurchaseItemDTO;
import es.qiu.drzug.service.mapper.PurchaseItemMapper;
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
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PurchaseItemResource REST controller.
 *
 * @see PurchaseItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DrzugApp.class)
public class PurchaseItemResourceIntTest {

    private static final Long DEFAULT_COUNT = 1L;
    private static final Long UPDATED_COUNT = 2L;

    @Autowired
    private PurchaseItemRepository purchaseItemRepository;

    @Autowired
    private PurchaseItemMapper purchaseItemMapper;

    @Autowired
    private PurchaseItemService purchaseItemService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPurchaseItemMockMvc;

    private PurchaseItem purchaseItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PurchaseItemResource purchaseItemResource = new PurchaseItemResource(purchaseItemService);
        this.restPurchaseItemMockMvc = MockMvcBuilders.standaloneSetup(purchaseItemResource)
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
    public static PurchaseItem createEntity(EntityManager em) {
        PurchaseItem purchaseItem = new PurchaseItem()
            .count(DEFAULT_COUNT);
        return purchaseItem;
    }

    @Before
    public void initTest() {
        purchaseItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createPurchaseItem() throws Exception {
        int databaseSizeBeforeCreate = purchaseItemRepository.findAll().size();

        // Create the PurchaseItem
        PurchaseItemDTO purchaseItemDTO = purchaseItemMapper.toDto(purchaseItem);
        restPurchaseItemMockMvc.perform(post("/api/purchase-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItemDTO)))
            .andExpect(status().isCreated());

        // Validate the PurchaseItem in the database
        List<PurchaseItem> purchaseItemList = purchaseItemRepository.findAll();
        assertThat(purchaseItemList).hasSize(databaseSizeBeforeCreate + 1);
        PurchaseItem testPurchaseItem = purchaseItemList.get(purchaseItemList.size() - 1);
        assertThat(testPurchaseItem.getCount()).isEqualTo(DEFAULT_COUNT);
    }

    @Test
    @Transactional
    public void createPurchaseItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = purchaseItemRepository.findAll().size();

        // Create the PurchaseItem with an existing ID
        purchaseItem.setId(UUID.fromString("00000000-0000-0000-0000-000000000001"));
        PurchaseItemDTO purchaseItemDTO = purchaseItemMapper.toDto(purchaseItem);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurchaseItemMockMvc.perform(post("/api/purchase-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItemDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseItem in the database
        List<PurchaseItem> purchaseItemList = purchaseItemRepository.findAll();
        assertThat(purchaseItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCountIsRequired() throws Exception {
        int databaseSizeBeforeTest = purchaseItemRepository.findAll().size();
        // set the field null
        purchaseItem.setCount(null);

        // Create the PurchaseItem, which fails.
        PurchaseItemDTO purchaseItemDTO = purchaseItemMapper.toDto(purchaseItem);

        restPurchaseItemMockMvc.perform(post("/api/purchase-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItemDTO)))
            .andExpect(status().isBadRequest());

        List<PurchaseItem> purchaseItemList = purchaseItemRepository.findAll();
        assertThat(purchaseItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPurchaseItems() throws Exception {
        // Initialize the database
        purchaseItemRepository.saveAndFlush(purchaseItem);

        // Get all the purchaseItemList
        restPurchaseItemMockMvc.perform(get("/api/purchase-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purchaseItem.getId().toString())))
            .andExpect(jsonPath("$.[*].count").value(hasItem(DEFAULT_COUNT.toString())));
    }

    @Test
    @Transactional
    public void getPurchaseItem() throws Exception {
        // Initialize the database
        purchaseItemRepository.saveAndFlush(purchaseItem);

        // Get the purchaseItem
        restPurchaseItemMockMvc.perform(get("/api/purchase-items/{id}", purchaseItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(purchaseItem.getId().toString()))
            .andExpect(jsonPath("$.count").value(DEFAULT_COUNT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPurchaseItem() throws Exception {
        // Get the purchaseItem
        restPurchaseItemMockMvc.perform(get("/api/purchase-items/{id}", UUID.randomUUID()))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePurchaseItem() throws Exception {
        // Initialize the database
        purchaseItemRepository.saveAndFlush(purchaseItem);
        int databaseSizeBeforeUpdate = purchaseItemRepository.findAll().size();

        // Update the purchaseItem
        PurchaseItem updatedPurchaseItem = purchaseItemRepository.findOne(purchaseItem.getId());
        updatedPurchaseItem
            .count(UPDATED_COUNT);
        PurchaseItemDTO purchaseItemDTO = purchaseItemMapper.toDto(updatedPurchaseItem);

        restPurchaseItemMockMvc.perform(put("/api/purchase-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItemDTO)))
            .andExpect(status().isOk());

        // Validate the PurchaseItem in the database
        List<PurchaseItem> purchaseItemList = purchaseItemRepository.findAll();
        assertThat(purchaseItemList).hasSize(databaseSizeBeforeUpdate);
        PurchaseItem testPurchaseItem = purchaseItemList.get(purchaseItemList.size() - 1);
        assertThat(testPurchaseItem.getCount()).isEqualTo(UPDATED_COUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingPurchaseItem() throws Exception {
        int databaseSizeBeforeUpdate = purchaseItemRepository.findAll().size();

        // Create the PurchaseItem
        PurchaseItemDTO purchaseItemDTO = purchaseItemMapper.toDto(purchaseItem);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPurchaseItemMockMvc.perform(put("/api/purchase-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseItemDTO)))
            .andExpect(status().isCreated());

        // Validate the PurchaseItem in the database
        List<PurchaseItem> purchaseItemList = purchaseItemRepository.findAll();
        assertThat(purchaseItemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePurchaseItem() throws Exception {
        // Initialize the database
        purchaseItemRepository.saveAndFlush(purchaseItem);
        int databaseSizeBeforeDelete = purchaseItemRepository.findAll().size();

        // Get the purchaseItem
        restPurchaseItemMockMvc.perform(delete("/api/purchase-items/{id}", purchaseItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PurchaseItem> purchaseItemList = purchaseItemRepository.findAll();
        assertThat(purchaseItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseItem.class);
        PurchaseItem purchaseItem1 = new PurchaseItem();
        purchaseItem1.setId(UUID.fromString("00000000-0000-0000-0000-000000000001"));
        PurchaseItem purchaseItem2 = new PurchaseItem();
        purchaseItem2.setId(purchaseItem1.getId());
        assertThat(purchaseItem1).isEqualTo(purchaseItem2);
        purchaseItem2.setId(UUID.fromString("00000000-0000-0000-0000-000000000002"));
        assertThat(purchaseItem1).isNotEqualTo(purchaseItem2);
        purchaseItem1.setId(null);
        assertThat(purchaseItem1).isNotEqualTo(purchaseItem2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseItemDTO.class);
        PurchaseItemDTO purchaseItemDTO1 = new PurchaseItemDTO();
        purchaseItemDTO1.setId(UUID.fromString("00000000-0000-0000-0000-000000000001"));
        PurchaseItemDTO purchaseItemDTO2 = new PurchaseItemDTO();
        assertThat(purchaseItemDTO1).isNotEqualTo(purchaseItemDTO2);
        purchaseItemDTO2.setId(purchaseItemDTO1.getId());
        assertThat(purchaseItemDTO1).isEqualTo(purchaseItemDTO2);
        purchaseItemDTO2.setId(UUID.fromString("00000000-0000-0000-0000-000000000002"));
        assertThat(purchaseItemDTO1).isNotEqualTo(purchaseItemDTO2);
        purchaseItemDTO1.setId(null);
        assertThat(purchaseItemDTO1).isNotEqualTo(purchaseItemDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(purchaseItemMapper.fromId(UUID.fromString("00000000-0000-0000-0000-000000000042")).getId()).isEqualTo(UUID.fromString("00000000-0000-0000-0000-000000000042"));
        assertThat(purchaseItemMapper.fromId(null)).isNull();
    }
}
