import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import toast from 'react-hot-toast';
import Input from '../components/Input.jsx';
import { Eye, EyeOff, Loader, Lock, Mail, User } from 'lucide-react';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter.jsx';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { signup, isSigningUp } = useAuthStore();

	const validateForm = () => {
		if (!formData.name.trim()) return toast.error('Name is required');
		if (!formData.email.trim()) return toast.error('Email is required');
		if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email format');
		if (!formData.password) return toast.error('Password is required');
		if (formData.password.length < 6) return toast.error('Password must be at least 6 characters');
		return true;
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		const success = validateForm();
		if (success === true) signup(formData);
	};

	return (
		<div className="min-h-screen flex pt-20 mt-10 items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
			<div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
				<div className="p-8">
					<h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
					<p className="text-gray-500 dark:text-gray-400 mb-4 text-center">Get started with your free account</p>

					<form onSubmit={handleSignUp} className="space-y-4 relative">
						<Input
							icon={User}
							type="text"
							placeholder="Full Name"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						/>
						<Input
							icon={Mail}
							type="text"
							placeholder="Email"
							value={formData.email}
							onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						/>
						<div className="relative">
							<Input
								icon={Lock}
								type={showPassword ? 'text' : 'password'}
								placeholder="Password"
								value={formData.password}
								onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-3 flex items-center"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<EyeOff className="w-5 h-5 text-gray-400 dark:text-gray-500" />
								) : (
									<Eye className="w-5 h-5 text-gray-400 dark:text-gray-500" />
								)}
							</button>
						</div>

						<PasswordStrengthMeter password={formData.password} />

						<button
							type="submit"
							disabled={isSigningUp}
							className={`w-full py-2 rounded-md text-white font-bold transition duration-200 ${
								isSigningUp
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-blue-600 hover:bg-blue-700'
							}`}
						>
							{isSigningUp ? (
								<Loader className="animate-spin mx-auto" size={24} />
							) : (
								'Sign Up'
							)}
						</button>
					</form>
				</div>
				<div className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-sm text-center">
					<p>
						Already have an account?{' '}
						<Link to="/login" className="text-blue-600 hover:underline">
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
