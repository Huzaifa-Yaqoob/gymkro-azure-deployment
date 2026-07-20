import './global.css';

export const metadata = {
  title: 'IronForge Gym | Transform Your Body',
  description: 'Premium gym with state-of-the-art equipment, expert trainers, and a supportive community.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
