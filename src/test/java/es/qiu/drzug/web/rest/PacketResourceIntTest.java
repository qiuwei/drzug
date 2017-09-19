package es.qiu.drzug.web.rest;

import es.qiu.drzug.DrzugApp;

import es.qiu.drzug.domain.Packet;
import es.qiu.drzug.repository.PacketRepository;
import es.qiu.drzug.service.PacketService;
import es.qiu.drzug.service.dto.PacketDTO;
import es.qiu.drzug.service.mapper.PacketMapper;
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
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import es.qiu.drzug.domain.enumeration.PacketStatus;
/**
 * Test class for the PacketResource REST controller.
 *
 * @see PacketResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DrzugApp.class)
public class PacketResourceIntTest {

    private static final BigDecimal DEFAULT_WEIGHT = new BigDecimal(1);
    private static final BigDecimal UPDATED_WEIGHT = new BigDecimal(2);

    private static final PacketStatus DEFAULT_STATUS = PacketStatus.NEW;
    private static final PacketStatus UPDATED_STATUS = PacketStatus.SENT;

    @Autowired
    private PacketRepository packetRepository;

    @Autowired
    private PacketMapper packetMapper;

    @Autowired
    private PacketService packetService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPacketMockMvc;

    private Packet packet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PacketResource packetResource = new PacketResource(packetService);
        this.restPacketMockMvc = MockMvcBuilders.standaloneSetup(packetResource)
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
    public static Packet createEntity(EntityManager em) {
        Packet packet = new Packet()
            .weight(DEFAULT_WEIGHT)
            .status(DEFAULT_STATUS);
        return packet;
    }

    @Before
    public void initTest() {
        packet = createEntity(em);
    }

    @Test
    @Transactional
    public void createPacket() throws Exception {
        int databaseSizeBeforeCreate = packetRepository.findAll().size();

        // Create the Packet
        PacketDTO packetDTO = packetMapper.toDto(packet);
        restPacketMockMvc.perform(post("/api/packets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packetDTO)))
            .andExpect(status().isCreated());

        // Validate the Packet in the database
        List<Packet> packetList = packetRepository.findAll();
        assertThat(packetList).hasSize(databaseSizeBeforeCreate + 1);
        Packet testPacket = packetList.get(packetList.size() - 1);
        assertThat(testPacket.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testPacket.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createPacketWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = packetRepository.findAll().size();

        // Create the Packet with an existing ID
        packet.setId(UUID.fromString("00000000-0000-0000-0000-000000000001"));
        PacketDTO packetDTO = packetMapper.toDto(packet);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPacketMockMvc.perform(post("/api/packets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Packet in the database
        List<Packet> packetList = packetRepository.findAll();
        assertThat(packetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkWeightIsRequired() throws Exception {
        int databaseSizeBeforeTest = packetRepository.findAll().size();
        // set the field null
        packet.setWeight(null);

        // Create the Packet, which fails.
        PacketDTO packetDTO = packetMapper.toDto(packet);

        restPacketMockMvc.perform(post("/api/packets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packetDTO)))
            .andExpect(status().isBadRequest());

        List<Packet> packetList = packetRepository.findAll();
        assertThat(packetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = packetRepository.findAll().size();
        // set the field null
        packet.setStatus(null);

        // Create the Packet, which fails.
        PacketDTO packetDTO = packetMapper.toDto(packet);

        restPacketMockMvc.perform(post("/api/packets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packetDTO)))
            .andExpect(status().isBadRequest());

        List<Packet> packetList = packetRepository.findAll();
        assertThat(packetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPackets() throws Exception {
        // Initialize the database
        packetRepository.saveAndFlush(packet);

        // Get all the packetList
        restPacketMockMvc.perform(get("/api/packets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(packet.getId().toString())))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getPacket() throws Exception {
        // Initialize the database
        packetRepository.saveAndFlush(packet);

        // Get the packet
        restPacketMockMvc.perform(get("/api/packets/{id}", packet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(packet.getId().toString()))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPacket() throws Exception {
        // Get the packet
        restPacketMockMvc.perform(get("/api/packets/{id}", UUID.randomUUID()))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePacket() throws Exception {
        // Initialize the database
        packetRepository.saveAndFlush(packet);
        int databaseSizeBeforeUpdate = packetRepository.findAll().size();

        // Update the packet
        Packet updatedPacket = packetRepository.findOne(packet.getId());
        updatedPacket
            .weight(UPDATED_WEIGHT)
            .status(UPDATED_STATUS);
        PacketDTO packetDTO = packetMapper.toDto(updatedPacket);

        restPacketMockMvc.perform(put("/api/packets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packetDTO)))
            .andExpect(status().isOk());

        // Validate the Packet in the database
        List<Packet> packetList = packetRepository.findAll();
        assertThat(packetList).hasSize(databaseSizeBeforeUpdate);
        Packet testPacket = packetList.get(packetList.size() - 1);
        assertThat(testPacket.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testPacket.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingPacket() throws Exception {
        int databaseSizeBeforeUpdate = packetRepository.findAll().size();

        // Create the Packet
        PacketDTO packetDTO = packetMapper.toDto(packet);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPacketMockMvc.perform(put("/api/packets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packetDTO)))
            .andExpect(status().isCreated());

        // Validate the Packet in the database
        List<Packet> packetList = packetRepository.findAll();
        assertThat(packetList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePacket() throws Exception {
        // Initialize the database
        packetRepository.saveAndFlush(packet);
        int databaseSizeBeforeDelete = packetRepository.findAll().size();

        // Get the packet
        restPacketMockMvc.perform(delete("/api/packets/{id}", packet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Packet> packetList = packetRepository.findAll();
        assertThat(packetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Packet.class);
        Packet packet1 = new Packet();
        packet1.setId(UUID.fromString("00000000-0000-0000-0000-000000000001"));
        Packet packet2 = new Packet();
        packet2.setId(packet1.getId());
        assertThat(packet1).isEqualTo(packet2);
        packet2.setId(UUID.fromString("00000000-0000-0000-0000-000000000002"));
        assertThat(packet1).isNotEqualTo(packet2);
        packet1.setId(null);
        assertThat(packet1).isNotEqualTo(packet2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PacketDTO.class);
        PacketDTO packetDTO1 = new PacketDTO();
        packetDTO1.setId(UUID.fromString("00000000-0000-0000-0000-000000000001"));
        PacketDTO packetDTO2 = new PacketDTO();
        assertThat(packetDTO1).isNotEqualTo(packetDTO2);
        packetDTO2.setId(packetDTO1.getId());
        assertThat(packetDTO1).isEqualTo(packetDTO2);
        packetDTO2.setId(UUID.fromString("00000000-0000-0000-0000-000000000002"));
        assertThat(packetDTO1).isNotEqualTo(packetDTO2);
        packetDTO1.setId(null);
        assertThat(packetDTO1).isNotEqualTo(packetDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(packetMapper.fromId(UUID.fromString("00000000-0000-0000-0000-000000000042")).getId()).isEqualTo(UUID.fromString("00000000-0000-0000-0000-000000000042"));
        assertThat(packetMapper.fromId(null)).isNull();
    }
}
