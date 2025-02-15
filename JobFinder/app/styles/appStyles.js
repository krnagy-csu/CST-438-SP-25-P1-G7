import { StyleSheet } from "react-native";

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cccccd",
    padding: 20,
    paddingTop: 80,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 30,
  },
  caButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
    width: "70%",
    alignItems: "center",
  },
  liButton: {
    backgroundColor: "#007bff",
  },
  searchButton: {
    backgroundColor: "#444",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
    width: "70%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 50,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    textAlign: "left",
  },
  
  // Search Page Styles
  searchContainer: {
    width: "100%",
    paddingBottom: 10,
  },
  searchBar: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    alignSelf: "center",
  },
  pickerWrapper: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 10,
    alignSelf: "center",
  },
  picker: {
    height: 50,
    paddingVertical: 10,
    justifyContent: "center",
    textAlign: "center", 
    backgroundColor: "#fff",
    color: "#000",
  },
  jobItem: {
    width: "90%",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignSelf: "center",
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  companyName: {
    fontSize: 16,
    color: "#555",
  },
  location: {
    fontSize: 14,
    color: "#777",
  },
  tags: {
    fontSize: 14,
    color: "#007bff",
  },
  jobTypes: {
    fontSize: 14,
    color: "#28a745",
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  
  // Login Page Styles
  label: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    width: "90%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  toggleButton: {
    marginLeft: 10,
    padding: 10,
  },
  
  // Sign-Up Page Styles
  prompt: {
    fontSize: 25,
    color: "#ffffff",
    marginBottom: 5,
  },
  smallText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#444",
  },
});

export default appStyles;