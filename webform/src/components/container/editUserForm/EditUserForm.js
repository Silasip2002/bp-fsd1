import { React, useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./EditUserForm.css";
import SearchIcon from "@material-ui/icons/Search";
import {
  IconButton,
  Button,
  InputAdornment,
  Grow,
  Grid,
} from "@material-ui/core";
import API from "axios";
import nextId from "react-id-generator";

export default function CreateUserForm() {
  const [showMap, setShowMap] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  let userId = nextId();

  const handleShowMap = () => {
    setShowMap((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("data submit");
    console.log(
      `name ${name} , email ${email} , phone ${phone} ,address ${address}`
    );
    const body = {
      userId,
      name,
      email,
      phone,
      address,
    };

    try {
      const res = await API.post(
        "https://p4gp6vy8c1.execute-api.us-east-2.amazonaws.com/dev/user",
        body
      );
      if (res) {
        console.log(`save!`);
      }
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

  return (
    <div>
      <form className="formContainer" onSubmit={handleSubmit}>
        <Grid container spacing={4} className="inputFieldContainer">
          <Grid item xs={12}>
            <TextField
              className="textFiled"
              id="name"
              label="Name"
              variant="filled"
              onInput={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="textFiled"
              id="email"
              label="Email"
              variant="filled"
              onInput={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <TextField
              className="textFiled"
              id="phoneNumber"
              label="Phone Number"
              variant="filled"
              onInput={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="textFiled"
              id="address"
              label="Address"
              variant="filled"
              onInput={(e) => setAddress(e.target.value)}
              onClick={handleShowMap}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Button
              className="confirm__btn"
              style={{ color: "white", backgroundColor: "blueviolet" }}
              variant="outlined"
              type="submit"
            >
              Save
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              className="cancel__btn"
              style={{ color: "blueviolet", backgroundColor: "white" }}
              variant="outlined"
              type="reset"
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grow in={showMap} spacing={8}>
        <img
          className="mapImage"
          src="https://ik.imagekit.io/officehub/tr:w-960,c-maintain_ratio,f-auto,q-85/https://dym9iyp9vfk32.cloudfront.net/servlet.FileDownload?file=00P1N00000ekgegUAA"
        ></img>
      </Grow>
    </div>
  );
}
