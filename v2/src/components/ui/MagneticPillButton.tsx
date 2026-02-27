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

    // Colores de fondo por variante
    const bgClasses = {
        primary: "bg-primary text-primary-foreground border-transparent",
        secondary: "bg-secondary text-secondary-foreground border-transparent",
        ghost: "bg-transparent text-foreground border-border/50 hover:border-primary/50",
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
                "group relative inline-flex items-center gap-3 rounded-full px-6 py-2 transition-all duration-300",
                "text-sm font-medium border",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                bgClasses[variant],
                className
            )}
            {...(props as any)}
        >
            {/* Texto */}
            <span className="relative z-10">{label}</span>

            {/* Círculo (sphere-jump-forward) */}
            <motion.div
                className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full overflow-hidden shrink-0",
                    variant === "ghost" ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
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
