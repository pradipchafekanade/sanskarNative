import React, { useRef, useEffect, useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';


const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  
const Certificate = ({route}) => {
  const { userid } = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${apiUrl}api/users.php?id=${userid}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userid]);

  const printCertificate = async () => {
    if (!data) {
      console.log('Data not available yet.');
      return;
    }

    const html = generateHTML(data);
    
    await Print.printAsync({
      html,
      // Add your printerUrl if needed
    });
  };

  const generateHTML = (userData) => {
    return `

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Certificate</title>
<style>
.container {
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
  background-color: #f5f5f5;
  border-width: 5px;
  border-color: #FF5733;
  border-radius: 20px;
  padding: 20px;
  margin-top: 90px;
  margin: 20px;
  elevation: 5px;
  shadow-offset: {
    width: 0;
    height: 2;
  }
  shadow-opacity: 0.25;
  shadow-radius: 3.84;
}
.companyName {
  font-size: 48px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 10px;
  text-align: center;
  color: #FF5733;
  font-family: 'Roboto';
  text-shadow-color: #555;
  text-shadow-offset: { width: 1; height: 1 };
  text-shadow-radius: 5;
}
.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: #4CAF50;
}
.subtitle {
  font-size: 24px;
  margin-bottom: 5px;
  text-align: center;
  color: #555;
}
.recipient {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
  color: #333;
}
.course {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: #2196F3;
}
.dateContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  border-top: 2px solid #555;
  padding-top: 10px;
}
.date {
  font-size: 24px;
  font-weight: normal;
  color: #555;
}
.signatureContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  border-top: 2px solid #555;
  padding-top: 10px;
}
.signature {
  font-size: 24px;
  font-weight: bold;
  color: #555;
}
.signatureLine {
  flex: 1;
  border-bottom: 2px solid #555;
  margin-left: 10px;
}
</style>
</head>
<body>
  <div class="container">
    <p class="companyName">Sanskar</p>
    <p class="title">Certificate of Completion</p>
    <p class="subtitle">This is to certify that</p>
    <p class="recipient">${userData.length > 0 ? userData[0].name : ''}</p>
    <p class="subtitle">has successfully completed the course:</p>
    <p class="course">Gurukul</p>
    <div class="dateContainer">
      <span class="subtitle">Date:</span>
    </div>
    <div class="signatureContainer">
      <span class="subtitle">Signature:</span>
      <span class="signatureLine"></span>
    </div>
  </div>
</body>
</html>
`;

};



return (
  <>
    {data ? ( 
      <View style={styles.container}>
        <Text style={styles.companyName}>Sanskar</Text>
        <Text style={styles.title}>Certificate of Completion</Text>
        <Text style={styles.subtitle}>This is to certify that</Text>
        <Text style={styles.recipient}>{data.length > 0 ? data[0].name : ''}</Text>
        <Text style={styles.subtitle}>has successfully completed the course:</Text>
        <Text style={styles.course}>Gurukul</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.subtitle}>Date:</Text>
          <Text style={[styles.subtitle, styles.date]}>_____________</Text>
        </View>
        <View style={styles.signatureContainer}>
          <Text style={styles.signature}>Signature:</Text>
          <View style={styles.signatureLine}></View>
        </View>
      </View>
    ) : (
      <Text>Loading...</Text> // Placeholder for when data is null
    )}
    {/* Download Button */}
    <TouchableOpacity style={styles.downloadButton} onPress={printCertificate}>
      <Text style={styles.downloadButtonText}>Download PDF</Text>
    </TouchableOpacity>
  </>
);

};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 5,
    borderColor: '#FF5733',
    borderRadius: 20,
    padding: 20,
    marginTop:90,
    margin: 20,
    elevation: 5, // for Android shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  companyName: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop:0,
    marginBottom: 10,
    textAlign: 'center',
    color: '#FF5733', // Company name color
    fontFamily: 'Roboto', // Custom font family
    textShadowColor: '#555', // Text shadow color
    textShadowOffset: { width: 1, height: 1 }, // Text shadow offset
    textShadowRadius: 5, // Text shadow radius
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4CAF50', // Title color
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'center',
    color: '#555', // Subtitle color
  },
  recipient: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#333', // Recipient color
  },
  course: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2196F3', // Course color
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  date: {
    fontSize: 24,
    fontWeight: 'normal',
    color: '#555', // Date color
  },
  signatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signature: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#555', // Signature color
  },
  signatureLine: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: '#555', // Signature line color
  },
  downloadButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Certificate;