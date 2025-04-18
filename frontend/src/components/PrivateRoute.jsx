import React from 'react';
import { Route } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function PrivateRoute() {
    const { currentUser } = useAuth();
    return
}
