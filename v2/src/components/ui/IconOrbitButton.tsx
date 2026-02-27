"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface IconOrbitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    hoverIcon?: React.ReactNode;
    href?: string;
    target?: string;
    rel?: string;
}

export function IconOrbitButton({ icon, hoverIcon, className, href, ...props }: IconOrbitButtonProps) {
    const MotionComponent = href ? motion.create(Link) : motion.button;

    const animDuration = 0.4;
    const easeIn = [0.34, 1.56, 0.64, 1] as const; // --ease-in from SpecialButton.css

    return (
        <MotionComponent
            href={href as string}
            initial="initial"
            whileHover="hover"
            whileFocusVisible="hover"
            whileTap={{ scale: 0.95 }}
            className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background transition-all duration-300",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary overflow-hidden",
                className
            )}
            {...(props as any)}
        >
            {/* Fondo que se expande */}
            <motion.span
                className="absolute inset-0 z-0 bg-primary opacity-0"
                variants={{
                    initial: { opacity: 0, scale: 0.5 },
                    hover: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
                }}
            />

            <motion.div
                className="relative z-10 flex items-center justify-center text-foreground group-hover:text-primary-foreground transition-colors duration-300 pointer-events-none"
            >
                {!hoverIcon ? (
                    <motion.div
                        variants={{
                            initial: { x: 0 },
                            hover: {
                                x: [0, 30, -30, 0],
                                transition: {
                                    duration: animDuration,
                                    times: [0, 0.4, 0.41, 1],
                                    ease: "easeInOut"
                                }
                            }
                        }}
                    >
                        {icon}
                    </motion.div>
                ) : (
                    <motion.div className="relative">
                        <motion.span
                            className="absolute inset-0 flex items-center justify-center"
                            variants={{
                                initial: { x: 0, opacity: 1 },
                                hover: { x: 30, opacity: 0, transition: { duration: 0.2 } }
                            }}
                        >
                            {icon}
                        </motion.span>
                        <motion.span
                            className="flex items-center justify-center"
                            variants={{
                                initial: { x: -30, opacity: 0 },
                                hover: { x: 0, opacity: 1, transition: { duration: 0.4, delay: 0.1, ease: easeIn } }
                            }}
                        >
                            {hoverIcon}
                        </motion.span>
                    </motion.div>
                )}
            </motion.div>
        </MotionComponent>
    );
}
