'use client'

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { verifyPassword } from "../lib/supabase_crud";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
}

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

const handleEmailChange = (text) => {
    setEmail(text);
}


return (
    <View>
        <View>
            <Text>Email:</Text>
            <TextInput
                type="text"
                placeholder="Enter email"
                value={email}
                onChangeText={handleEmailChange}/>
        </View>
        <View>
            <Text>Password:</Text>
            <TextInput
            type="text" 
            placeholder="Enter Password" 
            value={password} 
            onChange={handleLogin}/>
        </View>
        <Button title="Login" onPress={handleLogin}/>
        <Button>Register</Button>
    </View>
)