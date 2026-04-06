import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Languages, PenLine, List, QrCode, Palette } from "lucide-react";
import { Link } from "wouter";
import libraryBg from "@assets/image_1769909210137.png";
import previewToc from "@assets/image_1770859609910.png";
import previewMatn from "@assets/image_1770858689585.png";
import previewWorkbook from "@assets/image_1770858706528.png";

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

const timelineSteps = [
  {
    number: "01",
    title: "Structured Table of Contents",
    description: "Every workbook begins with a clear, organised table of contents featuring colour-coded sections, recommended explanations, books to read, key vocabulary tables, and QR codes linking to further study resources.",
    image: previewToc,
    icon: List,
    testId: "timeline-toc"
  },
  {
    number: "02",
    title: "Bilingual Matn (Arabic & English)",
    description: "The heart of each workbook — the original classical Arabic text presented side-by-side with a precise English translation. Fully vowelised Arabic with scholarly evidences from the Qur'an and Sunnah, colour-coded for clarity.",
    image: previewMatn,
    icon: Languages,
    testId: "timeline-matn"
  },
  {
    number: "03",
    title: "Guided Exercises & Note-Taking",
    description: "Each section includes fill-in exercises and dedicated note-taking spaces designed to help students actively engage with the material, reinforce understanding, and memorise the key points of every lesson.",
    image: previewWorkbook,
    icon: PenLine,
    testId: "timeline-exercises"
  }
];

const features = [
  {
    icon: Palette,
    title: "Colour-Coded Key",
    description: "A visual system that distinguishes Arabic text, translations, evidences, and scholarly commentary at a glance."
  },
  {
    icon: BookOpen,
    title: "Recommended Readings",
    description: "Curated lists of recommended explanations and books to deepen understanding of each classical text."
  },
  {
    icon: QrCode,
    title: "QR Code Resources",
    description: "Scan-to-access links to audio explanations, lectures, and supplementary materials for extended learning."
  },
  {
    icon: Languages,
    title: "Key Vocabulary & Terms",
    description: "Tables of essential Arabic vocabulary and Istilahat (technical terms) with clear definitions for each workbook."
  }
];

export default function Product() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
              data-testid="link-logo-home"
            >
              <span className="font-arabic text-2xl text-accent">متون</span>
              <div className="w-px h-5 bg-border" />
              <span className="text-xs tracking-scholarly text-muted-foreground uppercase font-medium">Mutoon</span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/mission">
              <span className="text-muted-foreground hover:text-foreground text-sm tracking-wide transition-colors cursor-pointer" data-testid="link-nav-mission">
                Our Mission
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
              Inside Our Workbooks
            </motion.p>

            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.4}
            >
              Designed for Depth
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
              Each workbook is carefully structured to guide students through the classical texts
              with bilingual content, guided exercises, and scholarly references.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 relative" data-testid="section-timeline">
        <div className="absolute inset-0 pattern-lines opacity-50" />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            {timelineSteps.map((step, idx) => (
              <motion.div
                key={step.testId}
                className="relative flex gap-6 md:gap-10 pb-20 last:pb-0"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                data-testid={step.testId}
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    className="w-14 h-14 border-2 border-accent/40 flex items-center justify-center bg-background relative z-10"
                    whileInView={{ scale: [0.8, 1.05, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                  >
                    <step.icon className="w-6 h-6 text-accent" />
                  </motion.div>
                  {idx < timelineSteps.length - 1 && (
                    <motion.div
                      className="w-px flex-1 bg-accent/20 mt-2"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.1 + 0.4 }}
                      style={{ transformOrigin: 'top' }}
                    />
                  )}
                </div>

                <div className="flex-1 pb-4">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-accent/30 font-display text-3xl leading-none">{step.number}</span>
                    <h3 className="font-display text-xl md:text-2xl text-foreground" data-testid={`text-title-${step.testId}`}>
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6" data-testid={`text-desc-${step.testId}`}>
                    {step.description}
                  </p>

                  <motion.div
                    className="bg-card border border-border overflow-hidden shadow-soft max-w-lg"
                    whileInView={{ y: [20, 0], opacity: [0, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <motion.img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover object-top"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4 }}
                        data-testid={`img-${step.testId}`}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              What You Will Find
            </motion.p>
            <motion.h2
              className="font-display text-3xl md:text-4xl text-foreground"
              variants={staggerItem}
            >
              Key Features
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                className="p-8 bg-background border border-border shadow-soft"
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                data-testid={`feature-${idx}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-accent/30 flex-shrink-0 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              <Link href="/#workbooks">
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
              <Link href="/mission">
                <span className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer" data-testid="link-footer-mission">Mission</span>
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
