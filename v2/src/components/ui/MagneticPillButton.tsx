"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MagneticPillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: "primary" | "secondary" | "ghost";
    href?: string;
    target?: string;
    rel?: string;
}

export function MagneticPillButton({
    label,
    variant = "primary",
    className,
    href,
    ...props
}: MagneticPillButtonProps) {
    const MotionComponent = href ? motion.create(Link) : motion.button;

    // Colores de fondo por variante con estética premium
    const bgClasses = {
        primary: "bg-primary text-primary-foreground border-transparent shadow-lg shadow-primary/20 hover:shadow-glow",
        secondary: "bg-secondary text-secondary-foreground border-transparent shadow-md",
        ghost: "bg-transparent text-foreground border-border/50 hover:border-primary/50 backdrop-blur-sm",
    };

    // Curvas exactas de SpecialButton.css
    const easeIn = [0.34, 1.56, 0.64, 1] as const; // --ease-in
    const animDuration = 0.4;

    return (
        <MotionComponent
            href={href as string}
            initial="initial"
            whileHover="hover"
            whileFocusVisible="hover"
            whileTap={{ scale: 0.98 }}
            className={cn(
                "group/btn relative inline-flex items-center gap-3 rounded-full px-6 py-2 transition-all duration-300",
                "text-sm font-medium border overflow-hidden",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                bgClasses[variant],
                className
            )}
            {...(props as any)}
        >
            {/* Capa de fondo animada (Swipe effect) */}
            <motion.div
                className={cn(
                    "absolute inset-0 z-0",
                    variant === "primary" ? "bg-white/20" : "bg-primary"
                )}
                variants={{
                    initial: { x: "-100%" },
                    hover: {
                        x: 0,
                        transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] }
                    }
                }}
            />

            {/* Texto */}
            <span className={cn(
                "relative z-10 transition-colors duration-300",
                variant === "ghost" ? "group-hover/btn:text-primary-foreground text-foreground" :
                    variant === "primary" ? "text-primary-foreground" : "text-current"
            )}>
                {label}
            </span>

            {/* Círculo (sphere-jump-forward) */}
            <motion.div
                className={cn(
                    "relative z-10 flex h-8 w-8 items-center justify-center rounded-full overflow-hidden shrink-0",
                    variant === "ghost" ? "bg-primary text-primary-foreground group-hover/btn:bg-white group-hover/btn:text-primary" : "bg-background text-foreground"
                )}
                variants={{
                    initial: { x: 0 },
                    hover: {
                        x: 6,
                        transition: { duration: animDuration, ease: easeIn }
                    }
                }}
            >
                {/* Flecha con loop infinito (arrow-fast-loop) */}
                <motion.div
                    className="flex items-center justify-center"
                    variants={{
                        initial: { x: 0, opacity: 1 },
                        hover: {
                            x: [0, 30, -30, 0],
                            opacity: [1, 0, 0, 1],
                            transition: {
                                duration: animDuration,
                                times: [0, 0.4, 0.41, 1],
                                ease: "easeInOut"
                            }
                        }
                    }}
                >
                    <ArrowRight className="w-4 h-4" />
                </motion.div>
            </motion.div>
        </MotionComponent>
    );
}
