import { motion } from "framer-motion";

function AnimatedSection({
  id,
  className = "",
  children,
  delay = 0,
  y = 40, // lower than 80 — less overlap feel
}) {
  return (
    <section id={id} className={className}>
      <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default AnimatedSection;