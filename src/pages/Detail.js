import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { Suspense } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FormatQuote from "@material-ui/icons/FormatQuote";
import ShareIcon from '@material-ui/icons/Share';

import {
  AuthCheck,
  useDatabaseObject,
  useFirebaseApp,
  useStorageDownloadURL
} from "reactfire";
import "../App.css";
import {
  getForSaleItemRef,
  getSellerEmailRef,
  getSellerNameRef
} from "../firebase-refs";
import Page from "./Page";

const useStyles = makeStyles(theme => ({
  appBar: {},
  card: {
    maxWidth: 400,
    margin: theme.spacing(2)
  },
  media: {
    height: 140
  },
  grid: {
    // padding: theme.spacing(2),
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden"
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  container: {
    padding: theme.spacing(2)
  }
}));

function Contact({ sellerId }) {
  const sellerEmailRef = getSellerEmailRef(useFirebaseApp().database, sellerId);
  const sellerNameRef = getSellerNameRef(useFirebaseApp().database, sellerId);
  const emailSnapshot = useDatabaseObject(sellerEmailRef);
  const sellerNameSnapshot = useDatabaseObject(sellerNameRef);
  const classes = useStyles();

  if (emailSnapshot && emailSnapshot.snapshot.exists()) {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Recommended By</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {sellerNameSnapshot.snapshot.val()} ({emailSnapshot.snapshot.val()})
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  } else {
    return (
      <ExpansionPanel disabled>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            No longer for sale - Seller has deleted their account
          </Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    );
  }
}

function SellerDetails({ sellerId }) {
  const classes = useStyles();

  return (
    <Suspense
      fallback={
        <ExpansionPanel disabled>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Loading</Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      }
    >
      <AuthCheck
        fallback={
          <ExpansionPanel disabled>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Sign in to view seller details
              </Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
        }
      >
        <Contact sellerId={sellerId} />
      </AuthCheck>
    </Suspense>
  );
}

function Details({ itemId }) {
  const firebaseApp = useFirebaseApp();
  const classes = useStyles();

  const itemRef = getForSaleItemRef(useFirebaseApp().database, itemId);
  const itemSnapshot = useDatabaseObject(itemRef);
  const {
    title,
    image,
    description,
    seller,
    qoutes
  } = itemSnapshot.snapshot.val();
  const imageURL = useStorageDownloadURL(firebaseApp.storage().ref(image));
  return (
    <>
      <div
        style={{
          display: "flex"
        }}
      >
        <div style={{ flex: 1, margin: "15px" }}>
          <Typography variant="h3">{title}
          <ShareIcon  style={{'padding-left': '15px', 'padding-bottom': '10px', color: '#e62f54'}}/></Typography>
          
          <br/>
          <div className={classes.container}>
            <Typography variant="body1">{description}</Typography>
          </div>
  
          <ListItem>
            <ListItemIcon>
              <FormatQuote style={{ transform: "rotate(180deg)" }} />
            </ListItemIcon>
            <ListItemText primary={`${qoutes}`} />
            <ListItemIcon>
              <FormatQuote />
            </ListItemIcon>
          </ListItem>
          <br/><br/>
          <SellerDetails sellerId={seller} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ width: "100%", margin: "15px" }}>
            <img
              src={imageURL}
              alt="Some item"
              style={{
                maxHeight: "80vh",
                maxWidth: "100%",
                display: "block",
                margin: "auto"
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function ItemDetail({ itemId }) {
  return (
    <Page>
      <Details itemId={itemId} />
    </Page>
  );
}

export default ItemDetail;
