import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appStyles from "./styles/appStyles.js";
import { getSavedJobs, deleteSavedJob } from "../database/db";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [username, setUsername] = useState("");

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

  const removeJob = async (jobId) => {
    await deleteSavedJob(jobId);
    fetchSavedJobs();
    Alert.alert("Success", "Job removed.");
  };

  return (
    <View style={appStyles.container}>
      <Text style={appStyles.title}> {username}'s Saved Jobs</Text>

      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.job_title} - {item.company}</Text>
            <TouchableOpacity onPress={() => removeJob(item.id)}>
              <Text> Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
