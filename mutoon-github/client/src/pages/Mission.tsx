import { motion } from "framer-motion";
import { BookOpen, Target, Heart, Lightbulb, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import libraryBg from "@assets/image_1769909210137.png";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export default function Mission() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <motion.nav
        className="fixed w-full z-50 bg-background/95 backdrop-blur-sm shadow-soft py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between gap-4 flex-wrap">
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ opacity: 0.7 }}
            >
              <span className="font-arabic text-2xl text-accent">متون</span>
              <div className="w-px h-5 bg-border" />
              <span className="text-xs tracking-scholarly text-muted-foreground uppercase font-medium">Mutoon</span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/product">
              <span className="text-muted-foreground hover:text-foreground text-sm tracking-wide transition-colors cursor-pointer" data-testid="link-nav-product">
                Our Product
              </span>
            </Link>
            <Link href="/">
              <motion.span
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm tracking-wide transition-colors cursor-pointer"
                whileHover={{ x: -3 }}
                data-testid="link-back-home"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${libraryBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/85 to-background" />
        <div className="absolute inset-0 pattern-lines" />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              className="text-accent text-xs tracking-scholarly uppercase mb-6 font-medium"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.2}
            >
              Who We Are
            </motion.p>

            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.4}
            >
              Our Mission
            </motion.h1>

            <motion.div
              className="flex items-center justify-center gap-4 mb-8"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.5}
            >
              <div className="w-16 h-px bg-accent/30" />
              <div className="w-1.5 h-1.5 border border-accent/40 rotate-45" />
              <div className="w-16 h-px bg-accent/30" />
            </motion.div>

            <motion.p
              className="text-muted-foreground text-lg md:text-xl leading-relaxed"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.6}
            >
              To make classical Islamic scholarship accessible to every student of knowledge,
              regardless of their language or background.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 md:py-28 bg-card relative">
        <div className="absolute inset-0 pattern-parchment" />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="flex items-center gap-3 mb-8" variants={staggerItem}>
              <div className="w-10 h-10 border border-accent/30 flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground">Our Purpose</h2>
            </motion.div>

            <motion.p className="text-muted-foreground text-lg leading-relaxed mb-6" variants={staggerItem}>
              Mutoon was founded with a singular vision: to bridge the gap between the rich tradition
              of Islamic classical texts and the modern English-speaking student. For centuries,
              foundational works of Islamic scholarship have been preserved in Arabic, forming the
              backbone of religious education across the Muslim world.
            </motion.p>

            <motion.p className="text-muted-foreground text-lg leading-relaxed mb-6" variants={staggerItem}>
              Yet for many students in the West, accessing these texts meaningfully has remained a
              challenge. Language barriers, lack of structured study materials, and the absence of
              guided learning resources have left a gap that we aim to fill.
            </motion.p>

            <motion.p className="text-muted-foreground text-lg leading-relaxed mb-6" variants={staggerItem}>
              Our workbooks are not mere translations. They are carefully structured educational tools
              that present the original Arabic text alongside precise English translation, enriched with
              vocabulary tables, learning objectives, and guided exercises designed to deepen understanding
              and retention.
            </motion.p>

            <motion.p className="text-muted-foreground text-lg leading-relaxed" variants={staggerItem}>
              We are creating supporting workbooks for the 4 booklets of the{" "}
              <span className="text-foreground font-medium">Mutoon at-Taalib al-Ilm</span>{" "}
              collection. For every book in every level, we are creating a dedicated workbook — 
              providing a comprehensive companion to one of the most respected curricula in Islamic education.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 pattern-lines opacity-50" />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              className="text-accent text-xs tracking-scholarly uppercase mb-4 font-medium"
              variants={staggerItem}
            >
              What We Strive For
            </motion.p>
            <motion.h2
              className="font-display text-3xl md:text-4xl text-foreground"
              variants={staggerItem}
            >
              Our Goals
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Preserve Classical Knowledge",
                desc: "To ensure that the foundational texts of Islamic scholarship remain accessible, studied, and understood by new generations of Muslims worldwide."
              },
              {
                title: "Bridge the Language Gap",
                desc: "To provide high-quality bilingual resources that allow students to engage with Arabic texts even as they develop their language skills, removing barriers to understanding."
              },
              {
                title: "Support Structured Learning",
                desc: "To create educational materials that work in study circles, classrooms, and for self-paced learners, with clear objectives and guided exercises in every chapter."
              },
              {
                title: "Empower Communities",
                desc: "To equip mosques, institutions, and educators with professional-grade resources that elevate the standard of Islamic education in English-speaking communities."
              }
            ].map((goal, idx) => (
              <motion.div
                key={goal.title}
                className="p-8 bg-card border border-border shadow-soft"
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-accent/40 font-display text-3xl leading-none mt-1">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-3">{goal.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{goal.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Motivations */}
      <section className="py-20 md:py-28 bg-card relative">
        <div className="absolute inset-0 pattern-parchment" />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              className="text-accent text-xs tracking-scholarly uppercase mb-4 font-medium"
              variants={staggerItem}
            >
              Why We Do This
            </motion.p>
            <motion.h2
              className="font-display text-3xl md:text-4xl text-foreground"
              variants={staggerItem}
            >
              Our Motivations
            </motion.h2>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: Heart,
                title: "Love for Knowledge",
                desc: "The Prophet (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\" This hadith is the heartbeat of everything we do. We believe every Muslim deserves access to the foundational texts of their faith, presented in a way that inspires understanding and devotion."
              },
              {
                icon: BookOpen,
                title: "Honouring the Scholars",
                desc: "The classical scholars dedicated their lives to preserving and transmitting knowledge. Their works have shaped the understanding of millions. By creating structured, accessible editions of their texts, we honour their legacy and ensure their efforts continue to benefit the Ummah."
              },
              {
                icon: Lightbulb,
                title: "Filling a Gap",
                desc: "We noticed that while translations of classical texts exist, there was a lack of structured workbook-style materials that truly facilitate learning. Our workbooks are designed not just to be read, but to be studied, discussed, and internalised through active engagement."
              }
            ].map((motivation) => (
              <motion.div
                key={motivation.title}
                className="flex items-start gap-6"
                variants={staggerItem}
              >
                <div className="w-12 h-12 border border-accent/30 flex-shrink-0 flex items-center justify-center">
                  <motivation.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-3">{motivation.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{motivation.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${libraryBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/95" />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              className="font-arabic text-3xl md:text-4xl text-accent leading-relaxed mb-6"
              dir="rtl"
              variants={staggerItem}
            >
              طلب العلم فريضة على كل مسلم
            </motion.p>

            <motion.p
              className="text-muted-foreground text-lg italic mb-10"
              variants={staggerItem}
            >
              "Seeking knowledge is an obligation upon every Muslim."
            </motion.p>

            <motion.div variants={staggerItem}>
              <Link href="/">
                <motion.span
                  className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm tracking-wide cursor-pointer transition-all focus-ring shadow-soft hover:shadow-elegant"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  data-testid="link-explore-collection"
                >
                  Explore Our Collection
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="font-arabic text-xl text-accent">متون</span>
              <div className="w-px h-4 bg-border" />
              <span className="text-xs tracking-scholarly text-muted-foreground uppercase">Mutoon</span>
            </div>

            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Mutoon Publications. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link href="/">
                <span className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer" data-testid="link-footer-home">Home</span>
              </Link>
              <Link href="/product">
                <span className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer" data-testid="link-footer-product">Our Product</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
