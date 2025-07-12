import React, { useState } from "react";
import "frontend/src/App.css";
import { Link } from "react-router-dom";
import Form from "../../common/Form";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('./src/assets/register_background.jpg')] bg-cover bg-center">
  <Form onSubmit="register">
    <button type="submit" className="place-self-center btn btn-wide bg-[#E6FE58] border-[#E6FE58] hover:bg-[#E6FE58] text-black font-semibold py-2 px-4 rounded-full text-lg mt-[12px]">Register</button>
        <p className="text-center text-black text-sm">
          Already have an account? <Link to="/" className="font-semibold leading-6 text-black text-sm">Login</Link>
        </p>
  </Form>
  </div>
  )
}
