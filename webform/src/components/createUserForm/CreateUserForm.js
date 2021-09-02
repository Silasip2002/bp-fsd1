import { React, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import "./CreateUserForm.css";
import GoogleMap from "../googleMap/GoogleMap";
import SearchIcon from "@material-ui/icons/Search";
import { setSelectedTag } from "../../actions/TagController";
import { setMapCenter } from "../../actions/GoogleMapController";
import { useDispatch } from "react-redux";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import {
  IconButton,
  Button,
  InputAdornment,
  Grow,
  Grid,
} from "@material-ui/core";
import API from "axios";
import nextId from "react-id-generator";
import { useHistory, useParams } from "react-router";

export default function CreateUserForm() {
  const dispatch = useDispatch();
  const [showMap, setShowMap] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();

  let userId = nextId();
  let id = useParams().id;

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await API.get(
        `https://p4gp6vy8c1.execute-api.us-east-2.amazonaws.com/dev/user?userId=${id}`
      );
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
      setIsEdit(true);
    } catch (error) {
      console.log(`fail to get user data ${error}`);
    }
  };

  const handleShowMap = () => {
    setShowMap((prev) => !prev);
    console.log(showMap);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("in th create from ", latLng);

        // update center state
        dispatch(setMapCenter(latLng));
      })
      .catch((error) => console.error("Error", error));
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
      if (isEdit) {
        const res = await API.patch(
          "https://p4gp6vy8c1.execute-api.us-east-2.amazonaws.com/dev/user",
          body
        );
        if (res) {
          history.push(`/listUser`);
          dispatch(setSelectedTag(1));
          console.log(`updated!`);
        }
      } else {
        const res = await API.post(
          "https://p4gp6vy8c1.execute-api.us-east-2.amazonaws.com/dev/user",
          body
        );
        if (res) {
          history.push(`/listUser`);
          dispatch(setSelectedTag(1));

          console.log(`save!`);
        }
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
              required
              value={name}
              onInput={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="textFiled"
              id="email"
              label="Email"
              variant="filled"
              required
              value={email}
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
              required
              value={phone}
              onInput={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="textFiled"
              id="address"
              label="Address"
              variant="filled"
              required
              value={address}
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
        <GoogleMap />
      </Grow>
    </div>
  );
}
