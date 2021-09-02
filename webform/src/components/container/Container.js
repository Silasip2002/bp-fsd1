import React from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import CreateUserForm from "../createUserForm/CreateUserForm";
import ListUserTable from "../listUserTable/ListUserTable";
import "./Container.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { setSelectedTag, getSelectedTag } from "../../actions/TagController";
import { useDispatch, useSelector } from "react-redux";

export default function Container(props) {
  const dispatch = useDispatch();
  let selectedTag = useSelector(getSelectedTag).payload.tag.selectedTag;

  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: "createUser",
    1: "listUser",
  };

  const indexToTabName = {
    createUser: 0,
    listUser: 1,
  };

  // const [selectedTag, setSelectedTag] = React.useState(indexToTabName[page]);

  const handleChange = (event, newValue) => {
    history.push(`/${tabNameToIndex[newValue]}`);
    dispatch(setSelectedTag(newValue));
  };

  return (
    <>
      <AppBar position="static" style={{ background: "#5525E4" }}>
        <Tabs
          value={selectedTag}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="BrokerPacket Test"
          TabIndicatorProps={{ style: { background: "white" } }}
          centered={true}
        >
          <Tab label="CREATE USER"></Tab>
          <Tab label="LIST USER"></Tab>
        </Tabs>
      </AppBar>
      {selectedTag === 0 && <CreateUserForm />}
      {selectedTag === 1 && <ListUserTable />}
    </>
  );
}
