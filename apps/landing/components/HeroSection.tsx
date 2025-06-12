import { ArrowRightIcon } from "lucide-react";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";
import { GenericButton } from "./GenericButton";
import platform_ui from "@/public/platform_chat_ui.png"
import Image from "next/image";
import { TypographyH1, TypographyP } from "./Typographies";

const HeroSection = () => {

    return (
        <div className="hero-section flex flex-col min-h-screen pt-20 md:pt-40 relative overflow-hidden w-full">

            {/* Introducing the chat AI */}
            <div className="flex justify-center">
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-400 hover:duration-300 hover:dark:text-neutral-200">
                <span>📣 Introducing Auronex AI</span>
                <ArrowRightIcon className="ml-2 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
            </div>

            {/* Texts */}
            <TypographyH1 />
            <TypographyP />

            {/* Action Button */}
            <div className="flex items-center gap-4 justify-center mt-6 relative z-10" style={{ opacity: 1, transform: 'none' }}>
                <GenericButton href="/">Get started for free</GenericButton>
            </div>

            {/* Product Image */}
            <div className="p-4 border border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 rounded-[32px] mt-20 relative">
                <div className="absolute inset-x-0 bottom-0 h-40 w-full bg-gradient-to-b from-transparent via-white to-white dark:via-black/50 dark:to-black scale-[1.1] pointer-events-none"/>
                <div className="p-2 bg-white dark:bg-black dark:border-neutral-700 border border-neutral-200 rounded-[24px]">
                    <Image src={platform_ui} width={1920} alt="Description of the image" />
                </div>
            </div>
        </div>
    )
}

export default HeroSection;