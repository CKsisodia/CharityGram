"use client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { InputAdornment, OutlinedInput } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  getUserInfoAction,
  userLoginAction,
} from "../../../redux/actions/asyncAuthAction";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginFormData, setLoginFormData] = useState({
    emailId: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(userLoginAction(loginFormData));

    const status = response?.type?.split("/")[1];
    if (status === "fulfilled") {
      await dispatch(getUserInfoAction());
      router.push("/home");
      setLoginFormData({
        emailId: "",
        password: "",
      });
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url("/auth.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ backgroundColor: "#88bf9c" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Typography variant="h6">Email</Typography>
            <OutlinedInput
              id="emailId"
              name="emailId"
              fullWidth
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <MdEmail size="1.2rem" />
                </InputAdornment>
              }
            />
            <Typography variant="h6">Password</Typography>
            <OutlinedInput
              id="password"
              name="password"
              fullWidth
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <RiLockPasswordFill size="1.2rem" />
                </InputAdornment>
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#4c8c63",
                color: "#0A0A0A",
                "&:hover": {
                  backgroundColor: "#264a33",
                },
              }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/auth/signup">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
