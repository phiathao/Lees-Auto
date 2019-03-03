import image from '../image/motor.jpg';

const Styles = theme => ({
  // dialog box
  dialogComponent: {
    flexGrow: 1,
    maxWidth: 700,
  },
  dialogTextField: {
    marginTop: theme.spacing.unit - 3,
    marginBottom: theme.spacing.unit - 8,
  },
  cancelMargin:{
    marginRight: theme.spacing.unit,
  },
  overflowScroll: {
    overflow: 'scroll',
    maxHeight: theme.spacing.unit * 50,
  },
  // ServerAll
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appTab: {
    minWidth: 'auto',
  },
  serviceItem: {
    textAlign: "center",
    margin: 0,
    overflow: "hidden",
    paddingBottom: 30,
    paddingTop: 30,
    minHeight: 200,
    backgroundColor: "#f2f2f2",
  },
  serviceItem2: {
    textAlign: "center",
    margin: 0,
    overflow: "hidden",
    paddingBottom: 30,
    paddingTop: 30,
    minHeight: 200,
    backgroundColor: "#6a7b83",
  },
  servicePl: {
    textAlign: "center",
    margin: 0,
    color: 'white',
    textDecoration: 'bold',
    overflow: "hidden",
    paddingBottom: 30,
    paddingTop: 30,
    minHeight: 200,

    //bg
    backgroundImage: `url(${image})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },

  // Home Slider
  slider: {
    padding: 50,
    backgroundColor: "#f2f2f2",
  },
  sliderCard: {
    minHeight: 50,
  },
  sliderDiv: {
    paddingRight: 10,
    paddingLeft: 10,
  },

  // Home Feature
  pl: {
    backgroundImage: `url(${image})`,
    height: '100%',
    minHeight: '300px',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  hServiceFeature: {
    textAlign: "center",
    margin: 0,
    color: "white",
    backgroundColor: "#6a7b83",
    overflow: "hidden",
    paddingBottom: 30,
    paddingTop: 30,
    borderBottom: "#2196f3 solid 2px",
    borderTop: "#2196f3 solid 2px",
    minHeight: 200,
  },
  hServiceP: {
    width: "90%",
    margin: "auto",
  },
  hServiceButton: {
    margin: 15,
  },

  // login page
  root: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  loginMessageBox: {
    height: theme.spacing.unit * 2,
  },
  textMessageColor: {
    color: 'red',
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  },
  // ----------------
  height100: {
    height: '100vh',
  }
  // componentContainer: {
  //     margin: 0,
  //     width: "100%",
  // },
  // componentMaxWidth: {
  //     marginLeft: "auto",
  //     marginRight: "auto",
  //     width: "600px",
  // },
  // noPadding: {
  //     padding: 0,
  // },
  // componentHeader: {
  //     width: "100%",
  //     textAlign: "center",
  //     backgroundColor: "#6a7b83",
  //     margin: 0,
  //     paddingTop: "30px",
  //     paddingBottom: "30px",
  //     overflow: "hidden",
  //     color: "#f2f2f2",
  //     borderBottom: "3px solid #2196f3",
  // },
  // headerButtonLeft: {
  //     display: "block",
  //     margin: "auto",
  //     position: "absolute",
  //     float: "left",
  //     left: "5%",
  //     marginTop: "12px",
  // },
  // componentSecond: {
  //     paddingTop: "15px",
  //     textAlign: "center",
  //     margin: "auto",
  // },
  // componentSecondBtn: {
  //     display: "block",
  //     margin: "auto",
  //     width: "150px",
  // },
  // gridLeftBtn: {
  //     width: "100%",
  // },
  // searchField: {
  //     width: "40%",
  //     marginBottom: 0,
  //     marginLeft: "auto",
  //     marginRight: "auto",
  //     backgroundColor: "#f2f2f2",
  // },
  // boxFormContainer: {
  //     textAlign: "center",
  //     marginTop: "30px",
  // },
  // boxFormMaxWidth: {
  //     maxWidth: "55%",
  //     minWidth: "540px",
  //     marginLeft: "auto",
  //     marginRight: "auto",
  // },
  // boxFormAdd: {
  //     display: "inline",
  // },
  // boxFormTwo: {
  //     paddingLeft: "1%",
  //     paddingRight: "1%",
  //     minWidth: "48%",
  //     marginBottom: 0,
  //     marginTop: 0,
  // },
  // boxFormOne: {
  //     paddingLeft: "1%",
  //     paddingRight: "1%",
  //     minWidth: "98%",
  //     marginBottom: 0,
  //     marginTop: 0,
  // },
  // boxFormThreeFive: {
  //     paddingLeft: "1%",
  //     paddingRight: "1%",
  //     width: "40%",
  //     marginBottom: 0,
  //     marginTop: 0,
  // },
  // boxFormTwoFive: {
  //     paddingLeft: "1%",
  //     paddingRight: "1%",
  //     // width: "30%",
  //     marginBottom: 0,
  //     marginTop: 0,
  // },
  // boxFormOneFive: {
  //     paddingLeft: "1%",
  //     paddingRight: "1%",
  //     width: "24%",
  //     marginBottom: 0,
  //     marginTop: 0,
  // },
  // boxFormBtn: {
  //     width: "520px",
  //     margin: "auto",
  // },
  // addForm: {
  //     paddingTop: "30px",
  //     paddingBottom: "30px",
  // },
  // boxContainer: {
  //     textAlign: "center",
  //     width: "520px",
  //     marginLeft: "auto",
  //     marginRight: "auto",
  //     marginTop: "15px",
  //     marginBottom: "15px",
  // },
  // stickLeft: {
  //     textAlign: "left",
  // },
  // inputMargin: {
  //     margin: 0,
  //     marginBottom: 0,
  //     padding: 0,
  //     borderWidth: 0,
  //     backgroundColor: "#cfd8dc",
  // },
  // boxContainerHeading: {
  //     marginTop: 0,
  //     marginBottom: 0,
  // },
  // boxStickRight: {
  //     float: "right",
  //     // marginBottom: "-17px",
  // },
  // cardContainer: {
  //     minHeight: "100px",
  //     maxWidth: "600px",
  //     margin: "auto",
  //     marginTop: "10px",
  // },
  // homeCard: {
  //     height: "200px",
  //     margin: "10px",
  // }
});

export default Styles;