import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const addJob = () => {
        const newJob = { id: String(jobs.length + 1), name, type, description, location };
        setJobs([...jobs, newJob]);
        setName('');
        setType('');
        setDescription('');
        setLocation('');
    };

    const clearJobs = () => {
        setJobs([]); 
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.label}>Type:</Text>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.label}>Location:</Text>
            </View>
            <View style={styles.dataContainer}>
                <Text style={styles.data}>{item.name}</Text>
                <Text style={styles.data}>{item.type}</Text>
                <Text style={styles.data}>{item.description}</Text>
                <Text style={styles.data}>{item.location}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.mainHeader}>Welcome to JobFinder</Text>
            <Text style={styles.header}>Job List</Text>
            <FlatList
                data={jobs}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
            />
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Type" value={type} onChangeText={setType} />
                <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
                <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
                <Button title="Add Job" onPress={addJob} />
                <View style={styles.buttonSpacer} />
                <Button title="Clear All Jobs" onPress={clearJobs} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    mainHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
    },
    labelContainer: {
        marginRight: 10,
        width: 100,
    },
    dataContainer: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    data: {
        fontSize: 16,
        marginBottom: 4,
    },
    inputContainer: {
        padding: 10,
    },
    input: {
        height: 40,
        marginBottom: 8,
        borderWidth: 1,
        padding: 10,
    },
    buttonSpacer: {
        marginTop: 10,
    },
});

export default JobList;
