import React from "react";
import PropTypes from "prop-types";
import DashboardIcon from "@material-ui/icons/Dashboard";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import StarBorder from "@material-ui/icons/StarBorder";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";

const styles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

function getItems() {
  var json = [
    {
      id: 1,
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      id: 2,
      title: "User",
      items: [
        {
          id: 21,
          name: "All User",
          link: "/dashboard/information/user",
        },
        {
          id: 22,
          name: "Active User",
          link: "/dashboard/information/activeuser",
        },
      ],
    },
    {
      id: 3,
      title: "Meesho",
      items: [
        {
          id: 31,
          name: "Commission",
          link: "/dashboard/commission/meesho",
        },
        {
          id: 32,
          name: "Shipping",
          link: "/dashboard/shipping/meesho",
        },
      ],
    },
    {
      id: 4,
      title: "Club Factory",
      items: [
        {
          id: 41,
          name: "Commission",
          link: "/dashboard/commission/clubFactory",
        },
        {
          id: 42,
          name: "Shipping",
          link: "/dashboard/shipping/clubFactory",
        },
      ],
    },
    {
      id: 5,
      title: "Flipkart",
      items: [
        {
          id: 51,
          name: "Commission",
          link: "/dashboard/commission/flipkart",
        },
        {
          id: 52,
          name: "Shipping",
          link: "/dashboard/shipping/flipkart",
        },
        {
          id: 53,
          name: "Fixed Fees",
          link: "/dashboard/fixedfees/flipkart",
        },
        {
          id: 54,
          name: "Collection Fees",
          link: "/dashboard/collectionfees/flipkart",
        },
      ],
    },
    {
      id: 6,
      title: "Amazon",
      items: [
        {
          id: 61,
          name: "Referral",
          link: "/dashboard/referral/amazon",
        },
        {
          id: 62,
          name: "Closing Fees",
          link: "/dashboard/closingfees/amazon",
        },
        {
          id: 63,
          name: "Shipping",
          link: "/dashboard/shipping/amazon",
        },
      ],
    },
    {
      id: 7,
      title: "Amazon FBA",
      items: [
        {
          id: 71,
          name: "Referral",
          link: "/dashboard/referral/amazonFba",
        },
        {
          id: 72,
          name: "Closing Fees",
          link: "/dashboard/closingfees/amazonFba",
        },
        {
          id: 73,
          name: "Shipping",
          link: "/dashboard/shipping/amazonFba",
        },
        {
          id: 74,
          name: "Fulfillment Fees",
          link: "/dashboard/fulfillmentfees/amazonFba",
        },
      ],
    },
  ];

  return json;
}
class NestedList extends React.Component {
  state = {};
  handleClick = (e) => {
    this.setState({ [e]: !this.state[e] });
  };
  componentDidMount() {
    if (this.props.match.params.platform) {
      var k = this.props.match.params.platform
        .replace(/([A-Z])/g, " $1")
        .trim();
      var result = k.charAt(0).toUpperCase() + k.slice(1);
      this.setState({
        [result]: !this.state[this.props.match.params.platform],
      });
    }
  }
  render() {
    const items = getItems();
    const { classes } = this.props;
    return (
      <>
        <Divider />
        <List className={classes.root}>
          {items.map((item) => {
            return (
              <div key={item.id}>
                {item.items != null ? (
                  <ListItem
                    button
                    key={item.id}
                    onClick={this.handleClick.bind(this, item.title)}
                  >
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                    {item.items != null ? (
                      <div>
                        {this.state[item.title] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </ListItem>
                ) : (
                  <Link
                    to={item.link}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <ListItem
                      button
                      key={item.id}
                      onClick={this.handleClick.bind(this, item.title)}
                    >
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                      {item.items != null ? (
                        <div>
                          {this.state[item.title] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </ListItem>
                  </Link>
                )}
                {item.items != null ? (
                  <div>
                    <Collapse
                      key={items.id}
                      component="li"
                      in={this.state[item.title]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List disablePadding>
                        {item.items.map((sitem) => {
                          return (
                            <Link
                              to={sitem.link}
                              style={{
                                color: "inherit",
                                textDecoration: "none",
                              }}
                            >
                              <ListItem
                                button
                                key={sitem.id}
                                className={classes.nested}
                              >
                                <ListItemIcon>
                                  <StarBorder />
                                </ListItemIcon>
                                <ListItemText
                                  key={sitem.id}
                                  primary={sitem.name}
                                />
                              </ListItem>
                            </Link>
                          );
                        })}
                      </List>
                    </Collapse>{" "}
                  </div>
                ) : (
                  " "
                )}
              </div>
            );
          })}
        </List>
      </>
    );
  }
}
NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(withRouter(NestedList));
