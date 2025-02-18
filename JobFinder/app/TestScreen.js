// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { insertUser, selectUser } from "../database/db"; // adjust the path as needed

// export default function TestScreen() {
//   const handleCreateAccount = async () => {
//     // Create a test account
//     const result = await insertUser(
//       "testuser",
//       "password123",
//       "Test",
//       "User",
//       "testuser@example.com"
//     );
//     console.log("Insert User Result:", result);

//     // Fetch users to verify insertion
//     const users = await selectUser();
//     console.log("Users after insertion:", users);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
//         <Text style={styles.buttonText}>Create Test Account</Text>
//       </TouchableOpacity>
//       {/* Add more buttons to test other functions as needed */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   button: {
//     padding: 15,
//     backgroundColor: "#007bff",
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });