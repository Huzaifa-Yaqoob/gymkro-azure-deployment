'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { isAuthenticated } from '../lib/api';

export default function Home() {
  const router = useRouter();
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <>
      <nav className="nav">
        <div className="container">
          <Link href="/" className="nav-logo">Iron<span>Forge</span></Link>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
            {isAuthenticated() ? (
              <>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><button className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }} onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/signup" className="btn btn-primary">Get Started</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <h1>Transform Your Body, <span>Forge Your Future</span></h1>
          <p>Join IronForge Gym and unlock your full potential with world-class equipment, expert trainers, and a community that pushes you to be your best.</p>
          <div className="hero-actions">
            <Link href="/signup" className="btn btn-primary">Start Free Trial</Link>
            <a href="#features" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Learn More</a>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container">
          <h2 className="section-title">Why Choose IronForge?</h2>
          <p className="section-subtitle">Everything you need to reach your fitness goals</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏋️</div>
              <h3>Premium Equipment</h3>
              <p>State-of-the-art machines and free weights from top brands.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Expert Trainers</h3>
              <p>Certified personal trainers to guide and motivate you.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Flexible Classes</h3>
              <p>Yoga, HIIT, spinning, and more — 7 days a week.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Clean & Safe</h3>
              <p>Immaculate facilities with 24/7 cleaning protocols.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" style={{ background: 'var(--light)' }}>
        <div className="container">
          <h2 className="section-title">Simple Pricing</h2>
          <p className="section-subtitle">Choose the plan that works for you</p>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Basic</h3>
              <div className="pricing-price">$29<span>/mo</span></div>
              <ul>
                <li>Gym access 6am-10pm</li>
                <li>Standard equipment</li>
                <li>Locker room access</li>
                <li>1 guest pass/month</li>
              </ul>
              <Link href="/signup" className="btn btn-outline">Get Started</Link>
            </div>
            <div className="pricing-card featured">
              <h3>Pro</h3>
              <div className="pricing-price">$59<span>/mo</span></div>
              <ul>
                <li>24/7 gym access</li>
                <li>All equipment & classes</li>
                <li>2 personal training sessions</li>
                <li>Sauna & steam room</li>
                <li>4 guest passes/month</li>
              </ul>
              <Link href="/signup" className="btn btn-primary">Get Started</Link>
            </div>
            <div className="pricing-card">
              <h3>Elite</h3>
              <div className="pricing-price">$99<span>/mo</span></div>
              <ul>
                <li>Everything in Pro</li>
                <li>Unlimited personal training</li>
                <li>Nutrition planning</li>
                <li>Priority class booking</li>
                <li>Unlimited guest passes</li>
              </ul>
              <Link href="/signup" className="btn btn-outline">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Have questions? We'd love to hear from you.</p>
          <div className="contact-form">
            {contactSubmitted ? (
              <div className="alert alert-success" style={{ textAlign: 'center' }}>
                Thanks for reaching out! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleContact}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    required
                    rows={5}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--light-gray)', borderRadius: '4px', fontSize: '1rem', fontFamily: 'inherit' }}
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} IronForge Gym. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
