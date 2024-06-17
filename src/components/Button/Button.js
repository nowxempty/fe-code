import React from "react";
import "./Button.css";

const Button = ({ className, divClassName, text='Button', onClick, icon }) => {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            <div className={`text ${divClassName}`}>
                {text}
                {icon && icon}
            </div>
        </button>
    );
};

///<Button text="버튼에 들어갈 텍스트" onClick={someAction} /> 이와 같이 다른 파일에서 사용하시면 되겠습니다.

export default Button;
