package es.qiu.drzug.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache("users", jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Product.class.getName() + ".providers", jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Purchase.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Purchase.class.getName() + ".purchaseItems", jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.PurchaseItem.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Invoice.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Invoice.class.getName() + ".invoiceItems", jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.InvoiceItem.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.OrderItem.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Order.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Order.class.getName() + ".orderItems", jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Packet.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Packet.class.getName() + ".packetItems", jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Payment.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.PacketItem.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Storage.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Provider.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Provider.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Customer.class.getName() + ".invoices", jcacheConfiguration);
            cm.createCache(es.qiu.drzug.domain.Tax.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
