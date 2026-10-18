import React from 'react';
import * as simpleIcons from 'simple-icons';

interface SimpleIconProps {
  name: string;
  size?: number | string;
  className?: string;
  color?: string;
  useBrandColor?: boolean;
}

export const SimpleIcon: React.FC<SimpleIconProps> = ({
  name,
  size = 20,
  className = '',
  color,
  useBrandColor = false,
}) => {
  // Brand SVGs for icons that might have specific aliases
  if (name.toLowerCase() === 'aws' || name.toLowerCase() === 'amazonwebservices') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={{ color: color || (useBrandColor ? '#FF9900' : undefined) }}
      >
        <path d="M18.784 14.526a.544.544 0 0 0-.46-.302.585.585 0 0 0-.472.247c-.982 1.258-2.344 1.944-4.225 1.944-2.39 0-4.32-1.077-5.46-3.042a.573.573 0 0 0-.498-.314.56.56 0 0 0-.498.29l-1.459 2.508a.565.565 0 0 0 .048.59c1.944 2.872 4.966 4.385 8.358 4.385 2.656 0 4.882-.942 6.37-2.693a.58.58 0 0 0 .073-.615l-1.277-2.911zm2.392-1.921c-.242-.254-.628-.314-.942-.145-.157.085-1.57.858-3.924.858-.471 0-.918-.036-1.352-.097a.557.557 0 0 0-.58.339l-.882 2.378a.56.56 0 0 0 .266.688c.81.423 1.763.64 2.814.64 2.898 0 4.854-1.21 4.975-1.292a.558.558 0 0 0 .217-.647l-.592-2.723zM9.54 10.457c0-1.449.882-2.318 2.27-2.318 1.4 0 2.294.882 2.294 2.318v3.864a.56.56 0 0 0 .56.56h1.992a.56.56 0 0 0 .56-.56V10.25c0-2.825-1.944-4.492-4.83-4.492-2.873 0-4.806 1.667-4.806 4.492v4.071a.56.56 0 0 0 .56.56h1.992a.56.56 0 0 0 .56-.56v-3.924z" />
      </svg>
    );
  }

  if (name.toLowerCase() === 'linkedin') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={{ color: color || (useBrandColor ? '#0A66C2' : undefined) }}
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.63 1.63 0 1 0 1.63 1.63 1.63 1.63 0 0 0-1.63-1.63Z" />
      </svg>
    );
  }

  if (name.toLowerCase() === 'notebooklm') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={{ color: color || (useBrandColor ? '#4285F4' : undefined) }}
      >
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    );
  }

  // Look up in simple-icons
  // @ts-ignore
  const icon = simpleIcons[name] || simpleIcons[`si${name.charAt(0).toUpperCase() + name.slice(1)}`];

  if (icon) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={{ color: color || (useBrandColor ? `#${icon.hex}` : undefined) }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{icon.title}</title>
        <path d={icon.path} />
      </svg>
    );
  }

  // Generic fallback if not matched
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
};

export default SimpleIcon;
