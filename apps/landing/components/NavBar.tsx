import Image from "next/image";
import Logo from "@/public/file.svg"
import Link from "next/link";
import { 
    NavigationMenu, 
    NavigationMenuItem, 
    NavigationMenuLink, 
    NavigationMenuList, 
    navigationMenuTriggerStyle

} from "@workspace/ui/components/navigation-menu";
import { LoginButton, RegisterButton } from "./AuthButtons";
import ThemeToggleButton from "./ThemeToggleButton";
import { Button } from "@workspace/ui/components/button";
import { AlignJustify } from "lucide-react";


const NavBar = () => {
    return (
        <nav className="max-w-7xl  fixed top-4  mx-auto inset-x-0 z-50 w-[95%] lg:w-full">
            {/* Web */}
            <div className="hidden lg:block w-full">
                <div className="w-full flex relative justify-between px-4 py-2 rounded-full bg-transparent transition duration-200">
                    <div className="flex flex-row gap-2 items-center">
                        <Link href="/" className="font-normal flex space-x-2 items-center text-sm mr-4 px-2 py-1  relative z-20">
                            <Image src={Logo} alt="logo" width={100} height={100} className="h-8 w-8"/>
                            <span className="font-semibold">Auronex AI</span>
                        </Link>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link href="/features" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Features
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/pricing" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Pricing
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/pricing" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Testimonies
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <ThemeToggleButton />
                        <LoginButton />
                        <RegisterButton />
                    </div>
                </div>
            </div>
            {/* Responsive */}
            <div className="flex h-full w-full items-center lg:hidden">
                <div className="flex justify-between items-center w-full rounded-full px-2.5 py-1.5 transition duration-200">
                    <Link href="/" className="font-normal flex space-x-2 items-center text-sm mr-4 px-2 py-1  relative z-20">
                        <Image src={Logo} alt="logo" width={100} height={100} className="h-8 w-8"/>
                        <span className="font-semibold">Auronex AI</span>
                    </Link>
                    <Button variant="ghost" size="default" className="rounded-full">
                        <AlignJustify strokeWidth={3}
                        size={64} />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>

            </div>
        </nav>
    );
}

export default NavBar;
