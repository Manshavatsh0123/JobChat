'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        username: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:9090/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Login successful!')
                // Store token if provided
                if (data.token) {
                    localStorage.setItem('token', data.token)
                }
                // Redirect or update auth state here
                setTimeout(() => window.location.href = '/dashboard', 1000)
            } else {
                toast.error(data.message || 'Login failed')
            }
        } catch (error) {
            toast.error('Network error. Please try again.')
            console.error('Login error:', error)
        } finally {
            setIsLoading(false)
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:9090/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    username: formData.username,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                toast.success('Account created! Signing in...')
                setFormData({ name: '', email: '', password: '', username: '' })
                // Auto-login or redirect
                setTimeout(() => window.location.href = '/dashboard', 1000)
            } else {
                toast.error(data.message || 'Sign up failed')
            }
        } catch (error) {
            toast.error('Network error. Please try again.')
            console.error('Sign up error:', error)
        } finally {
            setIsLoading(false)
        }
    };

    const handleSubmit = isSignUp ? handleSignUp : handleLogin;

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                background: 'linear-gradient(135deg, #EEF2FF, #FFFFFF)',
            }}
        >
            <Card className="w-full max-w-md border border-[#6366F1]/20 bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl">
                <div className="p-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </h1>
                        <p className="text-gray-500">
                            {isSignUp
                                ? 'Join us today and get started'
                                : 'Sign in to your account'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {isSignUp && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required={isSignUp}
                                    className="border border-[#6366F1]/20 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 bg-white text-gray-900 placeholder:text-gray-400 transition-all"
                                />
                            </div>
                        )}

                        {isSignUp && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <Input
                                    name="username"
                                    type="text"
                                    placeholder="johndoe123"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required={isSignUp}
                                    className="border border-[#6366F1]/20 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 bg-white text-gray-900 placeholder:text-gray-400 transition-all"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="border border-[#6366F1]/20 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 bg-white text-gray-900 placeholder:text-gray-400 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="border border-[#6366F1]/20 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 bg-white text-gray-900 placeholder:text-gray-400 transition-all"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-6 bg-[#6366F1] hover:bg-[#4f46e5] text-white font-semibold py-2 rounded-xl transition-all shadow-md hover:shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : isSignUp ? (
                                'Create Account'
                            ) : (
                                'Sign In'
                            )}
                        </Button>

                    </form>

                    {/* Toggle */}
                    <div className="text-center mt-6">
                        <p className="text-gray-500 text-sm">
                            {isSignUp
                                ? 'Already have an account? '
                                : "Don't have an account? "}
                            <button
                                onClick={() => {
                                    setIsSignUp(!isSignUp)
                                    setFormData({ name: '', email: '', password: '', username: '' })
                                }}
                                className="text-[#6366F1] hover:text-[#4f46e5] font-semibold transition-colors"
                            >
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>

                </div>
            </Card>
        </div>
    )
}
