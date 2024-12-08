import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import HeroBannerImage from '../assets/images/banner.png';
const HeroBanner = () => {
  return (
    <Box sx={{ mt: {lg:'212px', xs:'70px'},
      ml: {sm:'50px'}
      }} position="relative" p="20px">
        <Typography color ="#FF2625" fontWeight="600px" fontSize="26px" >
         FitHum
        </Typography>
        <Typography fontWeight={700}
        sx={{fontSize:{ lg:'44px', xs:'40px'}}}
        mb="23px" mt="30px">
            Get Fit with
            <br/> FitHum
        </Typography>
        <Typography fontSize="22px" lineHeight="35px" mb={4}>
            Checkout the exercises Below:
        </Typography>
        <Button variant="contained" href="#exercises" padding="10px">Explore Exercises</Button>
        <Typography fontWeight={600} color="#D49137" sx={{
            opacity:0.4,
            display:{lg:'block', xs:'none'}
        }} fontSize="200px">
            FitHum
        </Typography>
        <img src={HeroBannerImage} alt="hero banner" className='hero-banner-img'/>
    </Box>
  )
}

export default HeroBanner