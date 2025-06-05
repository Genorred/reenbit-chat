import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import {useUserStore} from '~/features/user/model/user';
import {$authHost} from '~/shared/lib/http';
import {GoogleLogIn} from '~/features/user/ui/GoogleLogIn';
import {Button} from '~/shared/ui/Button';
import {Input} from '~/shared/ui/Input';

const Auth = ({isLogin}: {
    isLogin: boolean;
}) => {
    const setUser = useUserStore(state => state.set);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const navigateToSignIn = () => {
        navigate('/sign-in');
    };
    const navigateToSignUp = () => {
        navigate('/sign-up');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const response = await $authHost.post(endpoint, formData);

            if (isLogin) {
                setUser(response.data.user);
                navigate('/');
            } else {
                alert('Письмо с подтверждением отправлено на ваш email');
                navigateToSignIn();
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Произошла ошибка');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
                        {isLogin ? 'Log in account' : 'Registration'}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {!isLogin && (
                            <Input
                                name="name"
                                type="text"
                                required
                                placeholder="Имя"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        )}
                        <Input
                            name="email"
                            type="email"
                            required
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Input
                            name="password"
                            type="password"
                            required
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <Button type="submit" fullWidth>
                        {isLogin ? 'Login' : 'Register'}
                    </Button>

                    <div className="flex items-center justify-center">
                        <Button
                            type="button"
                            variant="text"
                            onClick={isLogin ? navigateToSignUp : navigateToSignIn}
                        >
                            {isLogin ? 'Create account' : 'Already have an account? Log in'}
                        </Button>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-secondary-background-accent"/>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-background text-foreground">
                                    Или
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <GoogleLogIn/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;