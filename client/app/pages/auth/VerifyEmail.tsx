import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { $authHost } from '~/shared/lib/http';
import { Button } from '~/shared/ui/Button';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const token = searchParams.get('token');
                if (!token) {
                    throw new Error('Токен подтверждения не найден');
                }

                const response = await $authHost.get(`/auth/verify-email/${token}`);
                setStatus('success');
                setMessage(response.data.message);
                
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } catch (error: any) {
                setStatus('error');
                setMessage(error.response?.data?.error || 'Произошла ошибка при подтверждении email');
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
                        Подтверждение email
                    </h2>
                    <div className="mt-4 text-center">
                        {status === 'loading' && (
                            <div className="text-foreground">
                                Проверка токена подтверждения...
                            </div>
                        )}
                        {status === 'success' && (
                            <div className="text-green-600">
                                {message}
                                <div className="mt-2 text-sm text-foreground">
                                    Перенаправление на страницу входа...
                                </div>
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="text-red-600">
                                {message}
                                <div className="mt-4">
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigate('/auth')}
                                    >
                                        Вернуться на страницу входа
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail; 