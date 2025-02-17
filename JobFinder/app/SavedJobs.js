
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appStyles from "./styles/appStyles.js";
import { getSavedJobs, deleteSavedJob } from "../database/db";

export default function SavedJobs() {
  const router = useRouter();
  const [savedJobs, setSavedJobs] = useState([]);
  const [username, setUsername] = useState("");
  const [selectedJobs, setSelectedJobs] = useState({}); // Track selected jobs for deletion

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const userData = await AsyncStorage.getItem("loggedInUser");
      
      if (userData) {
        const user = JSON.parse(userData);
        setUsername(user.username);

        const jobs = await getSavedJobs(user.username);
        setSavedJobs(jobs);
      }
    } catch (error) {
      console.error("Error retrieving saved jobs:", error);
    }
  };

  // Toggle job selection for deletion
  const toggleJobSelection = (jobId) => {
    setSelectedJobs(prevState => ({
      ...prevState,
      [jobId]: !prevState[jobId], // Toggle selection
    }));
  };

  // Delete only selected jobs
  const deleteSelectedJobs = async () => {
    const jobsToDelete = Object.keys(selectedJobs).filter((jobId) => selectedJobs[jobId]);
    
    if (jobsToDelete.length === 0) {
      Alert.alert("Error", "No jobs selected for deletion.");
      return;
    }

    for (const jobId of jobsToDelete) {
      await deleteSavedJob(jobId);
    }

    setSelectedJobs({});
    fetchSavedJobs();
    Alert.alert("Success", "Selected jobs deleted.");
  };

  return (
    <View style={appStyles.container}>
      <Text style={appStyles.title}>{username}'s Saved Jobs</Text>

      {savedJobs.length === 0 ? (
        <Text style={appStyles.noResults}>No saved jobs found.</Text>

      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={appStyles.jobItem}>
              <View style={appStyles.jobRow}>
                {/* Job Info */}
                <TouchableOpacity onPress={() => Linking.openURL(item.job_url)} style={appStyles.jobTextContainer}>
                  <Text style={appStyles.jobTitle}>{item.job_title}</Text>
                  <Text style={appStyles.companyName}>{item.company}</Text>
                  <Text style={appStyles.location}>{item.location}</Text>
                </TouchableOpacity>

                {/* Checkbox to select jobs for deletion */}
                <TouchableOpacity 
                  onPress={() => toggleJobSelection(item.id)}
                  style={appStyles.checkboxContainer}
                >
                  <Text style={appStyles.checkboxText}>
                    {selectedJobs[item.id] ? "✅ Selected" : "⬜ Select"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Delete Selected Jobs Button */}
      <TouchableOpacity style={appStyles.caButton} onPress={deleteSelectedJobs}>
        <Text style={appStyles.buttonText}>Delete Selected Jobs</Text>
      </TouchableOpacity>

      {/* Back to Search Button */}
      <TouchableOpacity style={[appStyles.backButton, appStyles.secondaryButton]} onPress={() => router.push("/search")}>
        <Text style={appStyles.buttonText}>Back to Search</Text>
      </TouchableOpacity>

      
    </View>
  );
}


