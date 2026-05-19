import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        'nav': '1200px',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'system-ui', 'sans-serif'],
        display: ['"Open Sans"', 'system-ui', 'sans-serif'],
        body: ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        "surface-muted": "hsl(var(--surface-muted))",
        "surface-alt": "hsl(var(--surface-alt))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          glow: "hsl(var(--accent-glow))",
        },
        warm: {
          DEFAULT: "hsl(var(--warm))",
          foreground: "hsl(var(--warm-foreground))",
        },
        beige: {
          1: "hsl(var(--beige1))",
          2: "hsl(var(--beige2))",
          3: "hsl(var(--beige3))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "bubble-retract": {
          "0%":   { transform: "scaleY(1) scaleX(1) rotateX(0deg) translateY(0)" },
          "20%":  { transform: "scaleY(1.08) scaleX(1.015) rotateX(-3deg) translateY(1px)" },
          "45%":  { transform: "scaleY(0.55) scaleX(0.99) rotateX(30deg) translateY(0)" },
          "65%":  { transform: "scaleY(0.7) scaleX(1.005) rotateX(22deg) translateY(0)" },
          "82%":  { transform: "scaleY(0.3) scaleX(0.97) rotateX(50deg) translateY(-1px)" },
          "100%": { transform: "scaleY(0.05) scaleX(0.92) rotateX(75deg) translateY(-4px)" },
        },
        "bubble-extend": {
          "0%":   { transform: "scaleY(0.05) scaleX(0.92) rotateX(75deg) translateY(-4px)" },
          "35%":  { transform: "scaleY(0.7) scaleX(0.99) rotateX(20deg) translateY(0)" },
          "60%":  { transform: "scaleY(1.06) scaleX(1.01) rotateX(-4deg) translateY(1px)" },
          "80%":  { transform: "scaleY(0.97) scaleX(0.998) rotateX(2deg) translateY(0)" },
          "100%": { transform: "scaleY(1) scaleX(1) rotateX(0deg) translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "bubble-retract": "bubble-retract 1000ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "bubble-extend": "bubble-extend 950ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },


    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
