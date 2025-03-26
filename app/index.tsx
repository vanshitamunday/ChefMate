import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { verifyPassword } from "../lib/supabase_crud";
import { Link } from "expo-router";

export default function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')


const handleLogin = async () => {
    try {
        const passwordMatch = await verifyPassword(email, password);
        
        if(passwordMatch) {
            Alert.alert('Login Successful');
        } else {
            Alert.alert('Invalid credentials');
        } 
    }catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login error');
        }
    
};

    return (
        <View>
            <View>
                <Text>Email:</Text>
                <TextInput
                    placeholder="Enter email"
                    value={email}
                    onChangeText={setEmail}/>
            </View>
            <View>
                <Text>Password:</Text>
                <TextInput
                placeholder="Enter Password"
                secureTextEntry={true}
                value={password} 
                onChangeText={setPassword}/>
            </View>
            <Button title="Login" onPress={handleLogin}/>
        </View>
    );
}