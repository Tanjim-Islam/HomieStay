'use client';

import Image from "next/image"
import {useRouter} from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return(
        <Image
        alt = "Logo"
        className = "hidden md:block curson-pointer"
        height = "100"
        width = "100"
        src = "/images/logo1.png"
        />
    )
}
 export default Logo;