// SavedJobs.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getSavedJobs, deleteSavedJob } from "../database/db";
import appStyles from "./styles/appStyles.js";

export default function SavedJobs() {
  const router = useRouter();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const userData = await AsyncStorage.getItem("loggedInUser");
      if (!userData) {
        Alert.alert("Error", "No logged in user found.");
        setLoading(false);
        return;
      }
      const user = JSON.parse(userData);
      setUsername(user.username);

      const jobs = await getSavedJobs(user.username);
      console.log("Saved jobs:", jobs);
      setSavedJobs(jobs);
    } catch (error) {
      console.error("Error retrieving saved jobs:", error);
      Alert.alert("Error", "Could not load saved jobs.");
    } finally {
      setLoading(false);
    }
  };

  const removeJob = async (jobId) => {
    try {
      const result = await deleteSavedJob(jobId);
      if (result.success) {
        Alert.alert("Success", "Job removed.");
        fetchSavedJobs();
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error("Error removing job:", error);
      Alert.alert("Error", "Could not remove job.");
    }
  };

  const renderJobItem = ({ item }) => (
    <View style={appStyles.jobItem}>
      <TouchableOpacity style={appStyles.jobTextContainer} onPress={() => { /* Optionally open job URL */ }}>
        <Text style={appStyles.jobTitle}>{item.job_title}</Text>
        <Text style={appStyles.companyName}>{item.company}</Text>
        <Text style={appStyles.location}>{item.location}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeJob(item.id)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={appStyles.container}>
      <Text style={[appStyles.title, styles.header]}>
        Saved Jobs for {username}
      </Text>
      {savedJobs.length === 0 ? (
        <Text style={styles.noJobsText}>No saved jobs found.</Text>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderJobItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <TouchableOpacity
        style={appStyles.caButton}
        onPress={() => router.push("/search")}
      >
        <Text style={appStyles.buttonText}>Back to Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 16,
    textAlign: "center",
  },
  noJobsText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
