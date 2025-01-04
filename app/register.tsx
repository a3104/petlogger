import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Animal Type</InputLabel>
        <Select
          value={animalType}
          onChange={(e) => setAnimalType(e.target.value)}
          required
        >
          <MenuItem value="cat">Cat</MenuItem>
          <MenuItem value="dog">Dog</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        component="label"
        fullWidth
        margin="normal"
      >
        Upload Photo
        <input
          type="file"
          hidden
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        margin="normal"
      >
        Submit
      </Button>
    </form>
  );
};

export default Register;
