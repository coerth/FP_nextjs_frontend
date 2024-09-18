import Link from 'next/link';

const Button = () => {
  return (
    <Link href="/api/auth/login">
      <button className="h-12 rounded-lg bg-black font-bold px-5">Sign In</button>
    </Link>
  );
};

export default Button;