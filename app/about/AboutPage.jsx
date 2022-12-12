"use client";

import Layout from "../../components/Layout";

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
            style={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "#1B1B1B"
            }}
            className="fixed"
        >
            <div
                className="fixed flex justify-center items-center"
                style={{
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                        "-webkit-linear-gradient(bottom, rgba(26, 26, 26, .45), rgba(26, 26, 26, 0.45)), url(/Background.jpg)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "black",
                    backgroundSize: "cover",
                    filter: "blur(10px)"
                }}
            >
                {props.children}
            </div>
        </div>
    );
};

const AboutContainer = props => (
    <div
        className="relative flex flex-col items-center px-4 py-6 my-6 mx-auto"
        style={{
            maxWidth: "300px",
            width: "auto",
            maxHeight: "80%",
            transform: "translateY(15%)"
        }}
    >
        {props.children}
    </div>
);

const AboutText = props => (
    <div className="pt-6 text-center text-gray-300 font-light sm:text-base text-sm">
        <p className="m-3">Hello.</p>
        <p className="m-3">My name is Vincent Budrovich.</p>
        <p>
            I am a software engineer specializing in creating delightful user
            experiences. The rest of my time ideally involves a camera, fresh
            air, and a beautiful vista.
        </p>
        <p className="m-3">
            Always ready for the next adventure, reach out and lets get one
            going.
        </p>
        <div
            className="mx-auto w-1/2 mt-10 mb-4 px-8 py-4 bg-gray-900 active:bg-black rounded-md hover:shadow-lg  focus:outline-none focus:shadow-xl"
            style={{ transition: "all 0.2s" }}
        >
            <a href={`mailto:vwbthree@gmail.com?subject=Hello!`}>Contact</a>
        </div>
    </div>
);

const AboutPage = () => {
    return (
        <Layout navClass="bg-transparent text-white" title="About">
            <AboutBackground />
            <AboutContainer>
                <Avatar />
                <AboutText />
            </AboutContainer>
        </Layout>
    );
};

export default AboutPage;
