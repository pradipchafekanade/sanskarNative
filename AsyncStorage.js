import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async(key,value)=>{
        try {
            await AsyncStorage.setItem(key,value)
        } catch (error) {
            console.log("Error storing value",error);
        }
}

export const getItem = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value; // Add this line to return the retrieved value
    } catch (error) {
      console.log('error receiving value', error);
    }
  };
  

export const removeItem = async(key)=>{
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log('Error deleting value ',err);
    }
}