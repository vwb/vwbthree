import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import autoprefixer from "autoprefixer";

const Avatar = () => (
    <div className="rounded-full h-20 w-20 sm:h-40 sm:w-40">
        <img
            className="rounded-full shadow"
            src="/profile.png"
            alt="Profile Picture"
        />
    </div>
);

const AboutBackground = props => {
    return (
        <div
            className="fixed flex justify-center items-center"
            style={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundImage: "url(/Background.jpg)",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "black",
                backgroundSize: "cover"
            }}
        >
            {props.children}
        </div>
    );
};

const AboutContainer = props => (
    <div
        className="flex flex-col items-center px-4 py-6 rounded-md shadow my-6"
        style={{
            backgroundColor: "rgba(25, 25, 25, 0.65)",
            maxWidth: "300px",
            width: "auto",
            maxHeight: "80%"
        }}
    >
        {props.children}
    </div>
);

const AboutText = props => (
    <div className="pt-6 text-center text-gray-300 font-light sm:text-base text-sm">
        <p className="m-2">Hello.</p>
        <p className="m-2">
            My name is Vincent Budrovich. I am a software developer and
            photographer based in San Francisco.
        </p>
        <p className="m-2">
            Always ready for the next adventure, reach out and lets get one
            going.
        </p>
        <div
            className="mx-auto w-1/2 mt-10 mb-4 px-8 py-4 bg-gray-900 active:bg-black rounded-md hover:shadow-lg  focus:outline-none focus:shadow-xl"
            style={{ transition: "all 0.2s" }}
        >
            <a className href={`mailto:vwbthree@gmail.com?subject=Hello!`}>
                Contact
            </a>
        </div>
    </div>
);

const AboutPage = () => {
    return (
        <Layout navClass="bg-transparent text-white" title="About">
            <AboutBackground>
                <AboutContainer>
                    <Avatar />
                    <AboutText />
                </AboutContainer>
            </AboutBackground>
        </Layout>
    );
};

export default AboutPage;
