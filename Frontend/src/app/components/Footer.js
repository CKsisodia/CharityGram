"use client";

import React from 'react';
import { Container, Grid, Typography, Box, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px 0'}}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Logo and About Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              MyApp
            </Typography>
            <Typography variant="body2" color="textSecondary">
              MyApp is your go-to platform for managing everything seamlessly. Explore our features and join the community today!
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="/" variant="body2" color="textSecondary" display="block" gutterBottom>
                Home
              </Link>
              <Link href="/about" variant="body2" color="textSecondary" display="block" gutterBottom>
                About Us
              </Link>
              <Link href="/services" variant="body2" color="textSecondary" display="block" gutterBottom>
                Services
              </Link>
              <Link href="/contact" variant="body2" color="textSecondary" display="block" gutterBottom>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton aria-label="Facebook" href="https://facebook.com">
                <Facebook />
              </IconButton>
              <IconButton aria-label="Twitter" href="https://twitter.com">
                <Twitter />
              </IconButton>
              <IconButton aria-label="Instagram" href="https://instagram.com">
                <Instagram />
              </IconButton>
              <IconButton aria-label="LinkedIn" href="https://linkedin.com">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            © 2024 MyApp. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
