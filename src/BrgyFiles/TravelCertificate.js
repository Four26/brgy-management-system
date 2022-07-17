import React, { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import date from "date-and-time";
import { Container, createStyles, TextInput} from "@mantine/core";
import OpenSansRegular from "../fonts/OpenSans-Regular.ttf";
import OpenSansBold from "../fonts/OpenSans-Bold.ttf";
import LucidaCalligraphy from "../fonts/Lucida Calligraphy Font.ttf";
import Logo from "../images/BRGY_LUNA - Logo.png";
import { useSelector } from "react-redux";


const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[5]
        : theme.colors.lighttheme[0],
    transition: "ease-in-out 500ms",
    borderRadius: `20px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const styles = StyleSheet.create({
  maintitle: {
    alignSelf: "center",
    fontSize: 32,
    fontFamily: "OpenSans",
    marginTop: 24,
  },
  body: {
    width: "2500px",
    height: "3300px",
    paddingRight: 35,
    background: "transparent",
  },
  title: {
    fontSize: 29,
    fontFamily: "OpenSans",
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "ultrabold",
    marginTop: 9,
  },

  text: {
    fontSize: 10,
    alignSelf: "center",
    fontFamily: "OpenSans",
  },

  textregular: {
    fontSize: 10,
    alignSelf: "center",
    fontFamily: "OpenSans",
    fontWeight: 900,
  },
  clientname: {
    fontSize: 10,
    alignSelf: "center",
    fontFamily: "OpenSans",
    fontWeight: 900,
    textTransform: "uppercase",
  },
  container: {
    fontFamily: "Regular",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: `100vh`,
    borderRadius: 20,
    transition: "ease-in-out 500ms",
  },
  pdfviewer: {
    height: "90vh",
    width: "35vw",
  },
  containerwrapper: {
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
  },
  leftcontainer: {
    width: 170,
    paddingTop: 100,
  },
  rightcontainer: {
    width: 600,
    paddingTop: 70,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 18,
  },
  mainheader: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
  },
  containertext: {
    background: Logo,
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    width: "100%",
    marginTop: 16,
    height: 380,
  },
  receipenttext: {
    fontSize: 10,
    alignSelf: "left",
    fontFamily: "OpenSans",
    fontWeight: 900,
    paddingBottom: 14,
  },
  textfirstparag: {
    fontSize: 9,
    alignSelf: "left",
    fontFamily: "OpenSans",
    width: "auto",
    lineHeight: 2,
    textAlign: "justify",
  },
  firstcontainer: {
    flexDirection: "row",
    textAlign: "justify",
  },
  marginTopContainer: {
    marginTop: 12,
    textAlign: "justify",
  },

  marginspacing: {
    color: "white",
  },
  formcontainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textinputs: {
    width: "80%",
  },
  textlowercase: {
    fontSize: 9,
    fontFamily: "OpenSans",
    textTransform: "lowercase",
  },
  textCapitalize: {
    fontSize: 9,
    fontFamily: "OpenSans",
    textTransform: "capitalize",
  },
  textuppercase: {
    fontSize: 9,
    fontFamily: "OpenSans",
    textTransform: "uppercase",
  },
});

Font.register({
  family: "OpenSans",
  fonts: [
    { src: OpenSansRegular },
    { src: OpenSansBold, fontWeight: 900 },
    { src: LucidaCalligraphy, fontStyle: "italic", fontWeight: "ultrabold" },
  ],
});

const TravelCertificate = () => {
  const { classes } = useStyles();
   const singleperson = useSelector(
     (state) => state.facerecog.singlepersondata
   );
   const [ClientAge, setClientAge] = useState("");
  return (
    <Container fluid="true" className={classes.root}>
      <Text style={styles.maintitle}>Travel Certificate</Text>
      <div style={styles.container}>
        <Container style={styles.containerwrapper}>
          <PDFViewer style={styles.pdfviewer}>
            <MyDocuments singleperson={singleperson} ClientAge={ClientAge} />
          </PDFViewer>
        </Container>
        <Container style={styles.containerwrapper}>
          <DataFillOut setClientAge={setClientAge} />
        </Container>
      </div>
    </Container>
  );
};

const DayMoment = (n) => {
  return (
    ["st", "nd", "rd"][(((((n < 0 ? -n : n) + 90) % 100) - 10) % 10) - 1] ||
    "th"
  );
};

const MyDocuments = ({ singleperson, ClientAge }) => {
  const now = new Date();
  const day = date.format(now, "D");
  const MonthAndDate = date.format(now, "MMMM, YYYY");
  return (
    <Document>
      <Page size="LETTER" wrap style={styles.body}>
        <View style={styles.row}>
          <View style={styles.leftcontainer}></View>
          <View style={styles.rightcontainer}>
            <View style={styles.mainheader}></View>
            <Text style={styles.title}>BARANGAY CERTIFICATION</Text>
            <View style={styles.containertext}>
              <Text style={styles.receipenttext}>TO WHOM IT MAY CONCERN:</Text>
              <View style={styles.firstcontainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This is to certify that {""}
                  <Text style={styles.clientname}>
                    {`${
                      singleperson?.firstname
                    } ${singleperson?.middlename.slice(0, 1)}. ${
                      singleperson?.lastname
                    }`}
                  </Text>
                  , <Text>{ClientAge}</Text> years of age,{" "}
                  <Text style={styles.textlowercase}>{singleperson?.sex}</Text>,{" "}
                  <Text style={styles.textlowercase}>
                    {singleperson?.civilstatus}
                  </Text>
                  , stranded/temporary residing,{" "}
                  <Text style={styles.textCapitalize}>
                    {singleperson?.citizenship}
                  </Text>{" "}
                  Citizen , a resident of <Text>{singleperson?.address}</Text>,
                  Barangay Luna, Surigao City.
                </Text>
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This is also to certify that{" "}
                  <Text style={styles.clientname}>
                    {`${
                      singleperson?.firstname
                    } ${singleperson?.middlename.slice(0, 1)}. ${
                      singleperson?.lastname
                    }`}
                  </Text>{" "}
                  is not included in the LIST of Person Under Monitoring (PUM)/
                  Patient Under Investigation (PUI) in the Barangay per
                  consolidated report from the City Health Office and has
                  already undergone more than 14 days of Home Quarantine during
                  his/her/their stay in Barangay during the implementation of
                  the Community Quarantine. Further{" "}
                  <Text style={styles.clientname}>
                    {`${
                      singleperson?.firstname
                    } ${singleperson?.middlename.slice(0, 1)}. ${
                      singleperson?.lastname
                    }`}
                  </Text>{" "}
                  has no travel history to the COVID-19 High Risk Areas in the
                  last 14-days prior to the request of this certification.
                </Text>
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  This certification is issued and will serve as an endorsement
                  to the City Health Officer for the conduct of{" "}
                  <Text style={styles.textregular}>
                    Medical Examination for the issuance of a Medical
                    Certificate.
                  </Text>
                </Text>
              </View>
              <View style={styles.marginTopContainer}>
                <Text style={styles.textfirstparag}>
                  <Text style={styles.marginspacing}>...............</Text>
                  Issued this{" "}
                  <Text>
                    {day}
                    {DayMoment(day)}
                  </Text>{" "}
                  day of <Text>{MonthAndDate}</Text> at Barangay Luna, Surigao
                  City, Philippines.{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const DataFillOut = ({ setClientAge }) => {
  return (
    <Container fluid="true" style={styles.formcontainer}>
      <TextInput
        style={styles.textinputs}
        label="Age"
        radius="sm"
        placeholder="ex. 28"
        onChange={(e) => setClientAge(e.currentTarget.value)}
      />
    </Container>
  );
};

export default TravelCertificate;
