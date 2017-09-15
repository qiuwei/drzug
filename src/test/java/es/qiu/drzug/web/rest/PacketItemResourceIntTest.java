package es.qiu.drzug.web.rest;

import es.qiu.drzug.DrzugApp;

import es.qiu.drzug.domain.PacketItem;
import es.qiu.drzug.repository.PacketItemRepository;
import es.qiu.drzug.service.PacketItemService;
import es.qiu.drzug.service.dto.PacketItemDTO;
import es.qiu.drzug.service.mapper.PacketItemMapper;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PacketItemResource REST controller.
 *
 * @see PacketItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DrzugApp.class)
public class PacketItemResourceIntTest {

    private static final Long DEFAULT_COUNT = 1L;
    private static final Long UPDATED_COUNT = 2L;

    @Autowired
    private PacketItemRepository packetItemRepository;

    @Autowired
    private PacketItemMapper packetItemMapper;

    @Autowired
    private PacketItemService packetItemService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPacketItemMockMvc;

    private PacketItem packetItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PacketItemResource packetItemResource = new PacketItemResource(packetItemService);
        this.restPacketItemMockMvc = MockMvcBuilders.standaloneSetup(packetItemResource)
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
    public static PacketItem createEntity(EntityManager em) {
        PacketItem packetItem = new PacketItem()
            .count(DEFAULT_COUNT);
        return packetItem;
    }

    @Before
    public void initTest() {
        packetItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createPacketItem() throws Exception {
        int databaseSizeBeforeCreate = packetItemRepository.findAll().size();

        // Create the PacketItem
        PacketItemDTO packetItemDTO = packetItemMapper.toDto(packetItem);
        restPacketItemMockMvc.perform(post("/api/packet-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packetItemDTO)))
            .andExpect(status().isCreated());

        // Validate the PacketItem in the database
        List<PacketItem> packetItemList = packetItemRepository.findAll();
        assertThat(packetItemList).hasSize(databaseSizeBeforeCreate + 1);
        PacketItem testPacketItem = packetItemList.get(packetItemList.size() - 1);
        assertThat(testPacketItem.getCount()).isEqualTo(DEFAULT_COUNT);
    }

    @Test
    @Transactional
    public void createPacketItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = packetItemRepository.findAll().size();

        // Create the PacketItem with an existing ID
        packetItem.setId(1L);
        PacketItemDTO packetItemDTO = packetItemMapper.toDto(packetItem);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPacketItemMockMvc.perform(post("/api/packet-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packetItemDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PacketItem in the database
        List<PacketItem> packetItemList = packetItemRepository.findAll();
        assertThat(packetItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCountIsRequired() throws Exception {
        int databaseSizeBeforeTest = packetItemRepository.findAll().size();
        // set the field null
        packetItem.setCount(null);

        // Create the PacketItem, which fails.
        PacketItemDTO packetItemDTO = packetItemMapper.toDto(packetItem);

        restPacketItemMockMvc.perform(post("/api/packet-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packetItemDTO)))
            .andExpect(status().isBadRequest());

        List<PacketItem> packetItemList = packetItemRepository.findAll();
        assertThat(packetItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPacketItems() throws Exception {
        // Initialize the database
        packetItemRepository.saveAndFlush(packetItem);

        // Get all the packetItemList
        restPacketItemMockMvc.perform(get("/api/packet-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(packetItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].count").value(hasItem(DEFAULT_COUNT.intValue())));
    }

    @Test
    @Transactional
    public void getPacketItem() throws Exception {
        // Initialize the database
        packetItemRepository.saveAndFlush(packetItem);

        // Get the packetItem
        restPacketItemMockMvc.perform(get("/api/packet-items/{id}", packetItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(packetItem.getId().intValue()))
            .andExpect(jsonPath("$.count").value(DEFAULT_COUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPacketItem() throws Exception {
        // Get the packetItem
        restPacketItemMockMvc.perform(get("/api/packet-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePacketItem() throws Exception {
        // Initialize the database
        packetItemRepository.saveAndFlush(packetItem);
        int databaseSizeBeforeUpdate = packetItemRepository.findAll().size();

        // Update the packetItem
        PacketItem updatedPacketItem = packetItemRepository.findOne(packetItem.getId());
        updatedPacketItem
            .count(UPDATED_COUNT);
        PacketItemDTO packetItemDTO = packetItemMapper.toDto(updatedPacketItem);

        restPacketItemMockMvc.perform(put("/api/packet-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packetItemDTO)))
            .andExpect(status().isOk());

        // Validate the PacketItem in the database
        List<PacketItem> packetItemList = packetItemRepository.findAll();
        assertThat(packetItemList).hasSize(databaseSizeBeforeUpdate);
        PacketItem testPacketItem = packetItemList.get(packetItemList.size() - 1);
        assertThat(testPacketItem.getCount()).isEqualTo(UPDATED_COUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingPacketItem() throws Exception {
        int databaseSizeBeforeUpdate = packetItemRepository.findAll().size();

        // Create the PacketItem
        PacketItemDTO packetItemDTO = packetItemMapper.toDto(packetItem);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPacketItemMockMvc.perform(put("/api/packet-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packetItemDTO)))
            .andExpect(status().isCreated());

        // Validate the PacketItem in the database
        List<PacketItem> packetItemList = packetItemRepository.findAll();
        assertThat(packetItemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePacketItem() throws Exception {
        // Initialize the database
        packetItemRepository.saveAndFlush(packetItem);
        int databaseSizeBeforeDelete = packetItemRepository.findAll().size();

        // Get the packetItem
        restPacketItemMockMvc.perform(delete("/api/packet-items/{id}", packetItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PacketItem> packetItemList = packetItemRepository.findAll();
        assertThat(packetItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PacketItem.class);
        PacketItem packetItem1 = new PacketItem();
        packetItem1.setId(1L);
        PacketItem packetItem2 = new PacketItem();
        packetItem2.setId(packetItem1.getId());
        assertThat(packetItem1).isEqualTo(packetItem2);
        packetItem2.setId(2L);
        assertThat(packetItem1).isNotEqualTo(packetItem2);
        packetItem1.setId(null);
        assertThat(packetItem1).isNotEqualTo(packetItem2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PacketItemDTO.class);
        PacketItemDTO packetItemDTO1 = new PacketItemDTO();
        packetItemDTO1.setId(1L);
        PacketItemDTO packetItemDTO2 = new PacketItemDTO();
        assertThat(packetItemDTO1).isNotEqualTo(packetItemDTO2);
        packetItemDTO2.setId(packetItemDTO1.getId());
        assertThat(packetItemDTO1).isEqualTo(packetItemDTO2);
        packetItemDTO2.setId(2L);
        assertThat(packetItemDTO1).isNotEqualTo(packetItemDTO2);
        packetItemDTO1.setId(null);
        assertThat(packetItemDTO1).isNotEqualTo(packetItemDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(packetItemMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(packetItemMapper.fromId(null)).isNull();
    }
}
