"use client";
import React from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Menu, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CustomUserButton = () => {
  const { user } = useUser(); // Get user data
  const { signOut } = useClerk(); // Get signOut function
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action: any) => {
    handleClose();
    switch (action) {
      case "profile":
        router.push("/profile");
        break;
      case "notes":
        router.push("/notes");
        break;
      case "chat":
        router.push("/chat");
        break;
      case "logout":
        signOut();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>
        {user?.setProfileImage ? (
          <img
            src={"/mrStudent.png"}
            alt="User Avatar"
            style={{ borderRadius: "50%", width: 40, height: 40 }}
          />
        ) : (
          <span>{user?.username}</span>
        )}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleMenuAction("profile")}>Profile</MenuItem>
        <MenuItem onClick={() => handleMenuAction("notes")}>Notes</MenuItem>
        <MenuItem onClick={() => handleMenuAction("chat")}>Chat</MenuItem>
        <MenuItem onClick={() => handleMenuAction("logout")}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default CustomUserButton;
