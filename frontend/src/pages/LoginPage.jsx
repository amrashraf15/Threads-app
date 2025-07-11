import { useState } from 'react';
import { Eye, EyeOff, Loader, Lock, Mail } from 'lucide-react';
import Input from '../components/Input.jsx';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';

const LoginPage = () => {
	const { login, isLoggingIn } = useAuthStore();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="min-h-screen min-w-screen flex items-center justify-center  bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
			<div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
				<div className="p-8">
					<h2 className="text-3xl font-bold pb-6 text-center">
						        Login
					</h2>
					<form onSubmit={handleLogin} className="space-y-4">
						<Input
							icon={Mail}
							type="email"
							placeholder="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div className="relative">
							<Input
								icon={Lock}
								type={showPassword ? 'text' : 'password'}
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-3 flex items-center focus:outline-none"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<EyeOff className="w-5 h-5 text-gray-400 dark:text-gray-500" />
								) : (
									<Eye className="w-5 h-5 text-gray-400 dark:text-gray-500" />
								)}
							</button>
						</div>
						<button
							type="submit"
							disabled={isLoggingIn}
							className={`w-full py-2 rounded-md text-white font-bold transition duration-200 ${
								isLoggingIn
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-blue-600 hover:bg-blue-700'
							}`}
						>
							{isLoggingIn ? (
								<Loader className="animate-spin mx-auto" size={24} />
							) : (
								'Login'
							)}
						</button>
					</form>
				</div>
				<div className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-sm text-center">
					<p>
						Don't have an account?{' '}
						<Link to="/signup" className="text-blue-600 hover:underline">
							Click here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
