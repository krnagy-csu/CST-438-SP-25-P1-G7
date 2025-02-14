import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, FlatList, ActivityIndicator, 
  TouchableOpacity, Linking 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import appStyles from "./styles/appStyles.js";

const API_URL = 'https://www.arbeitnow.com/api/job-board-api';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]); // Start empty
  const [loading, setLoading] = useState(true);
  
  // Search States
  const [tagSearch, setTagSearch] = useState('');
  const [jobTypeSearch, setJobTypeSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Select Location'); // Default selection

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      console.log('API Response:', result);

      setJobs(result.data);
      setFilteredJobs([]); // Do not display jobs initially
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
      setFilteredJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to filter jobs dynamically
  const filterJobs = () => {
    let updatedJobs = jobs;

    // Convert searches to lowercase for case-insensitive matching
    const tagLower = tagSearch.toLowerCase();
    const jobTypeLower = jobTypeSearch.toLowerCase();
    const locationLower = selectedLocation.toLowerCase();

    if (tagSearch) {
      updatedJobs = updatedJobs.filter(job =>
        job.tags && job.tags.some(tag => tag.toLowerCase().includes(tagLower))
      );
    }

    if (jobTypeSearch) {
      updatedJobs = updatedJobs.filter(job =>
        job.job_types && job.job_types.some(type => type.toLowerCase().includes(jobTypeLower))
      );
    }

    if (selectedLocation !== "Select Location") {
      if (selectedLocation === "All Locations") {
        setFilteredJobs(updatedJobs); // Show all locations
      } else {
        updatedJobs = updatedJobs.filter(job =>
          job.location.toLowerCase().includes(locationLower)
        );
        setFilteredJobs(updatedJobs);
      }
    } else {
      setFilteredJobs([]); // Show nothing if "Select Location" is chosen
    }
  };

  useEffect(() => {
    filterJobs();
  }, [tagSearch, jobTypeSearch, selectedLocation]);

  return (
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Job Search</Text>

      <View style={appStyles.searchContainer}>
        {/* Tag Search Bar */}
        <TextInput
          style={appStyles.searchBar}
          placeholder="Search by Tag (e.g., Remote, IT, Design)"
          value={tagSearch}
          onChangeText={setTagSearch}
        />

        {/* Job Type Search Bar */}
        <TextInput
          style={appStyles.searchBar}
          placeholder="Search by Job Type (e.g., Freelance, Full-time)"
          value={jobTypeSearch}
          onChangeText={setJobTypeSearch}
        />

        {/* Location Dropdown */}
        <View style={appStyles.pickerWrapper}>
          <Picker
            selectedValue={selectedLocation}
            onValueChange={(itemValue) => setSelectedLocation(itemValue)}
            style={appStyles.picker}
          >
            <Picker.Item label="Select Location" value="Select Location" />
            <Picker.Item label="All Locations" value="All Locations" />
            {[...new Set(jobs.map(job => job.location))].map(location => (
              <Picker.Item key={location} label={location} value={location} />
            ))}
          </Picker>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : filteredJobs.length === 0 && (tagSearch || jobTypeSearch || selectedLocation !== "Select Location") ? (
        <Text style={appStyles.noResults}>No jobs found</Text>
      ) : filteredJobs.length === 0 ? (
        <Text style={appStyles.noResults}>Enter search criteria to see results</Text>
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.slug}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <View style={appStyles.jobItem}>
                <Text style={appStyles.jobTitle}>{item.title}</Text>
                <Text style={appStyles.companyName}>{item.company_name}</Text>
                <Text style={appStyles.location}>{item.location}</Text>
                {item.tags && <Text style={appStyles.tags}>Tags: {item.tags.join(', ')}</Text>}
                {item.job_types && <Text style={appStyles.jobTypes}>Job Type: {item.job_types.join(', ')}</Text>}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}