"use client";

import api from "./axios";

export async function login_api(employee_code: string) {
    const { data } = await api.post("/login", {
        employee_code,
    });

    return data?.data;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function login_user(data: any) {
    localStorage.setItem(
        "user",
        JSON.stringify(data),
    );
}

export function logout() {
    localStorage.removeItem("user");
}

export function getCurrentUser() {
    if (typeof window === "undefined")
        return null;

    const user =
        localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
    return !!getCurrentUser();
}