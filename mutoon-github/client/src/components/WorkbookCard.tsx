import { Workbook } from "@shared/schema";
import { motion } from "framer-motion";
import { BookOpen, ShoppingCart } from "lucide-react";

import cover3fp from "@assets/3fp_1770386420435.png";
import cover4fp from "@assets/4fp_1770386420437.png";
import coverNawaqid from "@assets/nawaqid_1770386420436.png";
import cover40hw from "@assets/40hw_1770386420437.png";
import coverGlory from "@assets/Copy_of_Glorifying_Knowledge_B5_WORKBOOK_Cover_1770387380032.png";

const coverMap: Record<string, string> = {
  "The Three Principles": cover3fp,
  "The Four Principles": cover4fp,
  "Nullifiers of Islam": coverNawaqid,
  "40 Hadith Nawawi": cover40hw,
  "Glorification of Knowledge": coverGlory,
};

interface WorkbookCardProps {
  workbook: Workbook;
}

export function WorkbookCard({ workbook }: WorkbookCardProps) {
  const hasAmazonLink = !!workbook.amazonLink;
  const localCover = coverMap[workbook.title];
  const coverSrc = localCover || workbook.coverImage;

  return (
    <motion.div
      className="group bg-background border border-border hover:border-accent/40 transition-all duration-300 flex flex-col h-full shadow-soft hover:shadow-elegant relative"
      data-testid={`card-workbook-${workbook.id}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Cover image area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-card">
        {coverSrc ? (
          <img
            src={coverSrc}
            alt={workbook.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center relative">
            <div className="absolute inset-0 pattern-lines opacity-30" />
            <div className="relative z-10">
              <div className="w-14 h-14 border border-accent/30 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <span className="text-xs uppercase tracking-scholarly text-muted-foreground">Cover Coming Soon</span>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {hasAmazonLink ? (
            <a
              href={workbook.amazonLink!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 text-sm tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 focus-ring"
              data-testid={`link-amazon-${workbook.id}`}
            >
              <ShoppingCart className="w-4 h-4" />
              Buy on Amazon
            </a>
          ) : (
            <span className="text-muted-foreground text-sm tracking-scholarly uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Coming Soon
            </span>
          )}
        </div>

        {/* Coming Soon badge for books without Amazon links */}
        {!hasAmazonLink && (
          <div className="absolute top-3 right-3 bg-accent/80 text-accent-foreground px-3 py-1 text-xs tracking-scholarly uppercase">
            Coming Soon
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <p className="font-arabic text-xl text-accent mb-1" dir="rtl">
            {workbook.arabicTitle}
          </p>
          <h3 className="font-display text-lg text-foreground leading-tight">
            {workbook.title}
          </h3>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed flex-grow">
          {workbook.description}
        </p>

        <div className="flex items-center justify-between gap-2 flex-wrap pt-4 mt-4 border-t border-border">
          {workbook.price ? (
            <span className="font-display text-lg text-foreground">
              ${(workbook.price / 100).toFixed(2)}
            </span>
          ) : (
            <span className="text-muted-foreground text-sm italic">Price TBD</span>
          )}
          {hasAmazonLink ? (
            <a
              href={workbook.amazonLink!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-scholarly uppercase text-accent font-medium hover:text-foreground transition-colors"
              data-testid={`link-buy-${workbook.id}`}
            >
              Available Now
            </a>
          ) : (
            <span className="text-xs tracking-scholarly uppercase text-muted-foreground font-medium">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
