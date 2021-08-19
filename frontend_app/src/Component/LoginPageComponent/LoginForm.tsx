import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import useStore from "../../store";
import { APP_COLOR } from "../../consistent";
import UserLoginForm from "../LoginPageComponent/UserLoginForm";
import ShopLoginForm from "./ShopLoginForm";

const LoginFormContainer = styled.div`
  display: grid;
  gap: 20px;
  height: 300px;
  width: 80%;
  justify-self: center;
  text-align: center;
  border-radius: 15px;
  background-color: ${APP_COLOR.paleWheat};
`;

const AnimationDiv = styled.div`
  height: 300px;
  width: 80%;
  justify-self: center;
  h1 {
    font-weight: 200;
    margin: 0.4em 0;
    font-size: 2.2rem;
    text-align: center;
  }
`;

function TxtRotate(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
}

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;

  if (!this.isDeleting && this.txt === fullTxt) {
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
  }
};

export default function LoginForm() {
  const loginRole = useStore((state) => state.loginRole);

  useEffect(() => {
    if (!loginRole) {
      var elements = document.getElementsByClassName("txt-rotate");
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-rotate");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
          const animation = new TxtRotate(
            elements[i],
            JSON.parse(toRotate),
            period
          );
          const timeId = setInterval(function () {
            animation.tick();
          }, 150);
        }
      }
    }

    return (timeId: number) => clearInterval(timeId);
  }, [loginRole]);

  if (loginRole === "user")
    return (
      <LoginFormContainer>
        <UserLoginForm />
      </LoginFormContainer>
    );

  if (loginRole === "shop")
    return (
      <LoginFormContainer>
        <ShopLoginForm />
      </LoginFormContainer>
    );
  else
    return (
      <AnimationDiv>
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:200,100,400"
          rel="stylesheet"
          type="text/css"
        />
        <h1>
          Coffee as . . .
          <span
            className="txt-rotate"
            data-period="1000"
            data-rotate='[ " sweet as angel:)", " black as devil"," HOT AS YOU ♥ ♥ ♥ ♥ " ]'
          ></span>
        </h1>
      </AnimationDiv>
    );
}
