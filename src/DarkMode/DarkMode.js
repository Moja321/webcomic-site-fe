import React from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

const DarkMode = ({changeImg1,changeImg2}) => {

    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme','dark');
        localStorage.setItem("selectedTheme","dark");
        changeImg2();
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme','light');
        localStorage.setItem("selectedTheme","light");
        changeImg1();
    }

    const selectedTheme = localStorage.getItem("selectedTheme");

    if (selectedTheme === "dark") {
        setDarkMode();
    }


    // setDarkMode();

    const toggleTheme = (e) => {
        if (e.target.checked === true) {
            setDarkMode();
        } else {
            setLightMode();
        }
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange = {toggleTheme}
                defaultChecked={selectedTheme === "dark"}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
