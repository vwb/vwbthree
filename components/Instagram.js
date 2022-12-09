import React from "react";
import Link from "next/link";
import { FiInstagram } from "react-icons/fi";

export const InstagramLink = () => {
    return (
        <Link href="https://www.instagram.com/vwbthree">
            <FiInstagram size={26} />
        </Link>
    );
};
