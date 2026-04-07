import workbooksData from "@/data/workbooks.json";
import { WorkbookCard } from "@/components/WorkbookCard";
import { ContactForm } from "@/components/ContactForm";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Users, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Link } from "wouter";
import libraryBg from "@assets/image_1769909210137.png";

const heroSlides = [
  {
    arabicTitle: "ثلاثة الأصول",
    englishTitle: "The Three Principles",
    subtitle: "Al-Usool Ath-Thalatha"
  },
  {
    arabicTitle: "القواعد الأربع",
    englishTitle: "The Four Principles",
    subtitle: "Al-Qawa'id Al-Arba'"
  },
  {
    arabicTitle: "تعظيم العلم",
    englishTitle: "Glorification of Knowledge",
    subtitle: "Ta'dheem Al-'Ilm"
  },
  {
    arabicTitle: "نواقض الإسلام",
    englishTitle: "Nullifiers of Islam",
    subtitle: "Nawaqid Al-Islam"
  },
  {
    arabicTitle: "الأربعين النووية",
    englishTitle: "40 Hadith Nawawi",
    subtitle: "Al-Arba'in An-Nawawiyyah"
  }
];

const quoteArabic = "طلب العلم فريضة على كل مسلم";
const quoteEnglish = "Seeking knowledge is an obligation upon every Muslim.";

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

function TypewriterText({ text, className, isInView, speed = 60 }: { text: string; className?: string; isInView: boolean; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setDisplayedText("");
      setIsComplete(false);
      return;
    }

    let index = 0;
    const chars = text.split("");
    
    const timer = setInterval(() => {
      if (index < chars.length) {
        setDisplayedText(chars.slice(0, index + 1).join(""));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, isInView, speed]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse text-accent">|</span>}
    </span>
  );
}

export default function Home() {
  const workbooks = useMemo(
    () => [...workbooksData].sort((a, b) => (b.amazonLink ? 1 : 0) - (a.amazonLink ? 1 : 0)),
    []
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [workbookSlide, setWorkbookSlide] = useState(0);
  const [quoteInView, setQuoteInView] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const nextWorkbook = useCallback(() => {
    setWorkbookSlide((prev) => (prev + 1) % workbooks.length);
  }, [workbooks.length]);

  const prevWorkbook = useCallback(() => {
    setWorkbookSlide((prev) => (prev - 1 + workbooks.length) % workbooks.length);
  }, [workbooks.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setQuoteInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (quoteRef.current) {
      observer.observe(quoteRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-sm shadow-soft py-4' 
            : 'bg-transparent py-6'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between gap-4 flex-wrap">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ opacity: 0.7 }}
          >
            <span className="font-arabic text-2xl text-accent">متون</span>
            <div className="w-px h-5 bg-border" />
            <span className="text-xs tracking-scholarly text-muted-foreground uppercase font-medium">Mutoon</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10">
            {['About', 'Collection', 'Contact'].map((item, i) => (
              <motion.button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase() === 'collection' ? 'workbooks' : item.toLowerCase())} 
                className="text-muted-foreground hover:text-foreground text-sm tracking-wide transition-colors duration-300 focus-ring"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                data-testid={`button-nav-${item.toLowerCase()}`}
              >
                {item}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/product">
                <span className="text-muted-foreground hover:text-foreground text-sm tracking-wide transition-colors duration-300 cursor-pointer" data-testid="link-product">
                  Our Product
                </span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link href="/mission">
                <span className="text-muted-foreground hover:text-foreground text-sm tracking-wide transition-colors duration-300 cursor-pointer" data-testid="link-mission">
                  Our Mission
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Left Aligned */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Library illustration background */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${libraryBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Cream overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 pattern-lines" />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-2xl pt-32 pb-24">
            
            {/* Small accent */}
            <motion.p 
              className="text-accent text-xs tracking-scholarly uppercase mb-8 font-medium"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.3}
            >
              Islamic Educational Workbooks
            </motion.p>

            {/* Arabic title */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="mb-4"
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="font-arabic text-5xl md:text-6xl lg:text-7xl text-accent leading-relaxed"
                  dir="rtl"
                >
                  {heroSlides[currentSlide].arabicTitle}
                </motion.h1>
              </AnimatePresence>
            </motion.div>

            {/* English title */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.7}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                    {heroSlides[currentSlide].englishTitle}
                  </h2>
                  <p className="text-muted-foreground text-lg italic">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Carousel indicators - new style */}
            <motion.div 
              className="flex items-center gap-2 mt-12"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.9}
            >
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentSlide(idx); setIsAutoPlaying(false); }}
                  className={`transition-all duration-400 focus-ring ${
                    idx === currentSlide 
                      ? 'w-10 h-1 bg-accent' 
                      : 'w-4 h-1 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div 
              className="mt-12"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <motion.button 
                onClick={() => scrollToSection('workbooks')}
                className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm tracking-wide transition-all focus-ring shadow-soft hover:shadow-elegant"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-card relative">
        <div className="absolute inset-0 pattern-parchment" />
        
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-5xl mx-auto">
            
            {/* Section header */}
            <motion.div 
              className="text-center mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p 
                className="text-accent text-xs tracking-scholarly uppercase mb-4 font-medium"
                variants={staggerItem}
              >
                Our Mission
              </motion.p>
              
              <motion.h2 
                className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6"
                variants={staggerItem}
              >
                Bridging Classical Scholarship
                <br />& Modern Learning
              </motion.h2>
              
              <motion.div 
                className="flex items-center justify-center gap-4"
                variants={staggerItem}
              >
                <div className="w-16 h-px bg-accent/30" />
                <div className="w-1.5 h-1.5 border border-accent/40 rotate-45" />
                <div className="w-16 h-px bg-accent/30" />
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.div 
              className="max-w-2xl mx-auto text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-muted-foreground text-lg leading-relaxed">
                Islamic scholarship has been preserved in classical Arabic texts for centuries. 
                We believe language should never be a barrier between a student and their heritage.
                Our workbooks transform these timeless texts into structured, bilingual 
                learning experiences.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { 
                  icon: BookOpen,
                  title: "Structured Learning", 
                  desc: "Learning objectives, vocabulary tables, and guided exercises in every chapter." 
                },
                { 
                  icon: Users,
                  title: "Bilingual Format", 
                  desc: "Original Arabic alongside precise English translation with scholarly context." 
                },
                { 
                  icon: GraduationCap,
                  title: "For Everyone", 
                  desc: "Designed for study circles, institutions, and self-paced learners." 
                }
              ].map((feature) => (
                <motion.div 
                  key={feature.title}
                  className="text-center p-8 bg-background border border-border shadow-soft"
                  variants={staggerItem}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 mx-auto mb-6 border border-accent/30 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workbooks Carousel Section */}
      <section id="workbooks" className="py-10 md:py-14 relative">
        <div className="absolute inset-0 pattern-lines opacity-50" />
        
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          {/* Header */}
          <motion.div 
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div>
              <motion.p 
                className="text-accent text-xs tracking-scholarly uppercase mb-4 font-medium"
                variants={staggerItem}
              >
                The Collection
              </motion.p>
              <motion.h2 
                className="font-display text-3xl md:text-4xl text-foreground"
                variants={staggerItem}
              >
                Our Workbooks
              </motion.h2>
            </div>
            
            {/* Carousel navigation */}
            {workbooks.length > 1 && (
              <motion.div 
                className="flex items-center gap-3"
                variants={staggerItem}
              >
                <button
                  onClick={prevWorkbook}
                  className="w-12 h-12 border border-border hover:border-accent/50 flex items-center justify-center transition-colors focus-ring"
                  aria-label="Previous workbook"
                  data-testid="button-prev-workbook"
                >
                  <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                </button>
                <button
                  onClick={nextWorkbook}
                  className="w-12 h-12 border border-border hover:border-accent/50 flex items-center justify-center transition-colors focus-ring"
                  aria-label="Next workbook"
                  data-testid="button-next-workbook"
                >
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Workbooks Carousel */}
          {workbooks.length > 0 ? (
            <div className="relative overflow-hidden">
              <motion.div 
                className="flex gap-6"
                animate={{ x: `-${workbookSlide * (100 / Math.min(workbooks.length, 3))}%` }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {workbooks.map((workbook) => (
                  <div
                    key={workbook.id}
                    className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  >
                    <WorkbookCard workbook={workbook} />
                  </div>
                ))}
              </motion.div>
              
              {/* Carousel dots */}
              <div className="flex items-center justify-center gap-2 mt-10">
                {workbooks.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setWorkbookSlide(idx)}
                    className={`transition-all duration-300 focus-ring ${
                      idx === workbookSlide 
                        ? 'w-8 h-1.5 bg-accent' 
                        : 'w-3 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to workbook ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Collection coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Quote Section with Typing Effect */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Library background */}
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
            ref={quoteRef}
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Arabic quote with typing effect */}
            <motion.p 
              className="font-arabic text-3xl md:text-4xl lg:text-5xl text-foreground leading-relaxed mb-8 min-h-[1.5em]"
              dir="rtl"
              variants={staggerItem}
            >
              <TypewriterText text={quoteArabic} isInView={quoteInView} speed={80} />
            </motion.p>
            
            <motion.div 
              className="flex items-center justify-center gap-4 mb-8"
              variants={staggerItem}
            >
              <div className="w-8 h-px bg-accent/30" />
              <div className="w-1.5 h-1.5 border border-accent/30 rotate-45" />
              <div className="w-8 h-px bg-accent/30" />
            </motion.div>
            
            {/* English quote with typing effect */}
            <motion.p 
              className="text-muted-foreground text-xl italic mb-6 min-h-[1.5em]"
              variants={staggerItem}
            >
              {quoteInView && (
                <TypewriterText 
                  text={quoteEnglish} 
                  isInView={quoteInView} 
                  speed={40} 
                />
              )}
            </motion.p>
            
            <motion.p 
              className="text-accent text-sm tracking-scholarly uppercase font-medium"
              variants={staggerItem}
            >
              Hadith - Ibn Majah
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-card relative">
        <div className="absolute inset-0 pattern-parchment" />
        
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Left - Text */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.p 
                  className="text-accent text-xs tracking-scholarly uppercase mb-4 font-medium"
                  variants={staggerItem}
                >
                  Get in Touch
                </motion.p>
                
                <motion.h2 
                  className="font-display text-3xl md:text-4xl text-foreground mb-6"
                  variants={staggerItem}
                >
                  Start Your Journey
                </motion.h2>
                
                <motion.div 
                  className="flex items-center gap-4 mb-8"
                  variants={staggerItem}
                >
                  <div className="w-12 h-px bg-accent/30" />
                  <div className="w-1.5 h-1.5 border border-accent/30 rotate-45" />
                </motion.div>
                
                <motion.p 
                  className="text-muted-foreground leading-relaxed mb-10"
                  variants={staggerItem}
                >
                  Have questions about our workbooks? Want to bring them to your 
                  community or institution? We'd love to hear from you.
                </motion.p>
                
                <motion.div 
                  className="space-y-4"
                  variants={staggerItem}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-border flex items-center justify-center">
                      <span className="text-accent text-sm">@</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground">contact@mutoon.co.uk</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-border flex items-center justify-center">
                      <span className="text-accent text-sm">W</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">WhatsApp</p>
                      <p className="text-foreground">+44 7386 302578</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right - Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-background p-8 md:p-10 border border-border shadow-soft"
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
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
              <Link href="/product">
                <span className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer" data-testid="link-footer-product">Our Product</span>
              </Link>
              <Link href="/mission">
                <span className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer" data-testid="link-footer-mission">Our Mission</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <motion.a 
        href="https://wa.me/447552908868" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-elegant focus-ring"
        aria-label="Contact via WhatsApp"
        data-testid="button-whatsapp"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
}
