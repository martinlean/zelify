import { useAuth } from '../context/AuthContext';

export default function SocialLogin() {
  const { login } = useAuth();

  const handleSocialLogin = async (provider) => {
    try {
      const response = await fetch(`/auth/${provider}`);
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Social login failed:', error);
    }
  };

  return (
    <div className="social-login">
      <button onClick={() => handleSocialLogin('google')}>
        Entrar com Google
      </button>
      <button onClick={() => handleSocialLogin('facebook')}>
        Entrar com Facebook
      </button>
      <button onClick={() => handleSocialLogin('github')}>
        Entrar com GitHub
      </button>
    </div>
  );
}
