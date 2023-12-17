import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../utils/config";
import { useSelector } from "react-redux";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const userId = useSelector((state) => state.users.id);

  const getUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/${params.id}`);
      setUser(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (params.id == userId) {
      navigate("/profile");
    }
  }, [navigate, params.id, userId]);

  return (
    <div>
      {params.id}
      <h1>{user?.username}</h1>
    </div>
  );
};

export default Profile;
