"use client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  FormControlLabel,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
} from "@mui/material";
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
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { userSignupAction } from "../../../redux/actions/asyncAuthAction";

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signupFormData, setSignupFormData] = useState({
    role: "",
    name: "",
    emailId: "",
    contactNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(userSignupAction(signupFormData));

    const status = response?.type?.split("/")[1];
    if (status === "fulfilled") {
      router.push("/auth/login");
      setSignupFormData({
        role: "",
        name: "",
        emailId: "",
        contactNumber: "",
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
        elevation={10}
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
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="role"
              onChange={handleChange}
            >
              <FormControlLabel
                value="user"
                control={<Radio color="success" />}
                label="User"
              />
              <FormControlLabel
                value="admin"
                control={<Radio color="success" />}
                label="Admin"
              />
              <FormControlLabel
                value="organization"
                control={<Radio color="success" />}
                label="Organization"
              />
            </RadioGroup>

            <Typography variant="h6">Name</Typography>
            <OutlinedInput
              id="name"
              name="name"
              fullWidth
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <FaUser size="1.2rem" />
                </InputAdornment>
              }
            />

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

            <Typography variant="h6">Contact</Typography>
            <OutlinedInput
              id="contactNumber"
              name="contactNumber"
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
              Create Account
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/auth/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
