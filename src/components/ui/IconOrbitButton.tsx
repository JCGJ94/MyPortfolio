"use client";

import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const MotionLink = motion.create(Link);

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps | "href"> & MotionProps & { href?: "" | undefined };
type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof MotionProps | "href"> & MotionProps & { href: string };
type IconOrbitButtonProps = {
    icon: React.ReactNode;
    hoverIcon?: React.ReactNode;
    target?: string;
    rel?: string;
} & (ButtonProps | LinkProps);

export function IconOrbitButton({ icon, hoverIcon, className, ...props }: IconOrbitButtonProps) {
    const animDuration = 0.4;
    const easeIn = [0.34, 1.56, 0.64, 1] as const; // --ease-in from SpecialButton.css
    const shared = {
        initial: "initial" as const,
        whileHover: "hover" as const,
        whileFocusVisible: "hover" as const,
        whileTap: { scale: 0.95 },
        className: cn(
            "group relative flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background transition-all duration-300",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary overflow-hidden",
            className
        ),
    };
    const children = (
        <>
            {/* Fondo que se expande */}
            <motion.span
                className="absolute inset-0 z-0 bg-primary opacity-0"
                variants={{
                    initial: { opacity: 0, scale: 0.5 },
                    hover: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                }}
            />

            <motion.div className="relative z-10 flex items-center justify-center text-foreground group-hover:text-primary-foreground transition-colors duration-300 pointer-events-none">
                {!hoverIcon ? (
                    <motion.div
                        variants={{
                            initial: { x: 0 },
                            hover: {
                                x: [0, 30, -30, 0],
                                transition: {
                                    duration: animDuration,
                                    times: [0, 0.4, 0.41, 1],
                                    ease: "easeInOut",
                                },
                            },
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
                                hover: { x: 30, opacity: 0, transition: { duration: 0.2 } },
                            }}
                        >
                            {icon}
                        </motion.span>
                        <motion.span
                            className="flex items-center justify-center"
                            variants={{
                                initial: { x: -30, opacity: 0 },
                                hover: {
                                    x: 0,
                                    opacity: 1,
                                    transition: { duration: 0.4, delay: 0.1, ease: easeIn },
                                },
                            }}
                        >
                            {hoverIcon}
                        </motion.span>
                    </motion.div>
                )}
            </motion.div>
        </>
    );

    if (props.href) {
        const { href, target, rel, ...linkProps } = props as LinkProps;
        return <MotionLink {...shared} href={href} target={target} rel={rel} {...linkProps}>{children}</MotionLink>;
    }
    const { href: _href, ...buttonProps } = props;
    // A string may be empty at runtime; the original truthy-href branch treated that as a button.
    const nativeButtonProps = buttonProps as Omit<ButtonProps, "href">;
    const buttonRootProps = { ...nativeButtonProps, href: _href };
    return <motion.button {...shared} {...buttonRootProps}>{children}</motion.button>;
}
