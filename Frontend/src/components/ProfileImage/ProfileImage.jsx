import React from "react";
import "./ProfileImage.css";

const ProfileImage = ({ firstName, lastName }) => {
  const firstNameInitial = firstName[0];
  const lastNameInitial = lastName[0];

  return (
    <span className="user-profile-image">
      {firstNameInitial}
      {lastNameInitial}
    </span>
  );
};

export default ProfileImage;

