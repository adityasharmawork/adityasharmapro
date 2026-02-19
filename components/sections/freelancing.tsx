// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { MapPin, ExternalLink } from "lucide-react";
// import { ScrollReveal } from "@/components/scroll-reveal";
// import type { FreelanceEntry } from "@/types/portfolio";

// interface FreelancingProps {
//     freelancing: FreelanceEntry[];
// }

// const bulletVariants = {
//     hidden: { opacity: 0, x: -8 },
//     visible: (i: number) => ({
//         opacity: 1,
//         x: 0,
//         transition: { delay: 0.08 * i, duration: 0.3, ease: "easeOut" as const },
//     }),
// };

// export function Freelancing({ freelancing }: FreelancingProps) {
//     const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//     // If no freelancing data, don't render the section
//     // if (!freelancing || freelancing.length === 0) {
//     //     return null;
//     // }

//     return (
//         <section id="freelance" className="px-6 py-32 sm:px-12 lg:px-24">
//             <ScrollReveal>
//                 <p className="mb-12 text-xs tracking-widest uppercase text-foreground/40">
//                     Freelance
//                 </p>
//             </ScrollReveal>

//             <div className="space-y-0">
//                 {/* {freelancing.map((entry, i) => (
//                     <ScrollReveal key={entry.project} delay={i * 0.1}>
//                         <motion.div
//                             onMouseEnter={() => setHoveredIndex(i)}
//                             onMouseLeave={() => setHoveredIndex(null)}
//                             animate={{
//                                 opacity:
//                                     hoveredIndex === null || hoveredIndex === i ? 1 : 0.3,
//                             }}
//                             transition={{ duration: 0.3 }}
//                             className="group border-t border-border py-6 sm:py-8"
//                         >
//                             <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//                                 <div className="flex-1">
//                                     <h3 className="text-lg font-medium sm:text-lg">
//                                         {entry.project}
//                                     </h3>
//                                      <div className="flex items-center gap-2 mt-1">
//                                     <p className="text-sm text-foreground/60">
//                                         {entry.role}
//                                     </p>
//                                         {entry.link && (
//                                             <a
//                                                 href={entry.link}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="text-foreground/40 hover:text-foreground/70 transition-colors"
//                                             >
//                                                 <ExternalLink size={12} strokeWidth={1.5} />
//                                             </a>
//                                         )}
//                                     </div> 
//                                 </div>
//                                  <div className="flex flex-col items-start gap-1 text-sm text-foreground/40 sm:items-end">
//                                     <span>{entry.date}</span>
//                                     <span className="inline-flex items-center gap-1">
//                                         <MapPin size={12} strokeWidth={1.5} />
//                                         {entry.location}
//                                     </span>
//                                 </div> 
//                             </div>
//                              <motion.div
//                                 initial={false}
//                                 animate={{
//                                     height: hoveredIndex === i ? "auto" : 0,
//                                     opacity: hoveredIndex === i ? 1 : 0,
//                                 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="overflow-hidden"
//                             >
//                                 <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/60">
//                                     {entry.description}
//                                 </p>

//                                 {entry.highlights && entry.highlights.length > 0 && (
//                                     <ul className="mt-4 max-w-2xl space-y-2 border-l border-foreground/10 pl-4">
//                                         {entry.highlights.map((point, j) => (
//                                             <motion.li
//                                                 key={j}
//                                                 custom={j}
//                                                 initial="hidden"
//                                                 animate={hoveredIndex === i ? "visible" : "hidden"}
//                                                 variants={bulletVariants}
//                                                 className="flex items-start gap-3 text-sm leading-relaxed text-foreground/50"
//                                             >
//                                                 <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
//                                                 <span>{point}</span>
//                                             </motion.li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </motion.div> 
//                         </motion.div>
//                     </ScrollReveal>
//                 ))} */}
//             </div>
//         </section>
//     );
// }

export function Freelancing({ }: any) { return null; }
