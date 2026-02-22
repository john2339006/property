'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

type Mode = 'login' | 'register' | 'set-password' | 'forgot-password';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const tokenParam = searchParams.get('token');
    const modeParam = searchParams.get('mode'); // string | null
    const callbackUrl = searchParams.get('callbackUrl') ?? '/';

    const [mode, setMode] = useState<Mode>(() => {
        if (modeParam === 'invite' || modeParam === 'reset') return 'set-password';
        return 'login';
    });

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [devResetLink, setDevResetLink] = useState('');

    const isSetPassword = mode === 'set-password';
    const isInviteFlow = modeParam === 'invite';
    const isResetFlow = modeParam === 'reset';


    const updateField = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [key]: e.target.value }));
        setError('');
    };

    async function handleLogin() {
        if (!formData.email || !formData.password) {
            setError('Please enter your email and password.');
            return;
        }
        const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });
        if (result?.error) {
            setError(result.error);
        } else {
            router.push(callbackUrl);
        }
    }

    async function handleRegister() {
        if (!formData.email || !formData.password || !formData.name) {
            setError('Please fill in all required fields.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password, name: formData.name }),
        });
        const data = await res.json();
        if (!res.ok) {
            setError(typeof data.error === 'string' ? data.error : 'Registration failed. Please try again.');
            return;
        }
        // Auto login after register
        const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });
        if (result?.error) {
            setError(result.error);
        } else {
            router.push(callbackUrl);
        }
    }

    async function handleSetPassword() {
        if (!formData.password) {
            setError('Please enter a new password.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!tokenParam) {
            setError('Invalid token. Please use the link from your email.');
            return;
        }
        const endpoint = isInviteFlow ? '/api/auth/set-password' : '/api/auth/reset-password';
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: tokenParam, password: formData.password }),
        });
        const data = await res.json();
        if (!res.ok) {
            setError(typeof data.error === 'string' ? data.error : 'Failed. Please try again.');
            return;
        }
        // Auto login using the email returned
        const result = await signIn('credentials', {
            email: data.email,
            password: formData.password,
            redirect: false,
        });
        if (result?.error) {
            setSuccess('Password set successfully! Please log in.');
            setMode('login');
        } else {
            router.push(callbackUrl);
        }
    }

    async function handleForgotPassword() {
        if (!formData.email) {
            setError('Please enter your email address.');
            return;
        }
        const res = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email }),
        });
        const data = await res.json();
        if (!res.ok) {
            setError(typeof data.error === 'string' ? data.error : 'Request failed.');
            return;
        }
        setSuccess('If an account with that email exists, a reset link has been sent.');
        if (data.devResetLink) {
            setDevResetLink(data.devResetLink);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            if (mode === 'login') await handleLogin();
            else if (mode === 'register') await handleRegister();
            else if (mode === 'set-password') await handleSetPassword();
            else if (mode === 'forgot-password') await handleForgotPassword();
        } finally {
            setLoading(false);
        }
    }

    const titles: Record<Mode, { title: string; subtitle: string }> = {
        login: { title: '欢迎回来', subtitle: 'Sign in to your account' },
        register: { title: '创建账号', subtitle: 'Create a new account' },
        'set-password': {
            title: isInviteFlow ? '设置密码' : '重置密码',
            subtitle: isInviteFlow ? 'Set your password to activate your account' : 'Create your new password',
        },
        'forgot-password': { title: '忘记密码', subtitle: 'Enter your email to receive a reset link' },
    };

    const { title, subtitle } = titles[mode];

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            {/* Background blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-violet-600/10 blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 mb-4">
                        <span className="material-symbols-outlined text-white text-3xl">apartment</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">兴业物业管理系统</h1>
                    <p className="text-blue-300/70 text-sm mt-1">Property Management Platform</p>
                </div>

                {/* Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
                    {/* Tabs (only for login/register) */}
                    {!tokenParam && mode !== 'forgot-password' && (
                        <div className="flex border-b border-white/10">
                            <button
                                onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                                className={`flex-1 py-3.5 text-sm font-medium transition-colors ${mode === 'login'
                                    ? 'text-white bg-white/10 border-b-2 border-blue-400'
                                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                                    }`}
                            >
                                登录
                            </button>
                            <button
                                onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
                                className={`flex-1 py-3.5 text-sm font-medium transition-colors ${mode === 'register'
                                    ? 'text-white bg-white/10 border-b-2 border-blue-400'
                                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                                    }`}
                            >
                                注册
                            </button>
                        </div>
                    )}

                    <div className="px-8 py-7">
                        {/* Title */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-white">{title}</h2>
                            <p className="text-sm text-blue-200/60 mt-1">{subtitle}</p>
                        </div>

                        {/* Success Message */}
                        {success && (
                            <div className="mb-5 flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm">
                                <span className="material-symbols-outlined text-lg flex-shrink-0 mt-0.5">check_circle</span>
                                <div>
                                    <p>{success}</p>
                                    {devResetLink && (
                                        <div className="mt-2 p-2 bg-black/30 rounded-lg">
                                            <p className="text-xs text-emerald-200/70 mb-1 font-medium">DEV ONLY – Reset link:</p>
                                            <a href={devResetLink} className="text-xs text-blue-300 break-all hover:underline">{devResetLink}</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mb-5 flex items-center gap-3 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm">
                                <span className="material-symbols-outlined text-lg flex-shrink-0">error</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name field (register only) */}
                            {mode === 'register' && (
                                <div>
                                    <label className="block text-xs font-medium text-blue-200/70 mb-1.5">Full Name *</label>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 material-symbols-outlined text-[18px]">person</span>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={updateField('name')}
                                            placeholder="Your full name"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email field */}
                            {mode !== 'set-password' && (
                                <div>
                                    <label className="block text-xs font-medium text-blue-200/70 mb-1.5">Email Address *</label>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 material-symbols-outlined text-[18px]">mail</span>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={updateField('email')}
                                            placeholder="you@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Password fields */}
                            {mode !== 'forgot-password' && (
                                <>
                                    <div>
                                        <label className="block text-xs font-medium text-blue-200/70 mb-1.5">
                                            {isSetPassword ? 'New Password *' : 'Password *'}
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 material-symbols-outlined text-[18px]">lock</span>
                                            <input
                                                type="password"
                                                value={formData.password}
                                                onChange={updateField('password')}
                                                placeholder="Min. 8 characters"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                                required
                                                minLength={8}
                                            />
                                        </div>
                                    </div>

                                    {(mode === 'register' || mode === 'set-password') && (
                                        <div>
                                            <label className="block text-xs font-medium text-blue-200/70 mb-1.5">Confirm Password *</label>
                                            <div className="relative">
                                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 material-symbols-outlined text-[18px]">lock_reset</span>
                                                <input
                                                    type="password"
                                                    value={formData.confirmPassword}
                                                    onChange={updateField('confirmPassword')}
                                                    placeholder="Repeat your password"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                                    required
                                                    minLength={8}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Forgot password link */}
                            {mode === 'login' && (
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => { setMode('forgot-password'); setError(''); setSuccess(''); }}
                                        className="text-xs text-blue-300/70 hover:text-blue-300 transition-colors"
                                    >
                                        忘记密码? Forgot password?
                                    </button>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[18px]">
                                            {mode === 'login' ? 'login' : mode === 'register' ? 'person_add' : mode === 'set-password' ? 'key' : 'send'}
                                        </span>
                                        {mode === 'login' ? '登录 Sign In' : mode === 'register' ? '注册 Register' : mode === 'set-password' ? 'Set Password' : 'Send Reset Link'}
                                    </>
                                )}
                            </button>

                            {/* Back link for forgot-password / set-password */}
                            {(mode === 'forgot-password' || mode === 'set-password') && !tokenParam && (
                                <button
                                    type="button"
                                    onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                                    className="w-full text-center text-xs text-white/40 hover:text-white/60 transition-colors mt-1"
                                >
                                    ← Back to login
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-white/30 mt-6">
                    © 2024 兴业物业管理系统 · Property Management Platform
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    );
}
