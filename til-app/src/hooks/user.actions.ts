import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthResponse, User } from "../helpers/axios";

export interface InputError {
  email?: string[];
  username?: string[];
  first_name?: string[];
  last_name?: string[];
  password?: string[];
}

interface RegisterUser extends Omit<User, "id"> {
  password: string;
}

/**
 *
 * @returns an object containing functions for user actions: login, register, and logout.
 */
export const useUserActions = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const baseURL = "http://localhost:8000/api/auth";
  return {
    login,
    register,
    logout,
  };

  /**
   * takes in user input data (email and password), success/failure toast
   * icons, and a boolean setLoading state to handle loading. It sends a post
   * request to the login endpoint of the backend API and handles the response by
   * setting the user data in local storage, displaying a success/error toast, and navigating
   * to the home page.
   */
  function login(
    data: { email: string; password: string },
    toastSuccessIcon: React.ReactNode,
    toastFailIcon: React.ReactNode,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    return axios
      .post(baseURL + "/login/", data)
      .then((res) => {
        setUserData(res.data);
        toast({
          title: "Success",
          description: "Successfully logged in",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
          icon: toastSuccessIcon,
        });
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: "Invalid credentials",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
          icon: toastFailIcon,
        });
        setLoading(false);
      });
  }
  /**
   * takes in user input data (excluding id) and a boolean setLoading
   * state to handle loading state. It sends a post request to the register
   * endpoint of the backend API and handles the response by setting
   * the user data in local storage, displaying a success/error toast, and
   * setting the input error state if there are any validation errors returned
   * from the backend.
   */
  function register(
    data: RegisterUser,
    toastSuccessIcon: React.ReactNode,
    toastFailIcon: React.ReactNode,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setInputError: React.Dispatch<React.SetStateAction<InputError | undefined>>
  ) {
    return axios
      .post(baseURL + "/register/", data)
      .then((res) => {
        setUserData(res.data);

        toast({
          title: "Success",
          description: "Successfully registered",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
          icon: toastSuccessIcon,
        });
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setInputError(err.response.data);
        }
        toast({
          title: "Error",
          description: "Invalid credentials",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
          icon: toastFailIcon,
        });
        setLoading(false);
      });
  }

  function logout() {
    localStorage.removeItem("auth");
    navigate("/login/");
  }
};

export function getUserData() {
  const { user, refresh, access }: AuthResponse = JSON.parse(
    localStorage.getItem("auth") ?? "null"
  );
  return { user, refresh, access };
}

/**
 * A function that takes in an AuthResponse object,
 * sets it as a string in local storage under the key "auth".
 */
export function setUserData(data: AuthResponse) {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      access: data.access,
      refresh: data.refresh,
      user: data.user,
    })
  );
}
