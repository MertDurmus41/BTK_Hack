import { motion } from 'framer-motion';

const brands = [
  'Turkcell', 'Vodafone', 'Ford', 'Toyota', 'Samsung',
  'Coca-Cola', 'Nike', 'Adidas', 'Pepsi', 'Garanti BBVA',
  'THY', 'LC Waikiki', 'Koçtaş', 'Migros', 'BIM',
  'Arçelik', 'Vestel', 'Ülker', 'Eti', 'Akbank',
];

/* Duplicate for seamless loop */
const allBrands = [...brands, ...brands];

export function BrandMarquee() {
  return (
    <section className="marquee-section" id="brands">
      <motion.div
        className="marquee-section__header"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="marquee-section__label">Trusted Brands</span>
        <h2 className="marquee-section__title">
          Ads from <span className="gradient-text">320+ brands</span> archived
        </h2>
      </motion.div>

      <div className="marquee">
        <div className="marquee__fade marquee__fade--left" />
        <div className="marquee__fade marquee__fade--right" />

        <motion.div
          className="marquee__track"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {allBrands.map((brand, i) => (
            <div key={`${brand}-${i}`} className="marquee__item">
              {brand}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second row, reversed */}
      <div className="marquee marquee--reverse">
        <div className="marquee__fade marquee__fade--left" />
        <div className="marquee__fade marquee__fade--right" />

        <motion.div
          className="marquee__track"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {[...allBrands].reverse().map((brand, i) => (
            <div key={`${brand}-rev-${i}`} className="marquee__item">
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
